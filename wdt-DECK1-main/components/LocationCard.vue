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
      <UpdateLocationModal :location="location" v-if="isUpdateModalVisible" @hideModal="hideModal" />
      <DeleteLocationModal :location="location" v-if="isDeleteModalVisible" @hideModal="hideModal" />
    
      <div class="flex space-x-2">
          <IconsUpdate @click="showUpdateModal" class="cursor-pointer" />
          <IconsDelete @click="showDeleteModal" class="cursor-pointer" />
      </div>
      
      <label>Latitude: </label>
      <input type="text" v-model="location.latitude" class="w-32 border-2 rounded-md text-center" disabled />
      <label>Longitude: </label>
      <input type="text" v-model="location.longitude" class="w-32 border-2 rounded-md text-center" disabled />
      <label>Wind speed limit: </label>
      <input type="text" v-model="location.limit" class="w-32 border-2 rounded-md text-center" disabled />
      <label>WTG: </label>
      <input type="text" v-model="location.wtg" class="w-32 border-2 rounded-md text-center" disabled />
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
      isDataRegistered: false,
      isUpdateModalVisible: false,
      isDeleteModalVisible: false,
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
  },
};
</script>