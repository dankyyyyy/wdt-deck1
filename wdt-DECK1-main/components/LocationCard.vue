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
        <label for="latitude">Latitude: </label>
        <input
          type="text"
          v-model="latitude"
          class="w-32 border-2 rounded-md text-center"
          disabled
        />
        <label for="longitude">Longitude: </label>
        <input
        type="text"
        v-model="longitude"
        class="w-32 border-2 rounded-md text-center"
        disabled
        />
      <label for="limit">Limit: </label>
      <input
        type="text"
        v-model="limit"
        class="w-32 border-2 rounded-md text-center"
        disabled
      />
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
    data(props) {
      return {
        name: props.location.name,
        latitude: props.location.latitude,
        longitude: props.location.longitude,
        limit: props.location.limit,
        isDataRegistered: false,
      };
    },
    //check if data is registered with the provided location id
    async mounted() {
      if (await useWeatherdataStore().checkByLocationId(this.location._id)){
        this.isDataRegistered = true
      }
    },
    methods: {
      async postData() {
        const weatherData = await import(`~/static/${this.location.name}.json`) //sometimes works with '~' sometimes with '..' please help
        useWeatherdataStore().postData(weatherData.default, this.location).finally(() => {
        this.isDataRegistered = true; // Update the reactivity of isDataRegistered
        });
        try {
          const response = await axios.delete(`http://127.0.0.1:5555/delete/${this.location.name}.json`);
          console.log('File deleted successfully:', response.data);
        } catch (error) {
          console.error('Error deleting file:', error);
        }
      }
    }
  };
  </script>
  