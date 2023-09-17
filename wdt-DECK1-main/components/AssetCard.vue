<template>
  <div class="w-50 h-min deck-frame-white">
    <div class="w-full h-40 flex justify-center items-center">
      Place for image
    </div>
    <div class="w-full border-t-2 border-black p-2">
      <div class="flex justify-between">
        <h2 class="font-semibold text-lg mb-2">{{ asset.name }}</h2>

        <UpdateAssetModal :asset="asset" v-if="isUpdateModalVisible" @hideModal="hideModal" />
        <DeleteAssetModal :asset="asset" v-if="isDeleteModalVisible" @hideModal="hideModal" />

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
          <IconsInfo class="" />
        </div>

        <div class="flex justify-between">
          <label for="dayRate" class="w-min whitespace-nowrap">Day Rate: </label>
          <p class="w-min">{{ asset.dayRate }}€</p>
          <!--Info box for price ranges-->
          <IconsInfo class="" />
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

      <div v-if="asset.category === 'Vessel' || asset.category === 'Helicopter'">
        <div class="flex justify-between">
          <label for="limit" class="w-min whitespace-nowrap">Daily Available Time: </label>
          <p class="w-min">{{ asset.dailyAvailableTimePerTeam }}h/team</p>
        </div>

        <div class="flex justify-between">
          <label for="limit" class="w-min whitespace-nowrap">Team Size: </label>
          <p class="w-min">{{ asset.staffPerTeam }} people</p>
        </div>

        <div class="flex justify-between">
          <label for="limit" class="w-min whitespace-nowrap">Total Available Time: </label>
          <p class="w-min">{{ asset.totalYearlyAvailableTime }}/year</p>
        </div>
      </div>
    </div>

    <div v-if="asset.category === 'WindTurbineGenerator'">
      <div class="flex justify-between">
        <label for="limit" class="w-min whitespace-nowrap">Planned Maintenance: </label>
        <p class="w-min">{{ asset.plannedMaintenance }}h/WTG</p>
      </div>
      <div class="flex justify-between">
        <label for="limit" class="w-min whitespace-nowrap">Troubleshoot Visits (annually): </label>
        <p class="w-min">{{ asset.troubleshootVisits }}/WTG</p>
      </div>
      <div class="flex justify-between">
        <label for="limit" class="w-min whitespace-nowrap">Average TS Hours (per visit):</label>
        <!--need to signify that the hours are split up between (typically) 3 staff, resulting in n/3 h/WTG-->
        <p class="w-min">{{ asset.averageTsHours }}</p>
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
