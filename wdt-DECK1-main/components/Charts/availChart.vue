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
import { useWeatherStore } from "@/stores/WeatherStore";
import { useAvailStore } from "~/stores/AvailStore";
import { usePresetStore } from "~/stores/PresetStore";
import { formatNumberWithDecimal } from "~/utils/chartUtils";
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
    const availStore = useAvailStore();
    const weatherStore = useWeatherStore();

    if (usePresetStore().getSelectedPreset() != null) {
      onMounted(() => {
        const currentPreset = usePresetStore().getSelectedPreset();
        const assets = [currentPreset.asset1, currentPreset.asset2];

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
          availStore.assetsAvailability = weatherStore.assetsWdt;
          availStore.assetsAvailability[asset.name] = yearlyWorkabilityPerAsset(availStore.assetsAvailability[asset.name]);
        }

        availStore.datasets['Required Hours'] = [];
        availStore.datasets['Available Hours'] = [];
        availStore.datasets['Difference in Hours'] = [];

        for (let i = 0; i < assets.length; i++) {
          const asset = assets[i];
          const team = asset.team;
          const location = usePresetStore().getSelectedPreset().location;
          const wtg = usePresetStore().getSelectedPreset().wtg;
          const annualWorkability = availStore.assetsAvailability[asset.name];

          availStore.datasets['Required Hours'].push(annualTotalRequiredHours(wtg, location));
          availStore.datasets['Available Hours'].push(annualDeployableHours(team, annualWorkability));
          availStore.datasets['Difference in Hours'].push(annualTotalHoursDifference(team, annualWorkability, location, wtg));
          console.log(availStore.datasets['requiredHours']);
          console.log(availStore.datasets['availableHours']);
          console.log(availStore.datasets['hoursDifference']);
        }

        // Chart Construction
        const datasets = []
        for (const x in availStore.datasets) {
          datasets.push({
            label: x,
            data: availStore.datasets[x],
            borderRadius: 10,
          })
        }
        const myChart = new Chart(
          document.getElementById("availChart" + props.filterParams.chartId),
          {
            type: "bar",
            data: {
              labels: availStore.labels,
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
