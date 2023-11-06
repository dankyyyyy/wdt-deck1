<template>
  <NuxtLink to="/">
    <IconsLogoInverted class="inline-block align-middle w-full" />
  </NuxtLink>
  <div class="heading-container">
    <h1 class="generic-header">Locations</h1>
    <DownloadButton @click="fetchMissingData" />
  </div>

  <IconsAdd @click="showModal" class="cursor-pointer" />
  

  <ModalDialogsCreateLocationModal v-if="isModalVisible" @hideModal="hideModal" />
  <div deck-frame-translucent-container>
    <div v-if="!loading" class="grid deck-frame-translucent">
      <div v-for="location in locations" :key="location._id">
        <CardsLocationCard :location="location" @location-selected="handleLocationSelected"
          @location-deselected="handleLocationDeselected" />
      </div>
      <SubmitButton @click="navigateToNextPage" />
    </div>
    <div v-else>
      Loading data...
    </div>
  </div>
</template>

<script>
import { useLocationStore } from "~/stores/LocationStore";
import axios from "axios";
import { useWeatherdataStore } from "~/stores/WeatherdataStore";

export default {
  name: "LocationList",
  data() {
    return {
      locations: [],
      isModalVisible: false,
      loading: true,
    };
  },
  async mounted() {
    this.locations = await useLocationStore().getAll();
    this.locations.sort((a, b) => { return a.name.localeCompare(b.name) });
    this.locations.length === 0 ? "" : this.loading = false;
  },
  async updated() {
    this.locations = await useLocationStore().getAll();
    this.locations.sort((a, b) => { return a.name.localeCompare(b.name) });
    this.locations.length === 0 ? "" : this.loading = false;
  },
  methods: {
    async fetchMissingData() {
      console.log("Starting...")
      const location = await useLocationStore().getSelectedLocation();
      this.callRetrieve(location);
    },
    async callRetrieve(location) {
      try {
        const coordinates = this.decimalToCoordinates(location.longitude, location.latitude);
        const integrity = await this.checkIntegrity(location);
        const yearNow = new Date().getFullYear();
        console.log(integrity);

        for (let i = yearNow; i > yearNow - 20; i--) {
          if (integrity[i] === false) {
            console.log(`request sent for ${location.name}, year: ${i}`);
            const response = await axios.get(`http://127.0.0.1:5555/data/${coordinates.North}/${coordinates.West}/${coordinates.South}/${coordinates.East}/${location.name}/${i}`) //python api url could be moved to .env

            if (response.status === 200) {
              console.log(`request completed for ${location.name}, year: ${i}`);
              this.postData(response.data, location)
            } else console.log(`request for ${location.name}, year: ${i} incomplete, error code: ${response.status}`);
          } else {
            console.log(`Data for ${location.name} is up to date!`);
          }
        }
      } catch (error) {
        console.error('Error calling retrieve:', error);
      }
      this.$emit("newAdded")
    },
    async checkIntegrity(location) {
      var integrity = [];
      const yearNow = new Date().getFullYear()
      for (let i = yearNow; i > yearNow - 20; i--) {
          integrity[i] = await useWeatherdataStore().checkByYear(location._id, i);
      }
      return integrity;
    },
    async postData(weatherData, location) {
      try {
        // const response = await axios.delete(`http://127.0.0.1:5555/delete/${this.location.name}.json`);
        // console.log('File deleted successfully:', response.data);
        // const weatherData = await import(/* @vite-ignore */`~/static/${location.name}-weather.json`);
        useWeatherdataStore().postData(weatherData, location);
      } catch (error) {
        console.error('Error:', error);
      }
    },
    decimalToCoordinates(long, lat) {
      let north, west, south, east;
      north = Number(lat) + 0.75
      south = Number(lat) - 0.75
      west = Number(long) - 0.75
      east = Number(long) + 0.75
      return {
        North: north,
        South: south,
        East: east,
        West: west,
      };
    },
    showModal() {
      this.isModalVisible = true;
    },
    hideModal() {
      this.isModalVisible = false;
    },
    handleLocationSelected(location) {
      useLocationStore().setSelectedLocation(location);
    },
    handleLocationDeselected() {
      useLocationStore().setSelectedLocation(null);
    },
    navigateToNextPage() {
      if (useLocationStore().getSelectedLocation() !== null) {
        this.$router.push('/wtgs');
      }
    }
  },
};
</script>
