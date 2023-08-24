<template>
  <div class="overlay" @click="hideModal">
    <div class="modal rounded-lg flex-col">
      <h3 class="font-semibold">Asset creation</h3>
      <div class="py-5 flex flex-col flex-wrap content-normal">
        <div
          class="border-2 border-dashed rounded-md h-56 flex flex-col justify-center items-center"
        >
          <h3 class="text-center">
            Drag & drop your <br />
            asset image
          </h3>
          <IconsDrop />
        </div>
        <div class="create-input">
          <label for="id">Id: </label>
          <input
            type="text"
            v-model="this.asset.id"
            class="border-2 rounded-md text-left"
            disabled
          />
        </div>
        <div class="create-input">
          <label for="name">Name: </label>
          <input
            type="text"
            v-model="asset.name"
            class="border-2 rounded-md text-center"
          />
        </div>
        <div class="create-input">
          <label for="name">Category:</label>
          <select name="category" v-model="asset.category" class="border-2 rounded-sm text-left">
            <option value="Vessel">Vessel</option>
            <option value="Helicopter">Helicopter</option>
            <option value="WindTurbineGenerator">Wind turbine generator</option>
          </select>
        </div>
        <div v-if="asset.category === 'Vessel'">
          <div class="create-input whitespace-nowrap">
            <label for="limit">HS limit: </label>
            <input
              type="text"
              v-model="asset.hs"
              class="border-2 rounded-sm text-center "
            />
          </div>
        </div>
        <div v-else-if="asset.category === 'Helicopter'">
          <div class="create-input">
            <label for="limit">Cloudbase: </label>
            <input
              type="text"
              v-model="asset.cloudbase"
              class="border-2 rounded-md text-center"
            />
          </div>
          <div class="create-input">
            <label for="limit">Visibility: </label>
            <input
              type="text"
              v-model="asset.visibility"
              class="border-2 rounded-md text-center"
            />
          </div>
        </div>
        <div v-else-if="asset.category === 'WindTurbineGenerator'">
          <div class="create-input whitespace-nowrap">
            <label for="limit">Windspeed limit: </label>
            <input
              type="text"
              v-model="asset.windspeedlimit"
              class="border-2 rounded-sm text-center"
            />
          </div>
          <div class="create-input whitespace-nowrap">
            <label for="limit">Planned Maintenance: </label>
            <input
              type="text"
              v-model="asset.plannedmaintenance"
              class="border-2 rounded-sm text-center"
              />
              </div>
        <div class="create-input whitespace-nowrap">
            <label for="limit">Troubleshoot Visitings: </label>
            <input
              type="text"
              v-model="asset.troubleshootvisitings"
              class="border-2 rounded-sm text-center"
              />
              </div>
              <div class="create-input whitespace-nowrap">
            <label for="limit">Average TS hours: </label>
            <input
              type="text"
              v-model="asset.averagetshours"
              class="border-2 rounded-sm text-center"
              />
              </div>
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
import { useAssetStore } from "~/stores/AssetStore";

const store = useAssetStore();

export default {
  name: "CreateAssetModal",
  data() {
    return {
      asset: {
        name: "",
        category: "",
      },
    };
  },
  methods: {
    handleCancelClick() {
      this.$emit("hideModal");
    },
    async handleSaveClick() {
      await store.post(this.asset);
      this.$emit("hideModal");
    },
  },
};
</script>
