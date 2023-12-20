<template>
    <ag-grid-vue class="ag-theme-alpine summary-table" :columnDefs="columnDefs" :rowData="rowData" />
</template>

<script>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";
import { useChartStore } from "~/stores/ChartStore";
import { usePresetStore } from "~/stores/PresetStore";
import "~/utils/chartUtils";

export default {
    name: "CaseDetailsAssetsTable",
    components: {
        AgGridVue,
    },
    setup() {
        const getRowData = () => {
            const presetStore = usePresetStore();
            const tempRowData = [];

            if (presetStore.getSelectedPreset() != null) {
                const currentPreset = presetStore.getSelectedPreset();
                const assets = currentPreset.assets;

                for (let i = 0; i < assets.length; i++) {
                    const asset = assets[i];
                    const team = assets[i].team;

                    const row = {
                        AssetName: asset.name,
                        TeamName: team.name,
                        TeamSize: team.numberOfPersons,
                    }
                    tempRowData.push(row);
                }
                return tempRowData;
            }
        }

        const columnDefs = useChartStore().assetSummaryTableLabels.map(label => ({
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
}
</script>