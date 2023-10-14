<template>
    <ag-grid-vue class="ag-theme-alpine fin-table" :columnDefs="columnDefs" :rowData="rowData" />
</template>

<script>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {start} from "~/utils/chartCalc/wdtCalc";
import { AgGridVue } from "ag-grid-vue3";
import { useChartStore } from "~/stores/ChartStore";
import { usePresetStore } from "~/stores/PresetStore";
import { formatNumberWithDecimal } from "~/utils/chartUtils";

export default {
    name: "FinancialTable",
    components: {
        AgGridVue,
    },
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
        getRowData(props) {
            const chartStore = useChartStore();
            const presetStore = usePresetStore();
            const tempRowData = [];

            if (presetStore.getSelectedPreset() != null) {
                const currentPreset = presetStore.getSelectedPreset();
                const assets = currentPreset.assets;

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
                    const team = assets[i].team;
                    const annualWorkability = yearlyWorkabilityPerAsset(chartStore.wdtData[asset.name]);

                    const row = {
                        AssetName: asset.name,
                        AssetType: asset.category,
                        TotalCost: `${formatNumberWithDecimal(totalAnnualCost(asset, team, annualWorkability))}€`,
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