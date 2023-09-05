<template>
  <div class="w-48 h-min deck-frame-white">
    <div class="w-full h-40 flex justify-center items-center">
      Place for image
    </div>
    <div v-if="!isDataRegistered">
      <button @click="postData">Register data</button>
    </div>
    <div v-else>
      <p>Data is present</p>
    </div>
    <div class="w-full border-t-2 border-black p-2">
      <h2 class="font-semibold mb-2">{{ location.name }}</h2>
      <UpdateLocationModal :location="location" v-if="isModalVisible" @hideModal="hideModal" />
      <IconsCardOptions @click="showModal" class="cursor-pointer" />
      <label for="latitude">Latitude: </label>
      <input type="text" v-model="latitude" class="w-32 border-2 rounded-md text-center" disabled />
      <label for="longitude">Longitude: </label>
      <input type="text" v-model="longitude" class="w-32 border-2 rounded-md text-center" disabled />
      <label for="limit">Limit: </label>
      <input type="text" v-model="limit" class="w-32 border-2 rounded-md text-center" disabled />
    </div>
  </div>
</template>

<script>
import { useWeatherdataStore } from "~/stores/WeatherdataStore";
import axios from "axios";

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
      name: this.location.name,
      latitude: this.location.latitude,
      longitude: this.location.longitude,
      limit: this.location.limit,
      isDataRegistered: false,
      isModalVisible: false,
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

        const weatherData = await import(`~/static/${this.location.name}-weather.json`);
        useWeatherdataStore().postData(weatherData.default, this.location);

        this.isDataRegistered = true; // Update the reactivity of isDataRegistered
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
  },
};
</script>