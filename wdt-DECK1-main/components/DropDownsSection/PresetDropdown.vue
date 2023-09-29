<template>
    <div class="deck-frame-white h-full justify-center content-center">
      <select id="preset" v-model="preset" @change="handlePresetChange">
        <option value="" disabled selected>Preset</option>
        <option v-for="(option, index) in options" :key="index" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
  </template>
  
  <script>
  import { usePresetStore } from "~/stores/PresetStore";
  
  export default {
    name: "PresetDropdown",
    data() {
      return {
        preset: "",
        options: [],
      };
    },
    async mounted() {
      const presets = await usePresetStore().getAll();
      
      presets.forEach((entry) => {
        this.options.push(entry.name)
      })
    },
    methods: {
      async handlePresetChange() {
        const preset = await usePresetStore().getByName(this.preset);
        usePresetStore().setSelectedPreset(preset);
      },
    },
  };
  </script>
  