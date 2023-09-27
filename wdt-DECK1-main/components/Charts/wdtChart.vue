<script>
import Chart from "chart.js/auto";
import { start } from "@/utils/chartCalc/wdtCalc";
import { useWeatherStore } from "@/stores/WeatherStore";
import { useAssetStore } from "@/stores/AssetStore";
import { generateRandomColor } from "~/utils/chartUtils";
import { useLocationStore } from "~/stores/LocationStore";

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
    const weatherStore = useWeatherStore();
    const assetStore = useAssetStore();

    if (useLocationStore().getSelectedLocation() != null) {
      onMounted(() => {
        if (assetStore.assets.length === 0) assetStore.getAll();
        var assets = assetStore.assets;
        const filteredAssets = assets.filter(asset => asset.category !== "WindTurbineGenerator");
        assets = filteredAssets;

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
          weatherStore.assetsWdt[asset.name] = monthlyWorkabilityPerAsset(weatherStore.assetsWdt[asset.name]);
        }       

        // Chart Construction
        const datasets = []
        for (const x in weatherStore.assetsWdt) {
          datasets.push({
            label: x,
            data: weatherStore.assetsWdt[x].slice(
              props.filterParams.startMonth - 1,
              props.filterParams.endMonth
            ),
            backgroundColor: generateRandomColor(),
            borderColor: "#333333",
            borderRadius: 10,
          })
        }
        //Create chart object
        const myChart = new Chart(
          document.getElementById("wdtChart" + props.filterParams.chartId),
          {
            type: "bar",
            data: {
              labels: weatherStore.labels.slice(
                props.filterParams.startMonth - 1,
                props.filterParams.endMonth
              ),
              datasets,
            },
            options: {
              plugins: {
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

<template>
  <div class="deck-frame-white">
    <canvas v-bind:id="'wdtChart' + filterParams.chartId"></canvas>
  </div>
</template>
