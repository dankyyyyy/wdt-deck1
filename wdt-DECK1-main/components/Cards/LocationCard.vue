<template>
  <div class="grid-container">
    <div class="grid">
      <div class="customize-card-box" @click="selectLocation" :class="{ 'selected': isSelected }">
        <div class="box-content">
          <IconsLogoInverted class="box-image inline-block align-middle w-full" />
          <h2 class="box-title">{{ location.name }}</h2>

          <div class="box-text">
            <label for="latitude">Latitude: </label>
            <p class="box-text-type">{{ location.latitude }}</p>
            <hr />
            <label for="longitude">Longitude: </label>
            <p class="box-text-type">{{ location.longitude }}</p>
            <hr />
            <label for="limit">Wind Speed Limit: </label>
            <p class="box-text-type">{{ location.limit }}m/s</p>
            <hr />
            <label for="turbines">Turbines: </label>
            <p class="box-text-type">{{ location.wtg }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useLocationStore } from "~/stores/LocationStore";

export default {
  name: "LocationCard",
  props: {
    location: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isSelected: false,
    };
  },
  methods: {
    selectLocation() {
      const location = this.location;

      if (useLocationStore().getSelectedLocation() === null) {
        this.isSelected = true,
          this.$emit("location-selected", location)
      } else if (useLocationStore().getSelectedLocation()._id === this.location._id) {
        this.isSelected = false;
        this.$emit("location-deselected");
      }
    }
  },
};
</script>

<style scoped>
.grid-container {
  display: grid;
  justify-content: center;
}

.grid {
  display: flex;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 16px;
}

.summary-grid {
  display: flex;
  grid-template-columns: repeat(auto-fit, minmax(min(30rem, 100%), 1fr));
  gap: 16px;
}

.selected {
  background-color: #abd5e5;
  /* Change to DECK1 Blue with 25% opacity */
}
</style>