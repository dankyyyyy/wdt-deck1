<template>
  <div class="flex">
    <div class="sidebar-container p-5 h-screen">
      <Sidebar />
    </div>
    <div class="h-full deck-frame-translucent-w-sidebar inline-block">
      <div class="heading-container">
        <h1 class="generic-header">Financial Feasibility</h1>
      </div>

      <ModalDialogsInformationalCaseDetailsModal v-show="isModalVisible" @hideModal="hideModal" />

      <FiltersFinGraphFilter :tableKey="tableKey" />
    </div>
    <CaseDetailsButton @click="showModal" class="cursor-pointer" />
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
      loading: true,
    };
  },
  async mounted() {
    this.startTables();
    this.toggleTableKey();
  },
  methods: {
    async startTables() {
      const currentPreset = usePresetStore().getSelectedPreset();
      const currentLocation = currentPreset.location;
      useFilterStore().hideRecommendation = false;
      useLocationStore().toggleLoading();
      this.$emit("loading");
      await useWeatherdataStore().getByLocationId(currentLocation._id);
      useLocationStore().toggleLoading();
      this.$emit("loading");
      this.loading = false;
    },
    toggleTableKey() {
      this.tableKey = !this.tableKey;
    },
  },
};
</script>
