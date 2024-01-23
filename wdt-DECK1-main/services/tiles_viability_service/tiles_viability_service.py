import logging
import math
from .bathymetry_helper import BathymetryHelper
from .weather_helper import WeatherHelper
from validation.data_validation import DataValidator

class TilesViabilityService:
    def __init__(self):
        self.bathymetry_helper = BathymetryHelper()
        self.weather_helper = WeatherHelper()
        self.data_validator = DataValidator()
    
    def find_coordinate_bounds(self, region):
        self.dataset = self.bathymetry_helper.load_dataset(region)
        n = self.dataset.variables['lat'][:].max()
        w = self.dataset.variables['lon'][:].min()
        s = self.dataset.variables['lat'][:].min()
        e = self.dataset.variables['lon'][:].max()
        return n, w, s, e 

    async def process_tile_viability(self, coordinates, region, type, wind_speed_limit):
        """
        Processes tile viability based on the provided coordinates.

        """
        
        depth = await self.retrieve_water_depth(coordinates, region)

        if type == 'deepwater':
            if depth >= 60:
                depth_viable = True
                return depth_viable
        elif type == 'transitional':
            if depth >= 30 and depth <= 60:
                depth_viable = True
                return depth_viable
        elif type == 'shallow':
            if depth <= 30:
                depth_viable = True
                return depth_viable
            
        print(depth_viable)

        if depth_viable:
            return True
        else: return False
        
        # wind_speed = await self.retrieve_wind_speed(coordinates, region)
        # print(wind_speed)
        # wind_speed_viable = False

        # if wind_speed_limit >= wind_speed:
        #     wind_speed_viable = True
        #     return wind_speed_viable
        
        # print(depth_viable)
        # print(wind_speed_viable)
        
        # if depth_viable and wind_speed_viable:
        #     return True
        # else: return False
        
        # print(depth_viable, wind_speed_viable)

    async def retrieve_water_depth(self, coordinates, region):
        """
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
        
        if not region:
            logging.error("No region provided for tile viability processing.")
            return None
        
        try:
            average_depth = await self.bathymetry_helper.get_average_depth(coordinates, region)
            logging.info(f"Average depth calculated: {average_depth}")
            return average_depth
        except Exception as e:
            logging.error(f"Error occurred during tile viability processing: {e}", exc_info=True)
            return None
        
    async def retrieve_wind_speed(self, coordinates, region):
        if not coordinates:
            logging.error("No coordinates provided for tile viability processing.")
            return None
        
        if not region:
            logging.error("No region provided for tile viability processing.")
            return None
            
        try:
            average_wind_speed = await self.weather_helper.get_average_wind_speed(coordinates, region)
            logging.info(f"Average wind speed calculated: {average_wind_speed}")
            return average_wind_speed
        except Exception as e:
            logging.error(f"Error occurred during tile viability processing: {e}", exc_info=True)
            return None