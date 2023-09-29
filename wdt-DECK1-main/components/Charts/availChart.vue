<script>
import Chart from "chart.js/auto";
import { Colors } from 'chart.js';
import { start } from "@/utils/chartCalc/wdtCalc";
import { useWeatherStore } from "@/stores/WeatherStore";
import { useAssetStore } from "@/stores/AssetStore";
import { useAvailStore } from "~/stores/AvailStore";
import { useWindTurbineGeneratorStore } from "~/stores/WindTurbineGeneratorStore";

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
    const assetStore = useAssetStore();
    const wtgStore = useWindTurbineGeneratorStore();

    if (useLocationStore().getSelectedLocation() != null) {
      onMounted(() => {
        // const assets = [useAssetStore().getSelectedAsset1(), useAssetStore().getSelectedAsset2()];
        const wtg = useWindTurbineGeneratorStore().getSelectedWtg();

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
          availStore.assetsAvailability = weatherStore.assetsWdt;
          
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
            borderRadius: 10,
          })
        }
        //Create chart object
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
    <canvas v-bind:id="'availChart' + filterParams.chartId"></canvas>
  </div>
</template>
