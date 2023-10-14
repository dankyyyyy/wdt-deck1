<template>
        <ag-grid-vue class="ag-theme-alpine fin-table" :columnDefs="columnDefs" :rowData="rowData" />
</template>

<script>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";
import { useChartStore } from "~/stores/ChartStore";
import { usePresetStore } from "~/stores/PresetStore";
import { formatNumberWithDecimal } from "~/utils/chartUtils";

export default {
    name: "FinancialTable",
    components: {
        AgGridVue,
    },
    data() {
        return {
            columnDefs: useChartStore().finTableLabels.map(label => ({
                headerName: label,
                field: label.replace(/ /g, ''),
                width: 165,
            })),
            rowData: this.getRowData(),
        };
    },
    methods: {
        getRowData() {
            const chartStore = useChartStore();
            const presetStore = usePresetStore();
            const tempRowData = [];

            if (presetStore.getSelectedPreset() != null) {
                const currentPreset = presetStore.getSelectedPreset();
                const assets = currentPreset.assets;
                // const assets = [currentPreset.asset1, currentPreset.asset2];

                for (let i = 0; i < assets.length; i++) {
                    const asset = assets[i];
                    const team = assets[i].team;
                    const annualWorkability = yearlyWorkabilityPerAsset(chartStore.wdtData[asset.name]);

                    const row = {
                        AssetName: asset.name,
                        AssetType: asset.category,
                        YearlyCommitment: `${formatNumberWithDecimal(directAnnualCost(asset))}€`,
                        CostofLease: `${formatNumberWithDecimal(annualCharterCostsWdt(asset, annualWorkability))}€`,
                        CostofFuel: `${formatNumberWithDecimal(annualFuelCost(asset, annualWorkability))}€`,
                        CostofSalary: `${formatNumberWithDecimal(downtimeSalaryCost(team, annualWorkability))}€`,
                        CO2Tax: `${formatNumberWithDecimal(annualCarbonTax(asset, annualWorkability))}€`,
                    }
                    tempRowData.push(row);
                }
                return tempRowData;
            }
        }
    },
};
</script>