<template>
    <ag-grid-vue class="ag-theme-alpine fin-table direct-cost" :columnDefs="columnDefs" :rowData="rowData" />
</template>

<script>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";
import { useChartStore } from "~/stores/ChartStore";
import { usePresetStore } from "~/stores/PresetStore";
import "~/utils/chartUtils";

export default {
    name: "YearlyDirectCostTable",
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
            tableKey: Boolean,
        },
    },
    setup(props) {
        const getRowData = () => {
            const chartStore = useChartStore();
            const presetStore = usePresetStore();
            const tempRowData = [];

            if (presetStore.getSelectedPreset() != null) {
                const currentPreset = presetStore.getSelectedPreset();
                const assets = currentPreset.assets;
                const location = currentPreset.location;

                for (let i = 0; i < assets.length; i++) {
                    const asset = assets[i];
                    const team = assets[i].team;
                    const annualWorkability = yearlyWorkabilityPerAsset(chartStore.wdtData[asset.name], props.filterParams.startMonth, props.filterParams.endMonth);

                    const row = {
                        AssetName: asset.name,
                        TotalCost: `${formatNumberWithDecimal(totalPerWtg(asset, team, location, annualWorkability, props.filterParams.startMonth, props.filterParams.endMonth))}€`,
                        Fuel: `${formatNumberWithDecimal(fuelPerWtg(asset, location, annualWorkability, props.filterParams.startMonth, props.filterParams.endMonth))}€`,
                        CO2Tax: `${formatNumberWithDecimal(CO2PerWtg(asset, location, annualWorkability, props.filterParams.startMonth, props.filterParams.endMonth))}€`,
                        DowntimeCost: `${formatNumberWithDecimal(wdtPerWtg(asset, team, location, annualWorkability, props.filterParams.startMonth, props.filterParams.endMonth))}€`,
                    }
                    tempRowData.push(row);
                }
                return tempRowData;
            }
        }

        const columnDefs = useChartStore().EfficiencyTableLabels.map(label => ({
            headerName: label,
            field: label.replace(/ /g, ''),
            width: 165,
        }));

        const rowData = getRowData();

        return {
            columnDefs,
            rowData,
        };
    },
};
</script>