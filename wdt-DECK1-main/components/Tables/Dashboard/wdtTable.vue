<template>
    <ag-grid-vue class="ag-theme-alpine dashboard-table" :columnDefs="columnDefs" :rowData="rowData" />
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
                    const annualWorkability = yearlyWorkabilityPerAsset(chartStore.wdtData[asset.name], props.filterParams.startMonth, props.filterParams.endMonth);

                    const row = {
                        AssetName: asset.name,
                        AnnualWorkability: annualWorkability,
                    }
                    tempRowData.push(row);
                }
                return tempRowData;
            }
        };

        const columnDefs = useChartStore().wdtTableLabels.map(label => ({
            headerName: label,
            field: label.replace(/ /g, ''),
            width: 165,
            valueFormatter: (params) => {
                if (params.colDef.field === 'AnnualWorkability') {
                    return (params.value * 100).toFixed(0) + '%';
                }
            }
        }));

        const rowData = getRowData();

        return {
            columnDefs,
            rowData,
        };
    },
}
</script>