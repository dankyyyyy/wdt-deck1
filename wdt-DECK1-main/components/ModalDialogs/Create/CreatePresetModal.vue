<template>
    <div class="overlay" @click="hideModal">
      <div class="modal rounded-lg flex-col" style="max-height: 80%; overflow-y: scroll; overflow-x: hidden;">
        <h3 class="font-semibold">Preset creation</h3>
        <div class="py-5 flex flex-col flex-wrap content-normal">
          <div class="border-2 border-dashed rounded-md h-56 flex flex-col justify-center items-center">
            <h3 class="text-center">
              Drag & drop your <br />
              asset image
            </h3>
            <IconsDrop />
          </div>
  
          <div class="create-input">
            <label for="id">Id: </label>
            <input type="text" v-model="this.preset.id" class="border-2 rounded-md text-left" disabled />
          </div>
  
          <div class="create-input">
            <label for="name">Name: </label>
            <input type="text" v-model="preset.name" class="border-2 rounded-md text-center" />
          </div>

          <div class="create-input">
            <label for="name">Location:</label>
            <select id="location" v-model="preset.location" class="border-2 rounded-md text-left">
                <option value="" disabled selected>Location</option>
                <option v-for="(option, index) in locations" :key="index" :value="option">
                {{ option.name }}
            </option>
            </select>
          </div>
  
          <div class="create-input">
            <label for="name">WTG:</label>
            <select id="wtg" v-model="preset.wtg" class="border-2 rounded-md text-left">
                <option value="" disabled selected>WTG</option>
                <option v-for="(option, index) in wtgs" :key="index" :value="option">
                {{ option.name }}
            </option>
            </select>
          </div>

          <div class="create-input">
            <label for="name">Assets:</label>
            <select id="assets" v-model="preset.assets" multiple="multiple" class="border-2 rounded-md text-left">
                <option value="" disabled selected>Assets</option>
                <option v-for="(option, index) in assets" :key="index" :value="option">
                {{ option.name }}
            </option>
            </select>
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
import { useLocationStore } from "~/stores/LocationStore";
import { usePresetStore } from "~/stores/PresetStore";
import { useWindTurbineGeneratorStore } from "~/stores/WindTurbineGeneratorStore";
  
  export default {
    name: "CreatePresetModal",
    data() {
      return {
        preset: {
          name: "",
          location: null,
          wtg: null,
          assets: null,
          asset1: null,
          asset2: null,
        },
        assets: [],
        wtgs: [],
        locations: [],
      };
    },
    async mounted() {
        this.assets = await useAssetStore().getAll();
        this.wtgs = await useWindTurbineGeneratorStore().getAll();
        this.locations = await useLocationStore().getAll();
    },
    methods: {
      handleCancelClick() {
        this.$emit("hideModal");
      },
      async handleSaveClick() {
        const store = usePresetStore();
        console.log(`Preset: ${this.preset.name}, ${this.preset.location}, ${this.assets}, ${this.preset.wtg}`);
        await store.post(this.preset);
        this.$emit("hideModal");
      },
    },
  };
  </script>
  