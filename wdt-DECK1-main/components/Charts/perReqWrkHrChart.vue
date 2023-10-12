<template>
    <div class="deck-frame-white">
      <canvas v-bind:id="'perReqWrkHrChart'" class="chart-canvas"></canvas>
    </div>
  </template>
  
  <script>
  import Chart from "chart.js/auto";
  import { Colors } from 'chart.js';
  import { start } from "@/utils/chartCalc/wdtCalc";
  import { useChartStore } from "~/stores/ChartStore";
  import { usePresetStore } from "~/stores/PresetStore";
  import "~/utils/calculationUtils";
  
  Chart.register(Colors);
  
  export default {
    setup() {
      const chartStore = useChartStore();
      const presetStore = usePresetStore();
  
      if (presetStore.getSelectedPreset() != null) {
        onMounted(() => {
          const currentPreset = presetStore.getSelectedPreset();
          const assets = currentPreset.assets;
  
          for (let i = 0; i < assets.length; i++) {
            const asset = assets[i];
            const wtg = currentPreset.wtg;
            const location = currentPreset.location;

            chartStore.perWRKHRData[asset.name] = [];
            chartStore.perWRKHRData[asset.name].push(directCostPerRequiredWorkHour(asset, wtg, location));
          }
  
          const datasets = []
          for (const x in chartStore.perWRKHRData) {
            datasets.push({
              label: x,
              data: chartStore.perWRKHRData[x],
              borderRadius: 10,
            })
          }
  
          const WRKHRChart = new Chart(
            document.getElementById("perReqWrkHrChart"),
            {
              type: "bar",
              data: {
                labels: chartStore.finChartLabels.at[1],
                datasets,
              },
              options: {
                maintainAspectRatio: false,
                plugins: {
                  tooltip: {
                    enabled: true,
                    callbacks: {
                      label: (context) => {
                        const assetName = context.dataset.label;
                        const value = context.raw;
                        const formattedValue = formatNumberWithDecimal(value);
                        return `${assetName}: ${formattedValue}€`;
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
          )
        });
      }
    },
  };
  </script>
  