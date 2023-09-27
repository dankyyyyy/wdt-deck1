<template>
    <div class="deck-frame-white h-full justify-center content-center">
      <select id="asset" v-model="asset1" @change="handleAsset1Change">
        <option value="" disabled selected>Asset 1</option>
        <option v-for="(option, index) in options" :key="index" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
  </template>
  
  <script>
  import { useAssetStore } from "~/stores/AssetStore";
  
  export default {
    name: "Asset1Dropdown",
    data() {
      return {
        asset1: "",
        options: [],
      };
    },
    async mounted() {
      var assets = await useAssetStore().getAll();
      const filteredAssets = assets.filter(asset1 => asset1.category !== "WindTurbineGenerator");
      assets = filteredAssets;
      
      assets.forEach((entry) => {
        this.options.push(entry.name)
      })
    },
    methods: {
      async handleAsset1Change() {
        const asset = await useAssetStore().getByName(this.asset1);
        useAssetStore().setSelectedAsset1(asset);
      },
    },
  };
  </script>
  