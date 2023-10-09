<script>
import Chart from "chart.js/auto";
import { Colors } from 'chart.js';
import { start } from "@/utils/chartCalc/wdtCalc";
import { useWeatherStore } from "@/stores/WeatherStore";
import { useAvailStore } from "~/stores/AvailStore";
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

        for (let j = 0; j < availStore.labels.length; j++) {
          for (let i = 0; i < assets.length; i++) {
            const asset = assets[i];
            const team = asset.team;
            const location = usePresetStore().getSelectedPreset().location;
            const wtg = usePresetStore().getSelectedPreset().wtg;
            const annualWorkability = availStore.assetsAvailability[asset.name];
            availStore.assetsAvailability[asset.name] = [];

            availStore.assetsAvailability[asset.name] = (annualTotalRequiredHours(wtg, location));
            availStore.assetsAvailability[asset.name] = (annualDeployableHours(team, annualWorkability));
            availStore.assetsAvailability[asset.name] = (annualTotalHoursDifference(team, annualWorkability, location, wtg));
          }
          const asset = assets[j];
          availStore.requiredHours = [];
          availStore.availableHours = [];
          availStore.hoursDifference = [];

          availStore.requiredHours.push(availStore.assetsAvailability[asset.name][0]);
          availStore.availableHours.push(availStore.assetsAvailability[asset.name][1]);
          availStore.hoursDifference.push(availStore.assetsAvailability[asset.name][2]);
        }

        // Chart Construction
        const datasets = []
        for (const x in availStore.requiredHours) {
          datasets.push({
            label: x,
            data: availStore.requiredHours[x],
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
                      return `${dataType}: ${value} hours`;
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

<template>
  <div class="deck-frame-white">
    <canvas v-bind:id="'availChart' + filterParams.chartId"></canvas>
  </div>
</template>
