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
            class="rounded-md px-2 ml-2 action-button"
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
  
  const store = useLocationStore();
  
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
        await store.post(this.location)
        this.$emit("hideModal");
      },
    },
  };
  </script>
  