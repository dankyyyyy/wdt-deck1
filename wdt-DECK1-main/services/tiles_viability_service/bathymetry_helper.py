import netCDF4 as nc
import numpy as np
import logging

from tiles_viability_service.constants import Constants

class BathymetryHelper:
    """
    A helper class for handling bathymetric data operations.

    This class is responsible for loading bathymetric data from a dataset and providing
    functionalities such as retrieving depth at specific coordinates and calculating average depth.

    Attributes:
        dataset (netCDF4.Dataset): The loaded dataset containing bathymetric data.

    Methods:
        load_dataset(dataset_path): Loads the dataset from the specified path.
        find_nearest_index(values, target): Finds the nearest index in a given array to a target value.
        get_depth_at_coordinates(lat, lon): Retrieves the depth at specified latitude and longitude.
        get_average_depth(coordinates): Calculates the average depth for a list of coordinates.
    """

    def __init__(self):
        logging.basicConfig(level=logging.INFO)

    def load_dataset(self, region):
        try:
            if region == 'north':
                return nc.Dataset(Constants.BATHYMETRIC_NORTH_PATH)
            elif region == 'baltic':
                return nc.Dataset(Constants.BATHYMETRIC_BALTIC_PATH)
        except Exception as e:
            logging.error(f"Error loading dataset: {e}", exc_info=True)
            raise

    def find_nearest_index(self, values, target):
        """
        Finds the nearest index in the array to the target value.

        Parameters:
            values (np.ndarray): The array of values to search.
            target (float): The target value to find the nearest index for.

        Returns:
            int: The index of the closest value to the target.
        """
        return np.abs(values - target).argmin()

    async def get_depth_at_coordinates(self, lat, lon, region):
        """
        Retrieves the depth at specified latitude and longitude coordinates.

        Parameters:
            lat (float): The latitude of the coordinate.
            lon (float): The longitude of the coordinate.

        Returns:
            float: The depth at the specified coordinates.

        Raises:
            Exception: If there is an error in retrieving the depth.
        """
        try:
            self.dataset = self.load_dataset(region)
            lat_idx = self.find_nearest_index(self.dataset.variables['lat'][:], lat)
            lon_idx = self.find_nearest_index(self.dataset.variables['lon'][:], lon)
            elevation = self.dataset.variables['elevation'][lat_idx, lon_idx]
            return -elevation if elevation < 0 else 0
        except Exception as e:
            logging.error(f"Error retrieving depth at coordinates ({lat}, {lon}): {e}", exc_info=True)
            raise

    async def get_average_depth(self, coordinates, region):
        """
        Calculates the average depth for a list of latitude and longitude coordinates.

        Parameters:
            coordinates (list of tuple): A list of tuples where each tuple contains latitude
            and longitude values.

        Returns:
            float: The calculated average depth. Returns 0 if invalid coordinates are provided.

        Raises:
            Exception: If there is an error in calculating the average depth.
        """
        if not coordinates:
            logging.error("Invalid coordinates provided")
            return 0
        
        if not region:
            logging.error("Invalid region provided.")
            return 0

        depths = []
        for lat, lon in coordinates:
            try:
                depth = await self.get_depth_at_coordinates(lat, lon, region)
                depths.append(depth)
            except Exception as e:
                logging.error(f"Error calculating depth for coordinates ({lat}, {lon}): {e}", exc_info=True)

        return sum(depths) / len(depths) if depths else 0
