<template>
  <div class="overlay" @click="hideModal">
    <div class="modal rounded-lg flex-col" style="max-height: 80%; overflow-y: scroll; overflow-x: hidden;">
      <h3 class="font-semibold box-title">Asset Creation</h3>
      <div class="py-5 flex flex-col flex-wrap content-normal">
        <div class="create-input">
          <label for="name">Name: </label>
          <input type="text" v-model="asset.name" class="border-2 rounded-md text-center" />
        </div>

        <div class="create-input">
          <label for="name">Category:</label>
          <select name="category" v-model="asset.category" class="border-2 rounded-md text-left">
            <option value="Vessel">Vessel</option>
            <option value="Helicopter">Helicopter</option>
          </select>
        </div>

        <div class="create-input">
          <label for="name">Team:</label>
          <select id="team" v-model="asset.team" class="border-2 rounded-md text-left">
            <option value="" disabled selected>Team</option>
            <option v-for="(option, index) in teams" :key="index" :value="option">
              {{ option.name }}
            </option>
          </select>
        </div>

        <div v-if="asset.category === 'Vessel' || asset.category === 'Helicopter'">
          <div class="create-input whitespace-nowrap">
            <label for="windSpeedLimit">Wind Speed Limit: </label>
            <input type="text" v-model="asset.windSpeedLimit" class="border-2 rounded-md text-center " />
            <label for="windSpeedLimit"> m/s</label>
          </div>

          <div class="create-input whitespace-nowrap">
            <label for="limit">H<sub>S</sub> Limit: </label>
            <input type="text" v-model="asset.hs" class="border-2 rounded-md text-center " />
            <label for="limit"> m</label>
          </div>

          <div class="create-input whitespace-nowrap">
            <label for="dayRate">Day Rate: </label>
            <input type="text" v-model="asset.dayRate" class="border-2 rounded-md text-center " />
            <label for="dayRate"> €</label>
          </div>
        </div>

        <div v-if="asset.category === 'Vessel'">
          <div class="create-input whitespace-nowrap">
            <label for="vesselSpeed">Vessel Speed: </label>
            <input type="text" v-model="asset.vesselSpeed" class="border-2 rounded-md text-center " />
            <label for="vesselSpeed"> kt</label>
          </div>

          <div class="create-input whitespace-nowrap">
            <label for="highEngineActivity">High Engine Activity: </label>
            <input type="text" v-model="asset.highEngineActivity" class="border-2 rounded-md text-center " />
            <label for="highEngineActivity"> h</label>
          </div>

          <div class="create-input whitespace-nowrap">
            <label for="highEngineActivity">Loitering: </label>
            <input type="text" v-model="asset.loitering" class="border-2 rounded-md text-center " />
            <label for="highEngineActivity"> h</label>
          </div>
        </div>

        <div v-else-if="asset.category === 'Helicopter'">
          <div class="create-input">
            <label for="helicopterSpeed">Helicopter Speed: </label>
            <input type="text" v-model="asset.helicopterSpeed" class="border-2 rounded-md text-center" />
            <label for="helicopterSpeed"> kt</label>
          </div>

          <div class="create-input">
            <label for="limit">Cloudbase: </label>
            <input type="text" v-model="asset.cloudbase" class="border-2 rounded-md text-center" />
            <label for="cloudbase"> m</label>
          </div>

          <div class="create-input">
            <label for="limit">Visibility: </label>
            <input type="text" v-model="asset.visibility" class="border-2 rounded-md text-center" />
            <label for="visibility"> km</label>
          </div>
        </div>

        <div v-if="asset.category === 'Vessel' || asset.category === 'Helicopter'">
          <div class="create-input whitespace-nowrap">
            <label for="highEngineActivity">Fuel Consumption: </label>
            <input type="text" v-model="asset.operationalFuelConsumption" class="border-2 rounded-md text-center " />
            <label for="highEngineActivity"> l/h</label>
          </div>
        </div>

        <div v-if="asset.category === 'Vessel'">
          <div class="create-input whitespace-nowrap">
            <label for="highEngineActivity">Fuel Consumption when Loitering: </label>
            <input type="text" v-model="asset.loiteringFuelConsumption" class="border-2 rounded-md text-center " />
            <label for="highEngineActivity"> l/h</label>
          </div>
        </div>

        <div v-else-if="asset.category === 'Helicopter'">
          <div class="create-input whitespace-nowrap">
            <label for="highEngineActivity">Flight Time (2 round trips): </label>
            <input type="text" v-model="asset.flightTime" class="border-2 rounded-md text-center " />
            <label for="highEngineActivity"> h</label>
          </div>
        </div>
      </div>
      <div class="flex w-full justify-between">
        <button type="submit" class="border-2 rounded-md px-2" @click="showTeamModal">Create a Team</button>
        <ModalDialogsCreateTeamModal v-if="isTeamModalVisible" @hideModal="hideTeamModal" />
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
  </div>
</template>

<script>
import { useAssetStore } from "~/stores/AssetStore";
import { useTeamStore } from "~/stores/TeamStore";

export default {
  name: "CreateAssetModal",
  data() {
    return {
      asset: {
        name: "",
        category: "",
      },
      teams: [],
      isTeamModalVisible: false,
    };
  },
  async mounted() {
    this.teams = await useTeamStore().getAll();
  },
  methods: {
    handleCancelClick() {
      this.$emit("hideModal");
    },
    async handleSaveClick() {
      await this.validateAsset(this.asset);
    },
    async isADupe(asset) {
      const assets = await useAssetStore().getAll();
      var isADupe = false;

      for (let i = 0; i < assets.length; i++) {
        if (assets[i].name === asset.name) {
          isADupe = true;
          break;
        }
      }
      return isADupe;
    },
    async validateAsset(asset) {
      if (await this.isADupe(asset)) {
        showError("Name already taken, please select a different one.");
      } else if (
        !isString(asset.name) ||
        !isNumber(asset.windSpeedLimit) ||
        !isNumber(asset.hs) ||
        !isNumber(asset.dayRate) ||
        !isNumber(asset.vesselSpeed) ||
        !isNumber(asset.highEngineActivity) ||
        !isNumber(asset.loitering) ||
        !isNumber(asset.helicopterSpeed) ||
        !isNumber(asset.cloudbase) ||
        !isNumber(asset.visibility) ||
        !isNumber(asset.operationalFuelConsumption) ||
        !isNumber(asset.loiteringFuelConsumption) ||
        !isNumber(asset.flightTime)
      ) {
        showError("Please make sure all attributes except name are numerical.");
      } else if (
        asset.name === "" ||
        asset.windSpeedLimit === null ||
        asset.hs === null ||
        asset.dayRate === null ||
        asset.vesselSpeed === null ||
        asset.highEngineActivity === null ||
        asset.loitering === null ||
        asset.helicopterSpeed === null ||
        asset.cloudbase === null ||
        asset.visibility === null ||
        asset.operationalFuelConsumption === null ||
        asset.loiteringFuelConsumption === null ||
        asset.flightTime === null
      ) {
        showError("Please make sure all fields are filled in.");
      } else {
        await store.post(this.asset);
        this.$emit("hideModal");
      }
    },
    showTeamModal() {
      this.isTeamModalVisible = true;
    },
    hideTeamModal() {
      this.isTeamModalVisible = false;
    },
  },
};
</script>
