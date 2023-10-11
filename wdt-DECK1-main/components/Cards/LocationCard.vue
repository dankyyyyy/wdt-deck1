<template>
  <div class="w-48 h-min deck-frame-white">
    <div class="w-full h-40 flex justify-center items-center">
      Place for image
    </div>
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
    <div class="w-full border-t-2 border-black p-2">
      <h2 class="font-semibold mb-2">{{ location.name }}</h2>
      <ModalDialogsUpdateLocationModal :location="location" v-if="isUpdateModalVisible" @hideModal="hideModal" />
      <ModalDialogsDeleteLocationModal :location="location" v-if="isDeleteModalVisible" @hideModal="hideModal" />
    
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
      isUpdateModalVisible: false,
      isDeleteModalVisible: false,
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