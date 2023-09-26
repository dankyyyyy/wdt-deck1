<template>
    <div class="deck-frame-white h-full justify-center content-center">
      <select id="wtg" v-model="wtg" @change="handleWtgChange">
        <option value="" disabled selected>Wind Turbine Generator</option>
        <option v-for="(option, index) in options" :key="index" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
  </template>
  
  <script>
  import { useAssetStore } from "~/stores/AssetStore";
  
  export default {
    name: "WtgDropdown",
    data() {
      return {
        wtg: "",
        options: [],
      };
    },
    async mounted() {
      var wtgs = await useAssetStore().getAll();
      const filteredWtgs = wtgs.filter(wtg => wtg.category == "WindTurbineGenerator");
      wtgs = filteredWtgs;
      
      wtgs.forEach((entry) => {
        this.options.push(entry.name)
      })
    },
    methods: {
      async handleWtgChange() {
        useAssetStore().setSelectedWtg(this.wtg);
      },
    },
  };
  </script>
  