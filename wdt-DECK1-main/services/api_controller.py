import logging

from flask import Blueprint, jsonify, request

from validation.data_validation import DataValidator
from tiles_viability_service.tiles_viability_service import TilesViabilityService

# Configure logging
logging.basicConfig(level=logging.INFO)

api_blueprint = Blueprint('api', __name__)
tilesService = TilesViabilityService()
validator = DataValidator()

@api_blueprint.route('get-region-bounds', methods=['GET'])
async def get_region_bounds():
    region = request.args.get('region')
    try:
        bounds = tilesService.find_coordinate_bounds(region)
        logging.info(f"Region bounds retrieved: {bounds}")
        return jsonify({"bounds": bounds}), 200
    except Exception as e:
        logging.error(f"Error retrieving region bounds: {e}")
        return jsonify({"error": "Error processing request"}), 500

@api_blueprint.route('/get-tile-viability', methods=['GET'])
async def get_tile_viability():
    region = request.args.get('region')
    type = request.args.get('type')
    wind_speed_limit = 10
    # wind_speed_limit = request.args.get('wind_speed_limit')

    coords = request.args.getlist('coords')
    coordinates = [(float(lat), float(lon)) for coord in coords for lat, lon in [coord.split(',')]]

    if not validator.validate_coordinate_count(coordinates):
        return jsonify({"error": "Incorrect number of coordinate pairs provided"}), 400

    if not validator.validate_coordinates(coordinates):
        return jsonify({"error": "Invalid coordinate pairs provided"}), 400

    try:
        viability = await tilesService.process_tile_viability(coordinates, region, type, wind_speed_limit)
        logging.info(f"Tile viability determined:")
        return jsonify({'viability': viability}), 200
    except Exception as e:
        logging.error(f"Error determining viability: {e}")
        return jsonify({"error": "Error processing request"}), 500


@api_blueprint.route('/get-water-depth-for-tile', methods=['GET'])
async def get_water_depth_for_tile():
    """
    Get the average water depth for a given set of coordinates.
    Parameters:
    - coords: List of coordinate pairs (latitude, longitude)
    
    Returns:
    - average depth or error message
    """
    region = request.args.get('region')
    coords = request.args.getlist('coords')
    coordinates = [(float(lat), float(lon)) for coord in coords for lat, lon in [coord.split(',')]]

    if not validator.validate_coordinate_count(coordinates):
        return jsonify({"error": "Incorrect number of coordinate pairs provided"}), 400

    if not validator.validate_coordinates(coordinates):
        return jsonify({"error": "Invalid coordinate pairs provided"}), 400

    try:
        average_depth = await tilesService.retrieve_water_depth(coordinates, region)
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
        average_depth = await tilesService.retrieve_water_depth([(lat, lon)])
        logging.info(f"Average depth calculated for single coordinate: {average_depth}")
        return jsonify({"average_depth": average_depth}), 200
    except Exception as e:
        logging.error(f"Error calculating average depth for single coordinate: {e}")
        return jsonify({"error": "Error processing request"}), 500
    
@api_blueprint.route('/get-wind-speed-for-tile', methods=['GET'])
async def get_wind_speed_for_tile():
    """
    Get the average wind speed for a given set of coordinates.
    Parameters:
    - coords: List of coordinate pairs (latitude, longitude)
    
    Returns:
    - average wind speed or error message
    """
    region = request.args.get('region')
    coords = request.args.getlist('coords')
    coordinates = [(float(lat), float(lon)) for coord in coords for lat, lon in [coord.split(',')]]

    if not validator.validate_coordinate_count(coordinates):
        return jsonify({"error": "Incorrect number of coordinate pairs provided"}), 400

    if not validator.validate_coordinates(coordinates):
        return jsonify({"error": "Invalid coordinate pairs provided"}), 400

    try:
        average_wind_speed = await tilesService.retrieve_wind_speed(coordinates, region)
        logging.info(f"Average wind speed calculated: {average_wind_speed}")
        return jsonify({"average_wind_speed": average_wind_speed}), 200
    except Exception as e:
        logging.error(f"Error calculating average wind speed: {e}")
        return jsonify({"error": "Error processing request"}), 500
    
@api_blueprint.route('/get-wind-speed', methods=['GET'])
async def get_wind_speed():
    """
    Get the average wind speed for a single coordinate pair.
    Parameters:
    - coord: A single coordinate pair (latitude, longitude)
    
    Returns:
    - average wind speed or error message
    """
    coord = request.args.get('coord')
    try:
        lat, lon = map(float, coord.split(','))
    except ValueError:
        return jsonify({"error": "Invalid coordinate format"}), 400

    if not validator.validate_coordinates([(lat, lon)]):
        return jsonify({"error": "Invalid coordinate pair provided"}), 400

    try:
        average_wind_speed = await tilesService.retrieve_wind_speed([(lat, lon)])
        logging.info(f"Average wind speed calculated for single coordinate: {average_wind_speed}")
        return jsonify({"average_wind_speed": average_wind_speed}), 200
    except Exception as e:
        logging.error(f"Error calculating average wind speed for single coordinate: {e}")
        return jsonify({"error": "Error processing request"}), 500
