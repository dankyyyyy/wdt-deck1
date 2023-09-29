<script>
import Chart from "chart.js/auto";
import { Colors } from 'chart.js';
import { start } from "@/utils/chartCalc/wdtCalc";
import { useWeatherStore } from "@/stores/WeatherStore";
import { useFinStore } from "~/stores/FinStore";
import { useLocationStore } from "~/stores/LocationStore";
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
    const weatherStore = useWeatherStore();
    const finStore = useFinStore();
    const presetStore = usePresetStore();

    if (useLocationStore().getSelectedLocation() != null) {
      onMounted(() => {
        // const assets = [useAssetStore().getSelectedAsset1(), useAssetStore().getSelectedAsset2()];

        /*if (assetStore.assets.length === 0) assetStore.getAll();
        var assets = assetStore.assets;*/

        // const currentPreset = presetStore.getSelectedPreset();

        const presets = presetStore.getAll();
        var currentPreset;
        if (presets.length === 1) {
          currentPreset = presets[0];
        }

        const assets = [currentPreset.asset1, currentPreset.asset2];
        console.log(presets);
        console.log(assets);
        console.log(currentPreset.location);
        console.log(currentPreset.team1);
        console.log(currentPreset.team2);

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
          finStore.assetsFin = weatherStore.assetsWdt;
          finStore.assetsFin[asset.name] = yearlyWorkabilityPerAsset(finStore.assetsFin[asset.name]);
        }

        for (let i = 0; i < assets.length; i++) {
          const asset = assets[i];
          const annualWorkability = finStore.assetsFin[asset.name];
          finStore.assetsFin[asset.name] = [];

          var team;
          if (i === 0) {
            team = currentPreset.team1
          } else {
            currentPreset.team2;
          }

          if (asset.category === 'Vessel') {
            finStore.assetsFin[asset.name].push(totalAnnualCostVessel(asset, annualWorkability));
            finStore.assetsFin[asset.name].push(annualCostPerAssetWithoutFuel(asset));
            finStore.assetsFin[asset.name].push(totalAnnualFuelCostVessel(asset, annualWorkability));
            finStore.assetsFin[asset.name].push(downtimeSalaryCost(team, annualWorkability));
            finStore.assetsFin[asset.name].push(vesselCarbonTaxCost(asset, annualWorkability));
          } else if (asset.category === 'Helicopter') {
            finStore.assetsFin[asset.name].push(totalAnnualCostHelicopter(asset, annualWorkability));
            finStore.assetsFin[asset.name].push(annualCostPerAssetWithoutFuel(asset));
            finStore.assetsFin[asset.name].push(totalAnnualFuelCostHelicopter(asset, annualWorkability));
            finStore.assetsFin[asset.name].push(downtimeSalaryCost(team, annualWorkability));
            finStore.assetsFin[asset.name].push(helicopterCarbonTaxCost(asset, annualWorkability));
          }
        }

        // Chart Construction
        const datasets = []
        for (const x in finStore.assetsFin) {
          datasets.push({
            label: x,
            data: finStore.assetsFin[x],
            borderRadius: 10,
          })
        }
        //Create chart object
        let delayed;
        const myChart = new Chart(
          document.getElementById("finChart" + props.filterParams.chartId),
          {
            type: "bar",
            data: {
              labels: finStore.labels,
              datasets,
            },
            options: {
              animation: {
                onComplete: () => {
                  delayed = true;
                },
                delay: (context) => {
                  let delay = 0;
                  if (context.type === 'data' && context.mode === 'default' && !delayed) {
                    delay = context.dataIndex * 300 + context.datasetIndex * 100;
                  }
                  return delay;
                },
              },
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

<template>
  <div class="deck-frame-white">
    <canvas v-bind:id="'finChart' + filterParams.chartId"></canvas>
  </div>
</template>
