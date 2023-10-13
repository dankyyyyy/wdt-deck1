<template>
    <ag-grid-vue class="ag-theme-alpine wdt-table" :columnDefs="columnDefs" :rowData="rowData" />
</template>

<script>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";
import { useChartStore } from "~/stores/ChartStore";
import { usePresetStore } from "~/stores/PresetStore";
import "~/utils/chartUtils";

export default {
    name: "wdtTable",
    components: {
        AgGridVue,
    },
    data() {
        return {
            columnDefs: useChartStore().wdtTableLabels.map(label => ({
                headerName: label,
                field: label.replace(/ /g, ''),
                width: 165,
                valueFormatter: this.formatPercentage,
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
                        AnnualAvailability: annualWorkability,
                    }
                    tempRowData.push(row);
                }
                return tempRowData;
            }
        },
        formatPercentage(params) {
            const columnName = params.colDef.field;

            if (columnName === 'AnnualAvailability') {
                return (params.value * 100).toFixed(0) + '%';
            }

            return params.value;
        },
    },
};
</script>