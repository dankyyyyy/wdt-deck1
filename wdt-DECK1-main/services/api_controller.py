import logging

from flask import Blueprint, jsonify, request

from validation.water_depth_validation import WaterDepthValidator
from tiles_viability_service.tiles_viability_service import TilesViabilityService

# Configure logging
logging.basicConfig(level=logging.INFO)

api_blueprint = Blueprint('api', __name__)
tilesService = TilesViabilityService()
validator = WaterDepthValidator()

@api_blueprint.route('/tile-water-depth', methods=['GET'])
async def get_water_depth():
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