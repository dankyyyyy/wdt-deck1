<template>
  <div class="grid-container">
    <div class="grid">
      <div class="preset-box">
        <div class="box-content">
          <IconsLogoInverted class="box-image inline-block align-middle w-full" />
              <h2 class="box-title">{{ wtg.name }}</h2>

              <!---<ModalDialogsUpdateAssetModal :wtg="wtg" v-if="isUpdateModalVisible" @hideModal="hideModal" />
            <ModalDialogsDeleteAssetModal :wtg="wtg" v-if="isDeleteModalVisible" @hideModal="hideModal" />-->

              <div class="flex space-x-2">
                <IconsUpdate @click="showUpdateModal" class="cursor-pointer" />
                <IconsDelete @click="showDeleteModal" class="cursor-pointer" />
              </div>
            </div>
          </div>

          <div class="box-text">
            <label for="limit">Wind Speed Limit: </label>
            <p class="whitespace-nowrap">{{ wtg.windSpeedLimit }}m/s</p>
            <hr/>
            <label for="limit">Maintenance: </label>
            <p class="box-text-type">{{ wtg.plannedMaintenance }}h/WTG</p>
            <hr/>
            <label for="limit">Troubleshoot Visits: </label>
            <p class="box-text-type">{{ wtg.troubleshootVisits }}/WTG</p>
            <hr/>
            <label for="limit">Average TS Hours (per visit):</label>
            <!--need to signify that the hours are split up between (typically) 3 staff, resulting in n/3 h/WTG-->
            <p class="box-text-type">{{ wtg.averageTsHours }}h</p>
          </div>
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
  