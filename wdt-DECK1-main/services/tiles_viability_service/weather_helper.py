import netCDF4 as nc
import numpy as np
import logging

from tiles_viability_service.constants import Constants


class WeatherHelper:

    """
    A helper class for handling Copernicus weather data operations.

    This class is responsible for loading weather data from a dataset and providing
    functionalities such as retrieving wind speed and wave height at specific coordinates and comparing these values to the limits set by the turbine type.

    Attributes:
        dataset (Copernicus.Dataset): The loaded dataset containing bathymetric data.

    Methods:
        load_dataset(dataset_path): Loads the dataset from the specified path.
        find_nearest_index(values, target): Finds the nearest index in a given array to a target value.
        get_wind_speed_at_coordinates(lat, lon): Retrieves the wind speed at specified latitude and longitude.
        get_average_wind_speed(coordinates): Calculates the average wind speed for a list of coordinates.
        get_wave_height_at_coordinates(lat, lon): Retrieves the wave height at specified latitude and longitude.
        get_average_wave_height(coordinates): Calculates the average wave height for a list of coordinates.
    """

    def __init__(self):
        logging.basicConfig(level=logging.INFO)

    def load_dataset(self, region):
        try:
            if region == 'north':
                return nc.Dataset(Constants.WEATHER_NORTH_PATH)
            elif region == 'baltic':
                return nc.Dataset(Constants.WEATHER_BALTIC_PATH)
        except Exception as e:
            logging.error(f"Error loading dataset: {e}", exc_info=True)
            raise

    def find_nearest_index(self, values, target):
        return np.abs(values - target).argmin()

    async def get_wind_speed_at_coordinates(self, lat, lon, region):
        """
        Retrieves the u- and v-components of wind at specified latitude and longitude coordinates, then calculates wind speed.

        Parameters:
            lat (float): The latitude of the coordinate.
            lon (float): The longitude of the coordinate.

        Returns:
            float: The wind speed at the specified coordinates.

        Raises:
            Exception: If there is an error in retrieving the wind speed.
        """
        try:
            self.dataset = self.load_dataset(region)
            lat_idx = self.find_nearest_index(
                self.dataset.variables['latitude'][:], lat)
            lon_idx = self.find_nearest_index(
                self.dataset.variables['longitude'][:], lon)

            # u_component = np.ma.masked_less(self.dataset.variables['u10'][lat_idx][lon_idx], 0)
            # v_component = np.ma.masked_less(self.dataset.variables['v10'][lat_idx][lon_idx], 0)

            u_component = self.dataset.variables['u10'][lat_idx][lon_idx]
            v_component = self.dataset.variables['v10'][lat_idx][lon_idx]

            u_component_averaged = np.mean(u_component)
            v_component_averaged = np.mean(v_component)
            
            windspeed = np.sqrt(u_component_averaged**2 + v_component_averaged**2)
            return windspeed
        except Exception as e:
            logging.error(
                f"Error retrieving wind speed at coordinates ({lat}, {lon}): {e}", exc_info=True)
            raise

    async def get_average_wind_speed(self, coordinates, region):
        """
        Calculates the average wind speed for a list of latitude and longitude coordinates.

        Parameters:
            coordinates (list of tuple): A list of tuples where each tuple contains latitude
            and longitude values.

        Returns:
            float: The calculated average wind speed. Returns 0 if invalid coordinates are provided.

        Raises:
            Exception: If there is an error in calculating the average wind speed.
        """

        if not coordinates:
            logging.error("Invalid coordinates provided")
            return 0

        windspeeds = []
        for lat, lon in coordinates:
            try:
                windspeed = await self.get_wind_speed_at_coordinates(lat, lon, region)
                windspeeds.append(windspeed)
            except Exception as e:
                logging.error(
                    f"Error calculating wind speed for coordinates ({lat}, {lon}): {e}", exc_info=True)
        return np.round(sum(windspeeds) / len(windspeeds)) if windspeeds else 0

    async def get_wave_height_at_coordinates(self, lat, lon):
        """
        Retrieves the wave height at specified latitude and longitude coordinates.

        Parameters:
            lat (float): The latitude of the coordinate.
            lon (float): The longitude of the coordinate.

        Returns:
            float: The wave height at the specified coordinates.

        Raises:
            Exception: If there is an error in retrieving the wave height.
        """

        try:
            lat_idx = self.find_nearest_index(
                self.dataset.variables['latitude'][:], lat)
            lon_idx = self.find_nearest_index(
                self.dataset.variables['longitude'][:], lon)
            waveheight = self.dataset.variables['swh'][0][lat_idx][lon_idx]
            return waveheight
        except Exception as e:
            logging.error(
                f"Error retrieving wave height at coordinates ({lat}, {lon}): {e}", exc_info=True)
            raise

    async def get_average_wave_height(self, coordinates):
        """
        Calculates the average wave height for a list of latitude and longitude coordinates.

        Parameters:
            coordinates (list of tuple): A list of tuples where each tuple contains latitude
            and longitude values.

        Returns:
            float: The calculated average wave height. Returns 0 if invalid coordinates are provided.

        Raises:
            Exception: If there is an error in calculating the average wave height.
        """
