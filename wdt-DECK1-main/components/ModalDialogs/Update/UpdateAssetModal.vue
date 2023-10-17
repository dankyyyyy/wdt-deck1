<template>
  <div class="overlay" @click="hideModal">
    <div class="modal rounded-lg flex-col">
      <h3 class="font-semibold">Update an Asset</h3>
      <div class="py-5 flex flex-col flex-wrap content-normal">

        <div class="border-2 border-dashed rounded-md h-56 flex flex-col justify-center items-center">
          <h3 class="text-center">
            Drag & drop your <br />
            asset image
          </h3>
          <IconsDrop />
        </div>

        <div class="update-input">
          <label for="name">Name: </label>
          <input type="text" v-model="assetRef.name" class="border-2 rounded-md text-center" />
        </div>

        <div class="update-input">
          <label for="category">Category: </label>
          <input type="text" v-model="assetRef.category" class="border-2 rounded-md text-center" disabled />
        </div>

        <div class="update-input">
          <label for="windSpeedLimit">Wind Speed Limit: </label>
          <input type="text" v-model="assetRef.windSpeedLimit" class="border-2 rounded-md text-center" />
          <label for="windSpeedLimit"> m/s</label>
        </div>

        <div v-if="assetRef.category === 'Vessel' || assetRef.category === 'Helicopter'">
          <div class="update-input">
            <label for="limit">H<sub>S</sub> Limit: </label>
            <input type="text" v-model="assetRef.hs" class="border-2 rounded-md text-center " />
            <label for="limit"> m</label>
          </div>

          <div class="update-input">
            <label for="dayRate">Day Rate: </label>
            <input type="text" v-model="assetRef.dayRate" class="border-2 rounded-md text-center " />
            <label for="dayRate"> €</label>
          </div>
        </div>

        <div v-if="assetRef.category === 'Vessel'">
          <div class="update-input">
            <label for="vesselSpeed">Vessel Speed: </label>
            <input type="text" v-model="assetRef.vesselSpeed" class="border-2 rounded-md text-center " />
            <label for="vesselSpeed"> kt</label>
          </div>

          <div class="update-input">
            <label for="highEngineActivity">High Engine Activity: </label>
            <input type="text" v-model="assetRef.highEngineActivity" class="border-2 rounded-md text-center" />
            <label for="highEngineActivity"> h</label>
          </div>

          <div class="update-input">
            <label for="highEngineActivity">Loitering: </label>
            <input type="text" v-model="assetRef.loitering" class="border-2 rounded-md text-center" />
            <label for="highEngineActivity"> h</label>
          </div>
        </div>

        <div v-else-if="assetRef.category === 'Helicopter'">
          <div class="update-input">
            <label for="helicopterSpeed">Helicopter Speed: </label>
            <input type="text" v-model="assetRef.helicopterSpeed" class="border-2 rounded-md text-center" />
            <label for="helicopterSpeed"> kt</label>
          </div>

          <div class="update-input">
            <label for="limit">Cloudbase: </label>
            <input type="text" v-model="assetRef.cloudbase" class="border-2 rounded-md text-center" />
            <label for="cloudbase"> m</label>
          </div>

          <div class="update-input">
            <label for="limit">Visibility: </label>
            <input type="text" v-model="assetRef.visibility" class="border-2 rounded-md text-center" />
            <label for="visibility"> km</label>
          </div>
        </div>

        <div class="update-input">
          <label for="operationalFuelConsumption">Fuel Consumption: </label>
          <input type="text" v-model="assetRef.operationalFuelConsumption" class="border-2 rounded-md text-center " />
          <label for="operationalFuelConsumption"> l/h</label>
        </div>

        <div v-if="assetRef.category === 'Vessel'">
          <div class="update-input">
            <label for="operationalFuelConsumption">Fuel Consumption when Loitering: </label>
            <input type="text" v-model="assetRef.loiteringFuelConsumption" class="border-2 rounded-md text-center " />
            <label for="operationalFuelConsumption"> l/h</label>
          </div>
        </div>

        <div v-if="assetRef.category === 'Helicopter'">
          <div class="update-input">
            <label for="operationalFuelConsumption">Flight Time (2 round trips): </label>
            <input type="text" v-model="assetRef.flightTime" class="border-2 rounded-md text-center " />
            <label for="operationalFuelConsumption"> h</label>
          </div>
        </div>

        <div v-else-if="assetRef.category === 'WindTurbineGenerator'">
          <div class="update-input">
            <label for="limit">Planned Maintenance: </label>
            <input type="text" v-model="assetRef.plannedMaintenance" class="border-2 rounded-md text-center" />
            <label for="plannedMaintenance"> h/WTG</label>
          </div>

          <div class="update-input">
            <label for="limit">Troubleshoot Visits: </label>
            <input type="text" v-model="assetRef.troubleshootVisits" class="border-2 rounded-md text-center" />
            <label for="troubleshootVisits"> /WTG</label>
          </div>

          <div class="update-input">
            <label for="limit">Average TS hours: </label>
            <input type="text" v-model="assetRef.averageTsHours" class="border-2 rounded-md text-center" />
            <label for="averageTsHours"> h</label>
          </div>
        </div>
      </div>

      <div class="flex w-full justify-end">
        <button type="submit" class="border-2 rounded-md px-2" @click="handleCancelClick">
          Cancel
        </button>

        <button type="submit" class="rounded-md px-2 ml-2 dialog-button" @click="handleSaveClick">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useAssetStore } from "~/stores/AssetStore";


export default {
  name: "UpdateAssetModal",
  props: {
    asset: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    const assetRef = ref(props.asset);

    return {
      assetRef,
    }
  },
  methods: {
    handleCancelClick() {
      this.$emit("hideModal");
    },
    async handleSaveClick() {
      const store = useAssetStore();
      console.log(this.assetRef);
      await store.put(this.assetRef);
      this.$emit("hideModal");
    },
  },
};
</script>