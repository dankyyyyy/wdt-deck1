<template>
  <div class="map-container">
    <l-map v-if="isClient" ref="map" v-model:zoom="zoom" :center="center" :options="mapOptions"
      @clear-tiles="clearTiles" @mousemove="handleMouseMove" @mouseleave="hideTooltip">

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
import "leaflet/dist/leaflet.css"
import { getCookie } from '../utils/cookieHandler';
import { useTileInfoStore } from '../stores/TilesViabilityStore';

export default {
  components: {
    LMap,
    LTileLayer,
    LPolygon,
    Tooltip
  },
  data() {
    return {
      zoom: 6,
      center: [57.2639, 9.5018],
      tiles: [],
      tileColor: "blue",
      isClient: false,
      currentLat: 0,
      currentLon: 0,
      tileBorderColor: 'black',  // Default border color
      tileBorderWeight: 1,       // Default border weight (thin line)
      selectedRegion: null,
      mapOptions: {
        scrollWheelZoom: false,
        zoomControl: false,
      },
    };
  },
  computed: {
    regionFromStore() {
      return useTileInfoStore().getSelectedRegion();
    },

    tilesFromStore() {
      return useTileInfoStore().getTiles();
    }
  },
  mounted() {
    this.isClient = true;

    const savedTiles = getCookie('tiles');
    if (savedTiles) {
      useTileInfoStore().setTilesFromCookie(savedTiles);
      this.tiles = useTileInfoStore().getTiles();
    }

    const savedRegion = getCookie('region');
    if (savedRegion) {
      useTileInfoStore().setRegionfromCookie(savedRegion);
      this.selectedRegion = useTileInfoStore().getSelectedRegion();
    }
  },

  watch: {
    regionFromStore(newRegion) {
      this.selectedRegion = newRegion;
      this.updateMapCenter(this.selectedRegion);
      this.clearTiles();
    },

    tilesFromStore(newTiles) {
      this.tiles = newTiles;
      console.log(this.tiles);
    },
  },

  methods: {
    // handleMapClick(e) {
    //   console.log('handleMapClick called:', new Date().toISOString(), this.tiles.length);
    //   // Check if latlng exists in the event object
    //   if (e.latlng) {
    //     console.log(e.latlng, new Date().toISOString());
    //     const clickedLatLng = { lat: e.latlng.lat, lng: e.latlng.lng };
    //     console.log(clickedLatLng);

    //     // Draw the tile
    //     const tileCoordinates = createTile(clickedLatLng);

    //     // Add the new tile to the array of tiles and save to cookie
    //     useTileInfoStore().addTile(tileCoordinates);
    //     this.tiles = useTileInfoStore().getTiles();
    //   } else {
    //     console.log("Invalid coordinates.", e.latlng, new Date().toISOString(), this.tiles.length);
    //   }
    // },

    handleMouseMove(e) {
      // Check if originalEvent exists and ctrlKey is pressed
      if (e.originalEvent && e.originalEvent.ctrlKey) {
        this.updateTooltip(e);
      } else {
        this.hideTooltip();
      }
    },
    updateMapCenter(region) {
      if (region === 'north') this.center = [56.5110, 3.5156]
      else if (region === 'baltic') this.center = [58.488, 19.8633];
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
      useTileInfoStore().clearTiles();
      this.tiles = useTileInfoStore().getTiles();
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
