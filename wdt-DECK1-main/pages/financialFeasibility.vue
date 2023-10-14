<template>
  <div class="flex">
    <div class="sidebar-container p-5 h-screen">
      <Sidebar />
    </div>
    <div class="deck-frame-grey-container">
      <div class="w-full h-full deck-frame-grey inline-block">
        <div class="w-4/5 h-20 p-3">
          <RecommendationPopUp />
        </div>
        <div v-for="id in ids" :key="id">
          <FiltersFinGraphFilter/>
        </div>
        <div class="table-container">
          <ChartsFinTable />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { usePresetStore } from '~/stores/PresetStore';
import { useLocationStore } from '~/stores/LocationStore';
import { useWeatherdataStore } from '~/stores/WeatherdataStore';
import { useFilterStore } from '~/stores/FilterStore';

export default {
  layout: "default",
  name: "FinancialFeasibility",
  data() {
    return {
      ids: [],
    };
  },
  async mounted() {},
  methods: {
    async startChart() {
      const currentPreset = usePresetStore().getSelectedPreset();
      const currentLocation = currentPreset.location;
      useFilterStore().hideRecommendation = false;
      useLocationStore().toggleLoading();
      this.$emit("loading");
      await useWeatherdataStore().getByLocationId(currentLocation._id);
      useLocationStore().toggleLoading();
      this.$emit("loading");
    },
  },
};
</script>
