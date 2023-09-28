<script>
import Chart from "chart.js/auto";
import { start } from "@/utils/chartCalc/wdtCalc";
import { useWeatherStore } from "@/stores/WeatherStore";
import { useAssetStore } from "@/stores/AssetStore";
import { useFinStore } from "~/stores/FinStore";
import { generateRandomColor } from "~/utils/chartUtils";
import { useLocationStore } from "~/stores/LocationStore";
import "~/utils/calculationUtils";
import { downtimeSalaryCost, helicopterCarbonTaxCost, vesselCarbonTaxCost } from "~/utils/calculationUtils";
import { useTeamStore } from "~/stores/TeamStore";

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
    const finStore = useFinStore();
    const teamStore = useTeamStore();

    if (useLocationStore().getSelectedLocation() != null) {
      onMounted(async () => {
        const assets = [useAssetStore().getSelectedAsset1(), useAssetStore().getSelectedAsset2()];
        console.log(useAssetStore().getSelectedAsset1())
        console.log(assets);

        /*if (assetStore.assets.length === 0) assetStore.getAll();
        var assets = assetStore.assets;
        const filteredAssets = assets.filter(asset => asset.category !== "WindTurbineGenerator");
        assets = filteredAssets;*/

        if (teamStore.teams.length === 0) teamStore.getAll();
        const teams = await useTeamStore().getAll();
        console.log(teams);

        // const teams = [useTeamStore().getSelectedTeam()];
        // console.log(useTeamStore.getSelectedTeam());
        // console.log(teams);

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
          console.log(team);

          if (asset.category === 'Helicopter') {
            const filteredTeams = teams.filter(team => team.name.includes('Helicopter'));
            if (filteredTeams.length === 1) {
              team = filteredTeams[0];
              console.log(team);
            }
            else if (asset.category === 'Vessel') {
              if (asset.name.includes('CTV')) {
                const filteredTeams = teams.filter(team => team.name.includes('CTV'));
                if (filteredTeams.length === 1) {
                  team = filteredTeams[0];
                  console.log(team);
                }
              } else if (asset.name.includes('SOV')) {
                const filteredTeams = teams.filter(team => team.name.includes('SOV'));
                if (filteredTeams.length === 1) {
                  team = filteredTeams[0];
                  console.log(team);
                }
              }
            }
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
          console.log(finStore.assetsFin[asset.name]);
        }

        // Chart Construction
        const datasets = []
        for (const x in finStore.assetsFin) {
          datasets.push({
            label: x,
            data: finStore.assetsFin[x],
            backgroundColor: generateRandomColor(),
            borderColor: "#333333",
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
