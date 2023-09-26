<template>
  <div class="deck-frame-white h-full justify-center content-center">
    <select id="location" v-model="location" @change="handleLocationChange">
      <option value="" disabled selected>Location</option>
      <option v-for="(option, index) in options" :key="index" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
import { useLocationStore } from "~/stores/LocationStore";

export default {
  name: "LocationDropdown",
  data() {
    return {
      location: "",
      options: [],
    };
  },
  async mounted() {
    const locations = await useLocationStore().getAll()
    locations.forEach((entry) => {
      this.options.push(entry.name)
    })
  },
  methods: {
    async handleLocationChange() {
      useLocationStore().setSelectedLocation(this.location);
    },
  },
};
</script>
