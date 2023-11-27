<template>
  <NuxtLink to="/">
    <IconsLogoInverted class="inline-block align-middle w-full" />
  </NuxtLink>
  <div class="heading-container">
    <h1 class="generic-header">Locations</h1>
    <DownloadButton @click="fetchMissingData" />
  </div>

  <ModalDialogsCreateLocationModal v-if="isModalVisible" @hideModal="hideModal" />
  <div deck-frame-translucent-container>
    <div v-if="!loading" class="grid deck-frame-translucent">
      <div v-for="location in locations" :key="location._id">
        <CardsLocationCard :location="location" @location-selected="handleLocationSelected"
          @location-deselected="handleLocationDeselected" />
      </div>
      <CreateButton @click="showModal" class="cursor-pointer" />
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
import "~/utils/chartUtils";

export default {
  name: "LocationList",
  data() {
    return {
      locations: [],
      loading: true,
      yearStart: 2004,
      yearNow: new Date().getFullYear(),
    };
  },
  async mounted() {
    this.locations = await useLocationStore().getAll();
    this.locations.sort((a, b) => {
      const nameA = a.name || '';
      const nameB = b.name || '';
      return nameA.localeCompare(nameB)
    });
    this.locations.length === 0 ? "" : this.loading = false;
  },
  async updated() {
    this.locations = await useLocationStore().getAll();
    this.locations.sort((a, b) => {
      const nameA = a.name || '';
      const nameB = b.name || '';
      return nameA.localeCompare(nameB)
    });
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
        const coordinates = decimalToCoordinates(location.longitude, location.latitude);
        const integrity = await checkIntegrity(location);
        console.log(integrity);

        for (let i = this.yearStart; i <= this.yearNow; i++) {
          if (integrity[i] === false) {
            console.log(`request sent for ${location.name}, year: ${i}`);
            const response = await axios.get(`http://127.0.0.1:5555/data/${coordinates.North}/${coordinates.West}/${coordinates.South}/${coordinates.East}/${location.name}/${i}`) //python api url could be moved to .env

            if (response.status === 200) {
              console.log(`request completed for ${location.name}, year: ${i}`);
              this.postData(response.data, location)
            } else console.log(`request for ${location.name}, year: ${i} incomplete, error code: ${response.status}`);
          }
        }
      } catch (error) {
        console.error('Error calling retrieve:', error);
      }
      this.$emit("newAdded")
    },
    async postData(weatherData, location) {
      try {
        useWeatherdataStore().postData(weatherData, location);
      } catch (error) {
        console.error('Error:', error);
      }
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
