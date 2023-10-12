<template>
  <div class="deck-frame-white">
    <canvas v-bind:id="'perWTGChart'" class="chart-canvas"></canvas>
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

        for (let i = 0; i < assets.length; i++) {
          const asset = assets[i];
          const team = assets[i].team;
          const location = currentPreset.location;

          const annualWorkability = yearlyWorkabilityPerAsset(chartStore.wdtData[asset.name]);

          chartStore.perWTGData[asset.name] = [];
          chartStore.perWTGData[asset.name].push(wdtCostsPerWtg(asset, team, location, annualWorkability));
        }

        const datasets = []
        for (const x in chartStore.perWTGData) {
          datasets.push({
            label: x,
            data: chartStore.perWTGData[x],
            borderRadius: 10,
          })
        }

        const WTGChart = new Chart(
          document.getElementById("perWTGChart"),
          {
            type: "bar",
            data: {
              labels: chartStore.finChartLabels.at[0],
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
        );
      });
    }
  },
};
</script>
