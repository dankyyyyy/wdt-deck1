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
import { useFilterStore } from "~/stores/FilterStore";
import { useWeatherdataStore } from "~/stores/WeatherdataStore";
import { useLocationStore } from "~/stores/LocationStore";

export default {
  name: "LocationDropdown",
  data() {
    return {
      location: "",
      options: [],
    };
  },
  async mounted(){
    const locations = await useLocationStore().getAll()
    locations.forEach((entry) => {
      this.options.push(entry.name)
    })
  },
  setup() {
    const filterStore = useFilterStore();
    const weatherStore = useWeatherdataStore();

    return {
      filterStore,
      weatherStore,
    };
  },
  methods: {
    async handleLocationChange() {
      this.filterStore.hideRecommendation = false;
      useLocationStore().toggleLoading();
      this.$emit("loading")
      let locationId = await useLocationStore().getByName(this.location)
      locationId = locationId.map(location => location._id)
      await useWeatherdataStore().getByLocationId(locationId)
      useLocationStore().toggleLoading();
      this.$emit("loading")
    },
  },
};
</script>

<style></style>
