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
import { useWindTurbineGeneratorStore } from "~/stores/WindTurbineGeneratorStore";

export default {
  name: "WtgDropdown",
  data() {
    return {
      wtg: "",
      options: [],
    };
  },
  async mounted() {
    const wtgs = await useWindTurbineGeneratorStore().getAll();

    wtgs.forEach((entry) => {
      this.options.push(entry.name)
    })
  },
  methods: {
    async handleWtgChange() {
      const wtg = await useWindTurbineGeneratorStore().getByName(this.wtg);
      console.log(wtg);
      useWindTurbineGeneratorStore().setSelectedWtg(wtg);
      console.log(useWindTurbineGeneratorStore().getSelectedWtg());
    },
  },
};
</script>
  