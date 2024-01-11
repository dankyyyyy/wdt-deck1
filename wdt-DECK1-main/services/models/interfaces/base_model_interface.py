import uuid
from abc import ABC

class GenericModel(ABC):
    def __init__(self):
        self.guid = str(uuid.uuid4())