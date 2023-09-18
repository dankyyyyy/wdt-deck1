<template>
  <div v-if="asset.category === 'WindTurbineGenerator'">
    <div class="w-min h-min deck-frame-white">
      <div class="w-full h-40 flex justify-center items-center">
        Place for image
      </div>
      <div class="w-full border-t-2 border-black p-2">
        <div class="flex justify-between">
          <h2 class="font-semibold text-lg mb-2">{{ asset.name }}</h2>

          <ModalDialogsUpdateAssetModal :asset="asset" v-if="isUpdateModalVisible" @hideModal="hideModal" />
          <ModalDialogsDeleteAssetModal :asset="asset" v-if="isDeleteModalVisible" @hideModal="hideModal" />

          <div class="flex space-x-2">
            <IconsUpdate @click="showUpdateModal" class="cursor-pointer" />
            <IconsDelete @click="showDeleteModal" class="cursor-pointer" />
          </div>
        </div>
      </div>

      <div class="w-full flex justify-between">
        <label for="limit" class="whitespace-nowrap">Wind Speed Limit: </label>    
        <p class="whitespace-nowrap">{{ asset.windSpeedLimit }}m/s</p>  
      </div>

      <div class="w-full flex justify-between">
        <label for="limit" class="w-min whitespace-nowrap">Maintenance: </label>
        <p class="w-min">{{ asset.plannedMaintenance }}h/WTG</p>
      </div>

      <div class="w-full flex justify-between">
        <label for="limit" class="w-min whitespace-nowrap">Troubleshoot Visits: </label>
        <p class="w-min">{{ asset.troubleshootVisits }}/WTG</p>
      </div>

      <div class="w-full flex justify-between">
        <label for="limit" class="w-min whitespace-nowrap">Average TS Hours (per visit):</label>
        <!--need to signify that the hours are split up between (typically) 3 staff, resulting in n/3 h/WTG-->
        <p class="w-min">{{ asset.averageTsHours }}h</p>
      </div>
    </div>
  </div>

  <div v-else>
    <div class="w-70 h-min deck-frame-white">
      <div class="w-full h-40 flex justify-center items-center">
        Place for image
      </div>
      <div class="w-full border-t-2 border-black p-2">
        <div class="flex justify-between">
          <h2 class="font-semibold text-lg mb-2">{{ asset.name }}</h2>

          <ModalDialogsUpdateAssetModal :asset="asset" v-if="isUpdateModalVisible" @hideModal="hideModal" />
          <ModalDialogsDeleteAssetModal :asset="asset" v-if="isDeleteModalVisible" @hideModal="hideModal" />

          <div class="flex space-x-2">
            <IconsUpdate @click="showUpdateModal" class="cursor-pointer" />
            <IconsDelete @click="showDeleteModal" class="cursor-pointer" />
          </div>
        </div>

        <div class="flex justify-between">
          <label for="limit" class="w-min whitespace-nowrap">Wind Speed Limit: </label>
          <p class="w-min">{{ asset.windSpeedLimit }}m/s</p>
        </div>

        <div v-if="asset.category === 'Vessel' || asset.category === 'Helicopter'">
          <div class="flex justify-between">
            <label for="limit">H<sub>s</sub> Limit:</label>
            <p>{{ asset.hs }}m</p>
          </div>

          <div class="flex justify-between">
            <label for="dayRate" class="w-min whitespace-nowrap">Day Rate: </label>
            <p class="w-min">{{ asset.dayRate }}€</p>
            <!--Info box for price ranges-->
            
          </div>
        </div>

        <div v-if="asset.category === 'Vessel'">
          <div class="flex justify-between">
            <label for="limit" class="w-min whitespace-nowrap">Vessel Speed: </label>
            <p class="w-min">{{ asset.vesselSpeed }}kt</p>
          </div>

          <div class="flex justify-between">
            <label for="limit" class="w-min whitespace-nowrap">High Engine Activity: </label>
            <p class="w-min">{{ asset.highEngineActivity }}h</p>
          </div>

          <div class="flex justify-between">
            <label for="limit" class="w-min whitespace-nowrap">Loitering: </label>
            <p class="w-min">{{ asset.loitering }}h</p>
          </div>
        </div>

        <div v-if="asset.category === 'Helicopter'">
          <div class="flex justify-between">
            <label for="limit" class="w-min whitespace-nowrap">Helicopter Speed: </label>
            <p class="w-min">{{ asset.helicopterSpeed }}kt</p>
          </div>

          <div class="flex justify-between">
            <label for="limit" class="w-min whitespace-nowrap">Cloudbase: </label>
            <p class="w-min">{{ asset.cloudbase }}m</p>
          </div>

          <div class="flex justify-between">
            <label for="limit" class="w-min whitespace-nowrap">Visibility: </label>
            <p class="w-min">{{ asset.visibility }}km</p>
          </div>
        </div>

        <div v-if="asset.category === 'Vessel' || asset.category === 'Helicopter'">
          <div class="flex justify-between">
            <label for="limit" class="w-min whitespace-nowrap">Fuel Consumption: </label>
            <p class="w-min">{{ asset.operationalFuelConsumption }}l/h</p>
          </div>
        </div>

        <div v-if="asset.category === 'Vessel'">
          <div class="flex justify-between">
            <label for="limit" class="w-min whitespace-nowrap">Fuel Consumption when Loitering: </label>
            <p class="w-min">{{ asset.loiteringFuelConsumption }}l/h</p>
          </div>
        </div>

        <div v-if="asset.category === 'Helicopter'">
          <div class="flex justify-between">
            <label for="limit" class="w-min whitespace-nowrap">Flight Time (2 round trips): </label>
            <p class="w-min">{{ asset.flightTime }}h</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AssetCard",
  props: {
    asset: {
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
