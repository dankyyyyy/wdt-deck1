from typing import List
from services.models.coordinate_model import CoordinateModel
from services.models.interfaces.base_model_interface import GenericModel

class TileModel(GenericModel):
    def __init__(self, coordinates: List[CoordinateModel], water_depth: float):
        super().__init__()
        self.coordinates = coordinates
        self.water_depth = water_depth
