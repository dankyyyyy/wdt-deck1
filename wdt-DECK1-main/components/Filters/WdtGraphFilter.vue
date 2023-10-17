<template>
  <div v-if="showComponents" class="w-full flex relative">
    <div class="w-4/5 p-3">
      <div class="flex text-lg justify-between w-full py-5">
        <div
          class="flex gap-1.5 items-center hover:text-gray-400 group hover:translate-y-[-3px] transition-all ease-in-out cursor-pointer">
          <IconsHide class="stroke-1 group-hover:text-yellow-400" />
          <p class="text-decoration font-semibold" @click="hideToggle">Hide</p>
        </div>
      </div>
      <div v-if="loading">
        <section class="flex items-center justify-center h-full w-full">
          <div class="h-20 w-20 mr-10 rounded-full bg-blue-300 animate-pulse"></div>
          <div class="h-20 w-20 mr-10 rounded-full bg-blue-300 animate-pulse"></div>
          <div class="h-20 w-20 mr-10 rounded-full bg-blue-300 animate-pulse"></div>
          <div class="h-20 w-20 mr-10 rounded-full bg-blue-300 animate-pulse"></div>
          <div class="h-20 w-20 rounded-full bg-blue-300 animate-pulse"></div>
        </section>
      </div>
      <div v-else>
        <div class="p-3">
          <ChartsWdtChart :key="wdtChartKey" :filterParams="filterParams" />
        </div>
        <div class="table-container">
          <TablesDashboardYearlyCommitmentTable :key="tableKey" :filterParams="filterParams" />
          <TablesDashboardAssetAvailabilityTable :key="tableKey" :filterParams="filterParams" />
          <TablesDashboardWdtTable :key="tableKey" :filterParams="filterParams" />
          <TablesDashboardPricePerWtgTable :key="tableKey" :filterParams="filterParams" />
          <TablesDashboardPricePerReqWrkHrTable :key="tableKey" :filterParams="filterParams" />
        </div>
      </div>
    </div>
    <div class="w-1/5 h-full p-3">
      <div class="flex flex-row-reverse text-lg w-full py-5">
        <div v-if="this.amountOfCharts > 1"
          class="flex gap-1.5 flex-row-reverse items-center hover:text-gray-400 group hover:translate-y-[-3px] transition-all ease-in-out cursor-pointer">
          <IconsRemove class="stroke-1 group-hover:text-red-400" />
          <p class="text-decoration font-semibold" @click="emitRemove">
            Remove
          </p>
        </div>
        <div v-else class="h-[28px]"></div>
      </div>
      <Filters @buttonClick="handleApplyChanges" :filterProps="filterParams" />
    </div>
  </div>
  <div v-else class="py-10">
    <div
      class="flex gap-1.5 p-3 items-center hover:text-gray-400 group hover:translate-y-[-3px] transition-all ease-in-out cursor-pointer">
      <IconsHide class="stroke-1 group-hover:text-yellow-400" />
      <p class="text-decoration" @click="hideToggle">Show graph...</p>
    </div>
  </div>
</template>

<script>
import { useLocationStore } from "~/stores/LocationStore";

export default {
  layout: "default",
  name: "WeatherDownTime",
  props: {
    chartId: Number,
    amountOfCharts: Number,
  },
  data(props) {
    return {
      wdtChartKey: false,
      tableKey: false,
      showComponents: true,
      filterParams: {
        startHour: ref(0),
        endHour: ref(23),
        startMonth: ref(1),
        endMonth: ref(12),
        years: ref(10),
        chartId: props.chartId,
      },
      loading: useLocationStore().loading,
    };
  },
  methods: {
    handleApplyChanges(data) {
      this.filterParams.startHour = data.startHour;
      this.filterParams.endHour = data.endHour;
      this.filterParams.startMonth = data.startMonth;
      this.filterParams.endMonth = data.endMonth;
      this.filterParams.years = data.years;
      this.wdtChartKey = !this.wdtChartKey;
      this.tableKey = !this.tableKey;
    },
    emitRemove() {
      this.$emit("remove", this.chartId);
    },
    hideToggle() {
      this.showComponents = !this.showComponents;
    },
  },
};
</script>
