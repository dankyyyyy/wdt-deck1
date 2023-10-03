<template>
    <div class="overlay" @click="hideModal">
      <div class="modal rounded-lg flex-col">
        <h3 class="font-semibold">Location creation</h3>
        <div class="py-5 flex flex-col flex-wrap content-center">
          <div
            class="border-2 border-dashed rounded-md h-56 flex flex-col justify-center items-center"
          >
            <h3 class="text-center">
              Drag & drop your <br />
              location image
            </h3>
            <IconsDrop />
          </div>
          <div class="create-input">
            <label for="id">Id: </label>
            <input
              type="text"
              v-model="this.location.id"
              class="border-2 rounded-md text-center"
              disabled
            />
          </div>
          <div class="create-input">
            <label for="name">Name: </label>
            <input
              type="text"
              v-model="location.name"
              class="border-2 rounded-md text-center"
            />
          </div>
          <div class="create-input">
            <label for ="latitude">Latitude: </label>
            <input
            type="text"
            v-model="location.latitude"
            class="border-2 rounded-md text-center"
            />
          </div>
          <div class="create-input">
            <label for ="longitude">Longitude: </label>
            <input
            type="text"
            v-model="location.longitude"
            class="border-2 rounded-md text-center"
            />
            </div>
          <div class="create-input">
            <label for="limit">Limit: </label>
            <input
              type="text"
              v-model="location.limit"
              class="border-2 rounded-md text-center"
            />
          </div>
          <div class="create-input">
            <label for="wtg">WTG: </label>
            <input
              type="text"
              v-model="location.wtg"
              class="border-2 rounded-md text-center"
            />
          </div>
        </div>
        <div class="flex w-full justify-end">
          <button
            type="submit"
            class="border-2 rounded-md px-2"
            @click="handleCancelClick"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="rounded-md px-2 ml-2 dialog-button"
            @click="handleSaveClick"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useLocationStore } from "~/stores/LocationStore";
  import axios from "axios";
  
  
  export default {
    name: "CreateLocationModal",
    data() {
      return {
        location: {
          name: "",
          latitude: 0,
          longitude: 0,
          limit: "",
        },
      };
    },
    methods: {
      handleCancelClick() {
        this.$emit("hideModal");
      },
      async handleSaveClick() {
        const store = useLocationStore();
        await store.post(this.location)
        const coordinates = this.decimalToCoordinates(this.location.longitude, this.location.latitude)
        this.callRetrieve(coordinates.North, coordinates.West, coordinates.South, coordinates.East, this.location.name);
        this.$emit("hideModal");
      },
      async callRetrieve(north, west, south, east, locName) {
        try {
            const c1 = north
            const c2 = west
            const c3 = south
            const c4 = east
            const name = locName
            const yearNow = new Date().getFullYear()
            for (let i = yearNow; i > yearNow-20; i = i-2) {
              console.log('asdasd');
            const response = await axios.get(`http://127.0.0.1:5555/data/${c1}/${c2}/${c3}/${c4}/${name}/${i}`); //python api url could be moved to .env
            }
          } catch (error) {
          console.error('Error calling retrieve:', error);
        }
      },
      decimalToCoordinates(long, lat) {
        //!!!!!! ?
        let north, west, south, east;
        north = Number(lat) + 0.75
        south = Number(lat) - 0.75
        west = Number(long) - 0.75
        east = Number(long) + 0.75
        // Create an object to store the results
        return {
          North: north,
          South: south,
          East: east,
          West: west,
        };
    },
    },
  };
  </script>
  