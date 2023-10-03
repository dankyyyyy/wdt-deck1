<script>
import Chart from "chart.js/auto";
import { Colors } from 'chart.js';
import { start } from "@/utils/chartCalc/wdtCalc";
import { useWeatherStore } from "@/stores/WeatherStore";
import { useFinStore } from "~/stores/FinStore";
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

    if (presetStore.getSelectedPreset() != null) {
      onMounted(() => {
        const currentPreset = presetStore.getSelectedPreset();

        const assets = [currentPreset.asset1, currentPreset.asset2];
        console.log(assets);
        console.log(currentPreset.location);
        console.log(currentPreset.asset1.team);
        console.log(currentPreset.asset2.team);

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
          const team = assets[i].team;
          const annualWorkability = finStore.assetsFin[asset.name];
          finStore.assetsFin[asset.name] = [];

          finStore.assetsFin[asset.name].push(totalAnnualCost(asset, team, annualWorkability));
          finStore.assetsFin[asset.name].push(annualCharterCostsWdt(asset, annualWorkability));
          finStore.assetsFin[asset.name].push(annualFuelCost(asset, annualWorkability));
          finStore.assetsFin[asset.name].push(downtimeSalaryCost(team, annualWorkability));
          finStore.assetsFin[asset.name].push(annualCarbonTax(asset, annualWorkability));

          /*if (asset.category === 'Vessel') {
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
          }*/
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
        const myChart = new Chart(
          document.getElementById("finChart" + props.filterParams.chartId),
          {
            type: "bar",
            data: {
              labels: finStore.labels,
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
