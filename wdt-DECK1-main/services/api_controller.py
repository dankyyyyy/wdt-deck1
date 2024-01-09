import logging
import os
import psutil

from flask import Blueprint, jsonify, request

from validation.water_depth_validation import WaterDepthValidator
from tiles_viability_service.tiles_viability_service import TilesViabilityService

# Configure logging
logging.basicConfig(level=logging.INFO)

api_blueprint = Blueprint('api', __name__)
tilesService = TilesViabilityService()
validator = WaterDepthValidator()

@api_blueprint.route('/get-water-depth-for-tile', methods=['GET'])
async def get_water_depth_for_tile():
    """
    Get the average water depth for a given set of coordinates.
    Parameters:
    - coords: List of coordinate pairs (latitude, longitude)
    
    Returns:
    - average depth or error message
    """

    coords = request.args.getlist('coords')
    coordinates = [(float(lat), float(lon)) for coord in coords for lat, lon in [coord.split(',')]]

    if not validator.validate_coordinate_count(coordinates):
        return jsonify({"error": "Incorrect number of coordinate pairs provided"}), 400

    if not validator.validate_coordinates(coordinates):
        return jsonify({"error": "Invalid coordinate pairs provided"}), 400

    try:
        average_depth = await tilesService.process_tile_viability(coordinates)
        logging.info(f"Average depth calculated: {average_depth}")
        return jsonify({"average_depth": average_depth}), 200
    except Exception as e:
        logging.error(f"Error calculating average depth: {e}")
        return jsonify({"error": "Error processing request"}), 500
    

@api_blueprint.route('/get-water-depth', methods=['GET'])
async def get_water_depth():
    """
    Get the average water depth for a single coordinate pair.
    Parameters:
    - coord: A single coordinate pair (latitude, longitude)
    
    Returns:
    - average depth or error message
    """
    coord = request.args.get('coord')
    try:
        lat, lon = map(float, coord.split(','))
    except ValueError:
        return jsonify({"error": "Invalid coordinate format"}), 400

    if not validator.validate_coordinates([(lat, lon)]):
        return jsonify({"error": "Invalid coordinate pair provided"}), 400

    try:
        average_depth = await tilesService.process_tile_viability([(lat, lon)])
        logging.info(f"Average depth calculated for single coordinate: {average_depth}")
        return jsonify({"average_depth": average_depth}), 200
    except Exception as e:
        logging.error(f"Error calculating average depth for single coordinate: {e}")
        return jsonify({"error": "Error processing request"}), 500

@api_blueprint.route('/get-health', methods=['GET'])
async def get_health():
    bathymetry_data_exists = os.path.exists("bathymetric data/gebco_denmark.nc")

    # System metrics
    cpu_usage = psutil.cpu_percent(interval=1)
    ram = psutil.virtual_memory()
    ram_usage_percent = ram.percent
    ram_free_gb = ram.available / (1024**3)  # Convert from bytes to GB

    health_info = {
        "bathymetry_data_exists": bathymetry_data_exists,
        "virtual_cpu_usage": f"{cpu_usage:.2f}",
        "ram_usage": ram_usage_percent,
        "ram_free": f"{ram_free_gb:.2f}"  # Format to 2 decimal places
    }

    status_code = 200 if bathymetry_data_exists else 500

    return jsonify(health_info), status_code