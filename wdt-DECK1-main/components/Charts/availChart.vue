<template>
  <div class="deck-frame-white">
    <canvas v-bind:id="'availChart' + filterParams.chartId" class="chart-canvas"></canvas>
  </div>
</template>

<style scoped>
.chart-canvas {
  width: 100em
}
</style>

<script>
import Chart from "chart.js/auto";
import { Colors } from 'chart.js';
import { start } from "@/utils/chartCalc/wdtCalc";
import { usePresetStore } from "~/stores/PresetStore";
import { useChartStore } from "~/stores/ChartStore";
import "~/utils/chartUtils";
import "~/utils/calculationUtils";

Chart.register(Colors);

export default {
  props: {
    filterParams: {
      startHour: Number,
      endHour: Number,
      startMonth: Number,
      endMonth: Number,
      years: Number,
      chartId: Number,
    },
  },
  setup(props) {
    const chartStore = useChartStore();
    const presetStore = usePresetStore();

    if (presetStore.getSelectedPreset() != null) {
      onMounted(() => {
        const currentPreset = presetStore.getSelectedPreset();
        const assets = currentPreset.assets;

        chartStore.availData['Required Hours'] = [];
        chartStore.availData['Available Hours'] = [];
        chartStore.availData['Difference in Hours'] = [];

        for (let i = 0; i < assets.length; i++) {
          start(
            props.filterParams.startHour,
            props.filterParams.endHour,
            props.filterParams.startMonth,
            props.filterParams.endMonth,
            props.filterParams.years,
            assets[i]
          );

          const asset = assets[i];
          const team = asset.team;
          const location = currentPreset.location;
          const wtg = currentPreset.wtg;
          const annualWorkability = yearlyWorkabilityPerAsset(chartStore.wdtData[asset.name], props.filterParams.startMonth, props.filterParams.endMonth);

          chartStore.availData['Required Hours'].push(annualTotalRequiredHours(wtg, location));
          chartStore.availData['Available Hours'].push(annualDeployableHours(team, annualWorkability, props.filterParams.startMonth, props.filterParams.endMonth));
          chartStore.availData['Difference in Hours'].push(annualTotalHoursDifference(team, annualWorkability, location, wtg, props.filterParams.startMonth, props.filterParams.endMonth));
        }

        // Chart Construction
        const datasets = []
        for (const x in chartStore.availData) {
          datasets.push({
            label: x,
            data: chartStore.availData[x],
            borderRadius: 10,
          })
        }
        const myChart = new Chart(
          document.getElementById("availChart" + props.filterParams.chartId),
          {
            type: "bar",
            data: {
              labels: generateLabelsFromAssets(),
              datasets,
            },
            options: {
              maintainAspectRatio: false,
              plugins: {
                colors: {
                  enabled: true,
                },
                tooltip: {
                  enabled: true,
                  callbacks: {
                    label: (context) => {
                      const dataType = context.dataset.label;
                      const value = context.raw;
                      const formattedValue = formatNumberWithDecimal(value);
                      return `${dataType}: ${formattedValue} hours`;
                    },
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          }
        );
      });
    }
  },
};
</script>
