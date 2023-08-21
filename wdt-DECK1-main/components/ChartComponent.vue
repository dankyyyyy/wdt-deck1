<script>
import Chart from "chart.js/auto";
import { start } from "@/utils/wdtCalc";
import { useWeatherStore } from "@/stores/WeatherStore";
import { useAssetStore } from "@/stores/AssetStore";

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

    onMounted(() => {
      if (assetStore.assets.length === 0) assetStore.getAll();
      const assets = assetStore.assets;
      //Call the calculations for each asset
      for (let i = 0; i < assets.length; i++){
        start(
          props.filterParams.startHour,
          props.filterParams.endHour,
          props.filterParams.startMonth,
          props.filterParams.endMonth,
          props.filterParams.years,
          assets[i]
        );
      }
      
      function generateRandomColor() {
        // Generate random values for red, green, and blue channels
        var red = Math.floor(Math.random() * 256);
        var green = Math.floor(Math.random() * 256);
        var blue = Math.floor(Math.random() * 256);

        // Construct the RGB color string
        var color = "rgb(" + red + ", " + green + ", " + blue + ")";

        return color;
      }
      //Call the calculations for the site
      start(
        props.filterParams.startHour,
        props.filterParams.endHour,
        props.filterParams.startMonth,
        props.filterParams.endMonth,
        props.filterParams.years,
        "",
      );
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
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        }
      );
    });
  },
};
</script>

<template>
  <div class="deck-frame-white">
      <canvas v-bind:id="'wdtChart' + filterParams.chartId"></canvas>
    </div>
</template>