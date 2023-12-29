import pytest
import unittest
from unittest.mock import AsyncMock
from tiles_viability_service.bathymetry_helper import BathymetryHelper
from validation.water_depth_validation import WaterDepthValidator

class TestWaterDepthValidator(unittest.TestCase):
    def setUp(self):
        self.bathymetry_helper = BathymetryHelper()
        self.bathymetry_helper.get_depth_at_coordinates = AsyncMock(return_value=20.0)
        self.validator = WaterDepthValidator(self.bathymetry_helper)

    @pytest.mark.asyncio
    async def test_validate_and_get_depth(self):
        # Test with valid parameters
        lat, lon = 56.0, 10.0
        result, status_code = await self.validator.validate_and_get_depth(lat, lon)
        self.assertEqual(status_code, 200)
        self.assertEqual(result, {"latitude": lat, "longitude": lon, "depth": 20.0})

        # Test with missing latitude
        result, status_code = await self.validator.validate_and_get_depth(None, lon)
        self.assertEqual(status_code, 400)
        self.assertIn("error", result)

        # Test with missing longitude
        result, status_code = await self.validator.validate_and_get_depth(lat, None)
        self.assertEqual(status_code, 400)
        self.assertIn("error", result)
