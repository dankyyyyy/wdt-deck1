import type { LatLng } from "@/types/index";

export function createTile(clickedLatLng: LatLng): LatLng[] {
  const tileSize = Math.sqrt(50 * 1000 * 1000); // 50 km² tile root for side length
  const halfSide = tileSize / 2;

  // Approximate conversion from meters to latitude/longitude degrees
  const latChange = halfSide / 111320;
  const lngChange = halfSide / (40075000 * Math.cos(Math.PI * clickedLatLng.lat / 180) / 360);

  // Calculate and return tile coordinates
  return [
    { lat: clickedLatLng.lat + latChange, lng: clickedLatLng.lng + lngChange },
    { lat: clickedLatLng.lat + latChange, lng: clickedLatLng.lng - lngChange },
    { lat: clickedLatLng.lat - latChange, lng: clickedLatLng.lng - lngChange },
    { lat: clickedLatLng.lat - latChange, lng: clickedLatLng.lng + lngChange }
  ];
}