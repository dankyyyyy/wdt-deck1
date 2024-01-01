import logging
from .bathymetry_helper import BathymetryHelper
from validation.water_depth_validation import WaterDepthValidator

class TilesViabilityService:
    def __init__(self):
        self.bathymetry_helper = BathymetryHelper()
        self.water_depth_validator = WaterDepthValidator()

    async def process_tile_viability(self, coordinates):
        """
        Processes tile viability based on the provided coordinates.

        This method calculates the average depth at the provided coordinates using the
        BathymetryHelper class and includes appropriate error handling and logging.

        Parameters:
            coordinates (list of tuple): A list of tuples representing latitude and longitude pairs.

        Returns:
            float: The average depth at the given coordinates. Returns None if an error occurs.
        """
        if not coordinates:
            logging.error("No coordinates provided for tile viability processing.")
            return None

        try:
            average_depth = await self.bathymetry_helper.get_average_depth(coordinates)
            logging.info(f"Average depth calculated: {average_depth}")
            return average_depth
        except Exception as e:
            logging.error(f"Error occurred during tile viability processing: {e}", exc_info=True)
            return None