<template>
  <div class="flex">
    <div class="sidebar-container p-5 h-screen">
      <Sidebar />
    </div>
    <div class="h-full deck-frame-translucent-w-sidebar inline-block">
      <div class="heading-container">
        <h1 class="generic-header">Availability</h1>
      </div>

      <ModalDialogsInformationalCaseDetailsModal v-show="isModalVisible" @hideModal="hideModal" />

      <div class="flex flex-col">
        <div v-for="id in ids" :key="id">
          <FiltersAvailGraphFilter :key="chartKey" @remove="handleRemove" :chartId="id" :amountOfCharts="ids.length" />
        </div>
      </div>
      <div class="w-full p-3">
        <button v-if="ids.length !== 3" type="button"
          class="w-full border-2 border-gray-400 rounded-full py-1 font-semibold text-xl text-gray-600" @click="addGraph">
          Add more graphs
        </button>
      </div>
    </div>
    <CaseDetailsButton @click="showModal" class="cursor-pointer" />
  </div>
</template>

<script>
import { useLocationStore } from '~/stores/LocationStore';
import { useFilterStore } from '~/stores/FilterStore';
import { useWeatherdataStore } from '~/stores/WeatherdataStore';
import { usePresetStore } from '~/stores/PresetStore';

export default {
  layout: "default",
  name: "Availability",
  data() {
    return {
      ids: [],
      chartKey: false,
      loading: true,
      isModalVisible: false,
    };
  },
  async mounted() {
    this.ids.push(1);
    await this.startChart();
    this.toggleChartKey();
    this.loading = false;
    const currentPreset = usePresetStore().getSelectedPreset();
    this.caseName = currentPreset.name;
  },
  fetch() {
    return this.startChart();
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    hideModal() {
      this.isModalVisible = false;
    },
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
      console.log(currentPreset);
      const currentLocation = currentPreset.location;

      useFilterStore().hideRecommendation = false;
      useLocationStore().toggleLoading();
      this.$emit("loading");

      await useWeatherdataStore().getByLocationId(currentLocation._id);

      useLocationStore().toggleLoading();
      this.$emit("loading");
      this.loading = false;
    },
  },
};
</script>
