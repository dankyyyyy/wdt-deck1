import pytest
import unittest
from unittest.mock import AsyncMock
from tiles_viability_service.bathymetry_helper import BathymetryHelper
from validation.water_depth_validation import WaterDepthValidator

class TestWaterDepthValidator(unittest.TestCase):

    def setUp(self):
        self.validator = WaterDepthValidator()

    def test_validate_coordinates(self):
        # Test with valid coordinates
        valid_coordinates = [(56.0, 10.0), (-25.0, 45.0), (35.0, -120.0), (60.0, 30.0)]
        self.assertTrue(self.validator.validate_coordinates(valid_coordinates))

        # Test with invalid coordinates
        invalid_coordinates = [(56.0, 10.0), (-95.0, 45.0)]  # -95.0 is out of range
        self.assertFalse(self.validator.validate_coordinates(invalid_coordinates))

    def test_validate_coordinate_count(self):
        # Test with correct number of coordinates
        correct_count_coordinates = [(56.0, 10.0), (-25.0, 45.0), (35.0, -120.0), (60.0, 30.0)]
        self.assertTrue(self.validator.validate_coordinate_count(correct_count_coordinates))

        # Test with incorrect number of coordinates
        incorrect_count_coordinates = [(56.0, 10.0), (-25.0, 45.0)]
        self.assertFalse(self.validator.validate_coordinate_count(incorrect_count_coordinates))