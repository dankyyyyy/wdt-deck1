<template>
  <div class="map-container">
    <l-map v-if="isClient" ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]" :options="mapOptions"
      @click="handleMapClick" @mousemove="handleMouseMove" @mouseleave="hideTooltip">

      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>

      <!-- Render multiple tiles -->
      <l-polygon v-for="(tile, index) in tiles" :key="index" :lat-lngs="tile" :color="tileBorderColor"
        :weight="tileBorderWeight" :fill-opacity="0.2">
      </l-polygon>
    </l-map>

    <!-- Tooltip component -->
    <tooltip :lat="currentLat" :lon="currentLon" ref="tooltip"></tooltip>
  </div>
</template>

<script>
import { LMap, LTileLayer, LPolygon } from "@vue-leaflet/vue-leaflet";
import Tooltip from './Tooltip.vue';
import "leaflet/dist/leaflet.css";
import { createTile } from '../utils/tileLogic';
import { getCookie, setCookie } from '../utils/cookieHandler';

export default {
  components: {
    LMap,
    LTileLayer,
    LPolygon,
    Tooltip
  },
  data() {
    return {
      zoom: 7.5,
      tiles: [],
      tileColor: "blue",
      isClient: false,
      currentLat: 0,
      currentLon: 0,
      tileBorderColor: 'black',  // Default border color
      tileBorderWeight: 1,       // Default border weight (thin line)
      mapOptions: {
        scrollWheelZoom: false,
        zoomControl: false,
      },
    };
  },
  mounted() {
    this.isClient = true;

    const savedTiles = getCookie('tiles');
    if (savedTiles) {
      this.tiles = savedTiles;
    }
  },
  methods: {
    handleMapClick(e) {
      // Check if latlng exists in the event object
      if (e.latlng) {
        const clickedLatLng = { lat: e.latlng.lat, lng: e.latlng.lng };

        // Use the createTile function
        const tileCoordinates = createTile(clickedLatLng);

        // Add the new tile to the array of tiles and save to cookie
        this.tiles.push(tileCoordinates);
        setCookie('tiles', this.tiles);
      } else {
        console.error('Event object does not contain latlng property');
      }
    }
    ,
    handleMouseMove(e) {
      // Check if originalEvent exists and ctrlKey is pressed
      if (e.originalEvent && e.originalEvent.ctrlKey) {
        this.updateTooltip(e);
      } else {
        this.hideTooltip();
      }
    },
    updateTooltip(e) {
      this.currentLat = e.latlng.lat;
      this.currentLon = e.latlng.lng;
      this.$refs.tooltip.showTooltip({ clientX: e.originalEvent.clientX, clientY: e.originalEvent.clientY });
    },
    hideTooltip() {
      if (this.$refs.tooltip) {
        this.$refs.tooltip.hideTooltip();
      }
    },
    clearTiles() {
      this.tiles = [];
    },
    // Method to update tile border color and weight
    updateTileStyle(color, weight) {
      this.tileBorderColor = color;
      this.tileBorderWeight = weight;
    },
  }
};
</script>

<style>
.map-container {
  height: 100vh;
  width: 100%;
}
</style>
