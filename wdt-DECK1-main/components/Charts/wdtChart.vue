<template>
  <div class="deck-frame-white">
    <canvas v-bind:id="'wdtChart' + filterParams.chartId" class="chart-canvas"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import { Colors } from 'chart.js';
import { start } from "@/utils/chartCalc/wdtCalc";
import { useChartStore } from "~/stores/ChartStore";
import { usePresetStore } from "~/stores/PresetStore";

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
        const monthlyWorkability = [];

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
          monthlyWorkability[asset.name] = monthlyWorkabilityPerAsset(chartStore.wdtData[asset.name]);
        }

        // Chart Construction
        const datasets = []
        for (const x in monthlyWorkability) {
          datasets.push({
            label: x,
            data: monthlyWorkability[x].slice(
              props.filterParams.startMonth - 1,
              props.filterParams.endMonth
            ),
            borderRadius: 10,
          })
        }
        //Create chart object
        const myChart = new Chart(
          document.getElementById("wdtChart" + props.filterParams.chartId),
          {
            type: "bar",
            data: {
              labels: chartStore.wdtLabels.slice(
                props.filterParams.startMonth - 1,
                props.filterParams.endMonth
              ),
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
                      const assetName = context.dataset.label;
                      const value = context.raw;
                      return `${assetName}: ${value}%`;
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
