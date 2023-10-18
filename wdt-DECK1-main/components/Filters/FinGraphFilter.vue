<template>
  <div class="w-4/5 p-3">
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
      <div style="justify-items: space-between; display: flex;">
        <div class="table-container">
          <div class="fin-table-container">
            <h3 class="generic-header-medium">Yearly Commitment</h3>
            <TablesYearlyCommitmentTable :key="tableKey" :filterParams="filterParams" class="fin-table" />
          </div>
          <div class="fin-table-container">
            <h3 class="generic-header-medium">Estimated Risk</h3>
            <TablesEstimatedRiskTable :key="tableKey" :filterParams="filterParams" class="fin-table" />
          </div>
          <div class="fin-table-container">
            <h3 class="generic-header-medium">Efficiency (per WTG)</h3>
            <TablesEfficiencyTable :key="tableKey" :filterParams="filterParams" class="fin-table" />
          </div>
        </div>
        <div class="w-1/5 h-full p-3">
          <Filters @buttonClick="handleApplyChanges" :filterProps="filterParams" />
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { useLocationStore } from "~/stores/LocationStore";

export default {
  layout: "default",
  name: "FinancialFeasibility",
  data() {
    return {
      tableKey: false,
      showComponents: true,
      filterParams: {
        startHour: ref(0),
        endHour: ref(23),
        startMonth: ref(1),
        endMonth: ref(12),
        years: ref(10),
      },
      loading: useLocationStore().loading,
    };
  },
  methods: {
    handleApplyChanges(props) {
      this.filterParams.startHour = props.startHour;
      this.filterParams.endHour = props.endHour;
      this.filterParams.startMonth = props.startMonth;
      this.filterParams.endMonth = props.endMonth;
      this.filterParams.years = props.years;
      this.tableKey = !this.tableKey;
    },
  },
};
</script>
  