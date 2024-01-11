from services.models.interfaces.base_model_interface import GenericModel

class CoordinateModel(GenericModel):
    def __init__(self, latitude: float, longitude: float):
        super().__init__()
        self.latitude = latitude
        self.longitude = longitude