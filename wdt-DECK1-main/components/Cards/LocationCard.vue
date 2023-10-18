<template>
  <div class="grid-container">
    <div class="grid">
      <div class="customize-card-box" @click="selectLocation" :class="{ 'selected': isSelected }">
        <div class="box-content">
          <IconsLogoInverted class="box-image inline-block align-middle w-full" />
         <div v-if="dataInformation.isFetching">
      ⏳
    </div>
    <div v-else-if="dataInformation.isDataRegistered">
      <p>Data is present</p>
      <p>Latest record is {{dataInformation.latestDataYear }}</p>
    </div>
    <div v-else>
      <p class="font-semibold">Data is missing</p>
    </div>
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
import { useWeatherdataStore } from "~/stores/WeatherdataStore";
import axios from "axios";
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
      dataInformation: {
        isFetching: true,
        isDataRegistered: false,
        latestDataYear: null,
      },
      isSelected: false,
    };
  },
  async mounted() {
    console.log("checking: ", this.location._id);
    const foundData = await useWeatherdataStore().checkByLocationId(this.location._id)
    console.log(foundData);
    if (foundData !== undefined) {
      this.dataInformation.isDataRegistered = true;
      this.dataInformation.latestDataYear = foundData.Year;
    }
    this.dataInformation.isFetching = false;
  },
  methods: {
    async postData() {
      try {
        const response = await axios.delete(`http://127.0.0.1:5555/delete/${this.location.name}.json`);
        console.log('File deleted successfully:', response.data);

        const weatherData = await import(/* @vite-ignore */`~/static/${this.location.name}-weather.json`);
        useWeatherdataStore().postData(weatherData.default, this.location);

        this.isDataRegistered = true; // Update the reactivity of isDataRegistered
      } catch (error) {
        console.error('Error:', error);
      }
    },
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