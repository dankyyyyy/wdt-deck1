<template>
  <div class="grid-container">
    <div class="grid">
      <div class="card-box" @click="selectLocation" :class="{ 'selected': isSelected }">
        <div class="box-content">
          <IconsLogoInverted class="box-image inline-block align-middle w-full" />
          <!-- <div v-if="!isDataRegistered">
            <button @click="postData">Register data</button>
          </div>
          <div v-else>
            <p>Data is present</p>
          </div> -->
          <h2 class="box-title">{{ location.name }}</h2>
          <ModalDialogsUpdateLocationModal :location="location" v-if="isUpdateModalVisible" @hideModal="hideModal" />
          <ModalDialogsDeleteLocationModal :location="location" v-if="isDeleteModalVisible" @hideModal="hideModal" />

          <div class="flex space-x-2">
            <IconsUpdate @click="showUpdateModal" class="cursor-pointer" />
            <IconsDelete @click="showDeleteModal" class="cursor-pointer" />
          </div>

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
      isDataRegistered: false,
      isUpdateModalVisible: false,
      isDeleteModalVisible: false,
      isSelected: false,
    };
  },
  async mounted() {
    if (await useWeatherdataStore().checkByLocationId(this.location._id)) {
      this.isDataRegistered = true;
    }
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
    showUpdateModal() {
      this.isUpdateModalVisible = true;
    },
    showDeleteModal() {
      this.isDeleteModalVisible = true;
    },
    hideModal() {
      this.isUpdateModalVisible = false;
      this.isDeleteModalVisible = false;
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

.selected {
  background-color: #abd5e5;
  /* Change to DECK1 Blue with 25% opacity */
}
</style>