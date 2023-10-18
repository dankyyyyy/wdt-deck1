<template>
    <ag-grid-vue class="ag-theme-alpine summary-table" :columnDefs="columnDefs" :rowData="rowData" />
</template>

<script>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";
import { useChartStore } from "~/stores/ChartStore";
import { useAssetStore } from "~/stores/AssetStore";
import "~/utils/chartUtils";

export default {
    name: "AssetSummaryTable",
    components: {
        AgGridVue,
    },
    setup() {
        const getRowData = () => {
            const assetStore = useAssetStore();
            const tempRowData = [];

            if (assetStore.getSelectedAssets() != null) {
                const assets = assetStore.getSelectedAssets();

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