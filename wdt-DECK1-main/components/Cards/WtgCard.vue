<template>
      <div class="w-min h-min deck-frame-white">
        <div class="w-full h-40 flex justify-center items-center">
          Place for image
        </div>
        <div class="w-full border-t-2 border-black p-2">
          <div class="flex justify-between">
            <h2 class="font-semibold text-lg mb-2">{{ wtg.name }}</h2>
  
            <!---<ModalDialogsUpdateAssetModal :wtg="wtg" v-if="isUpdateModalVisible" @hideModal="hideModal" />
            <ModalDialogsDeleteAssetModal :wtg="wtg" v-if="isDeleteModalVisible" @hideModal="hideModal" />-->
  
            <div class="flex space-x-2">
              <IconsUpdate @click="showUpdateModal" class="cursor-pointer" />
              <IconsDelete @click="showDeleteModal" class="cursor-pointer" />
            </div>
          </div>
        </div>
  
        <div class="w-full flex justify-between">
          <label for="limit" class="whitespace-nowrap">Wind Speed Limit: </label>    
          <p class="whitespace-nowrap">{{ wtg.windSpeedLimit }}m/s</p>  
        </div>
  
        <div class="w-full flex justify-between">
          <label for="limit" class="w-min whitespace-nowrap">Maintenance: </label>
          <p class="w-min">{{ wtg.plannedMaintenance }}h/WTG</p>
        </div>
  
        <div class="w-full flex justify-between">
          <label for="limit" class="w-min whitespace-nowrap">Troubleshoot Visits: </label>
          <p class="w-min">{{ wtg.troubleshootVisits }}/WTG</p>
        </div>
  
        <div class="w-full flex justify-between">
          <label for="limit" class="w-min whitespace-nowrap">Average TS Hours (per visit):</label>
          <!--need to signify that the hours are split up between (typically) 3 staff, resulting in n/3 h/WTG-->
          <p class="w-min">{{ wtg.averageTsHours }}h</p>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "WtgCard",
    props: {
      wtg: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        isUpdateModalVisible: false,
        isDeleteModalVisible: false,
      };
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
  