<template>
    <ag-grid-vue class="ag-theme-alpine fin-table yearly-commitment" :columnDefs="columnDefs" :rowData="rowData" />
</template>

<script>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";
import { useChartStore } from "~/stores/ChartStore";
import { usePresetStore } from "~/stores/PresetStore";
import "~/utils/chartUtils";

export default {
    name: "YearlyCommitmentRiskTable",
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

                for (let i = 0; i < assets.length; i++) {
                    const asset = assets[i];
                    const team = assets[i].team;
                    const annualWorkability = yearlyWorkabilityPerAsset(chartStore.wdtData[asset.name], props.filterParams.startMonth, props.filterParams.endMonth);

                    const row = {
                        AssetName: asset.name,
                        YearlyCommitment: `${formatNumberWithDecimal(yearlyCommitment(asset, annualWorkability, props.filterParams.startMonth, props.filterParams.endMonth))}€`,
                        FuelandCO2: `${formatNumberWithDecimal(directAnnualCost(asset, annualWorkability, props.filterParams.startMonth, props.filterParams.endMonth))}€`,
                        CharterCost: `${formatNumberWithDecimal(annualDayRate(asset))}€`,
                    }
                    tempRowData.push(row);
                }
                return tempRowData;
            }
        }
        const columnDefs = useChartStore().yearlyCommitmentTableLabels.map(label => ({
            headerName: label,
            field: label.replace(/ /g, ''),
            width: 165,
            cellClass: label === 'Asset Name' || label === 'Yearly Commitment' ? 'commitment-color' : 'breakdown-color',
        }));

        const rowData = getRowData();

        return {
            columnDefs,
            rowData,
        };
    },
};
</script>