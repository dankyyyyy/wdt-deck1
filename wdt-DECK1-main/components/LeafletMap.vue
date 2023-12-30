<template>
  <div class="map-container">
    <l-map v-if="isClient" ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]" @click="handleMapClick">
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>

      <!-- Render multiple tiles -->
      <l-polygon v-for="(tile, index) in tiles" :key="index"
                 :lat-lngs="tile" :color="tileColor" :fill-opacity="0.2">
      </l-polygon>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LPolygon } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import { createTile } from '../utils/tileLogic'; // Import the createTile function
import { getCookie, setCookie } from '../utils/cookieHandler'; // Add getCookie import

export default {
  components: {
    LMap,
    LTileLayer,
    LPolygon,
  },
  data() {
    return {
      zoom: 8,
      tiles: [],
      tileColor: "blue", // Color of the tiles
      isClient: false, // Flag to check if client-side
    };
  },
  mounted() {
    this.isClient = true;
    
    const savedTiles = getCookie('tiles'); // Retrieve tiles from the cookie
    if (getCookie('tiles')) {
      this.tiles = savedTiles; // Populate tiles with the data from the cookie
  }
  },
  methods: {
    handleMapClick(e) {
      const clickedLatLng = { lat: e.latlng.lat, lng: e.latlng.lng };
      
      // Use the createTile function
      const tileCoordinates = createTile(clickedLatLng);

      // Add the new tile to the array of tiles and save to cookie
      this.tiles.push(tileCoordinates);
      setCookie('tiles', this.tiles);
    },
  },
};
</script>

<style>
.map-container {
  height: 100vh; /* Adjust the height as needed */
  width: 100%;
}
</style>
