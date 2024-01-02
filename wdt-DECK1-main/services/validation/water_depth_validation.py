from tiles_viability_service.bathymetry_helper import BathymetryHelper
from .validation_constants import ValidationConstants
import logging

class WaterDepthValidator:
    '''provides validation for input'''
    def __init__(self):
        self.bathymetry_helper = BathymetryHelper()

    def validate_coordinates(self, coordinates):
        '''checks against min and max values for mercator projection maps'''
        for lat, lon in coordinates:
            if not (ValidationConstants.MIN_LATITUDE <= lat <= ValidationConstants.MAX_LATITUDE and ValidationConstants.MIN_LONGITUDE <= lon <= ValidationConstants.MAX_LONGITUDE):
                logging.error(f"Invalid coordinate: Latitude {lat}, Longitude {lon}")
                return False
        return True
    
    def validate_coordinate_count(self, coordinates):
        """
        Validates if the correct number of coordinate pairs is provided.

        A tile should have exactly four pairs of latitude and longitude,
        representing its four edges.
        """
        
        if len(coordinates) == 4:
            return True
        else:
            logging.error(f"Incorrect number of coordinate pairs provided. Expected 4, got {len(coordinates)}")
            return False