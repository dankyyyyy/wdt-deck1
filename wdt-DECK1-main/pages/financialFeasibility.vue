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
        <!-- <div v-for="id in ids" :key="id">
            <FiltersFinGraphFilter :key="chartKey" @remove="handleRemove" :chartId="id" :amountOfCharts="ids.length" />
          </div> -->
        <div class="table-container">
          <TablesYearlyCommitmentRiskTable />
        </div>
        <div class="table-container">
          <TablesYearlyDirectCostTable />
        </div>
        <div class="w-full p-3">
          <button v-if="ids.length !== 3" type="button"
            class="w-full border-2 border-gray-400 rounded-full py-1 font-semibold text-xl text-gray-600"
            @click="addGraph">
            Add more graphs
          </button>
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
      chartKey: false,
    };
  },
  async mounted() {
    this.ids.push(1);
    this.ids.push(2);
    await this.startChart();
    this.toggleChartKey();
  },
  methods: {
    addGraph() {
      this.ids.push(this.ids[this.ids.length - 1] + 1);
    },
    handleRemove(id) {
      if (this.ids.length !== 1) {
        this.ids = this.ids.filter((el) => el !== id);
      }
    },
    toggleChartKey() {
      this.chartKey = !this.chartKey;
    },
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
