<template>
  <div class="map-container">
    <l-map ref="map" v-model:zoom="zoom" :use-global-leaflet="false" :center="[47.41322, -1.219482]">
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
        name="OpenStreetMap"></l-tile-layer>
    </l-map>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
  },
  data() {
    return {
      zoom: 8,
      minZoom: 6,
      maxZoom: 12
    };
  },
};
</script>

<style></style>