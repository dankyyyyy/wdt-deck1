<template>
    <div class="deck-frame-white h-full justify-center content-center">
      <select id="asset" v-model="asset2" @change="handleAsset2Change">
        <option value="" disabled selected>Asset 2</option>
        <option v-for="(option, index) in options" :key="index" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
  </template>
  
  <script>
  import { useAssetStore } from "~/stores/AssetStore";
  
  export default {
    name: "Asset2Dropdown",
    data() {
      return {
        asset2: "",
        options: [],
      };
    },
    async mounted(){
      var assets = await useAssetStore().getAll();
      const filteredAssets = assets.filter(asset2 => asset2.category !== "WindTurbineGenerator");
      assets = filteredAssets;
      
      assets.forEach((entry) => {
        this.options.push(entry.name)
      })
    },
    methods: {
      async handleAsset2Change() {
        const asset = await useAssetStore().getByName(this.asset2);
        useAssetStore().setSelectedAsset2(asset);
      },
    },
  };
  </script>
  