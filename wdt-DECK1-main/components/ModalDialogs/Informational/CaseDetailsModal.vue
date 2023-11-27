
<template>
    <div class="overlay" @click="hideModal">
        <div class="modal-overlay">
            <div class="box-content">
                <h3 class="box-title">{{ caseName }}</h3>
                <div style="display: flex;">
                    <h1 class="box-text">{{ caseLocation }}</h1>
                    <h1 class="box-text">{{ caseWtg }}</h1>
                </div>
                <div class="summary-table-container">
                    <TablesAssetSummaryTable :assets= caseAssets class="summary-table" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { usePresetStore } from '~/stores/PresetStore';
import { useAssetStore } from '~/stores/AssetStore';
import { useWindTurbineGeneratorStore } from '~/stores/WindTurbineGeneratorStore';
import { useLocationStore } from '~/stores/LocationStore';
import '~/utils/chartUtils';
import { showError } from '~/utils/globalErrorHandling';

export default {
    async mounted() {
        const currentPreset = usePresetStore().getSelectedPreset();
        this.caseName = currentPreset.name;
        this.caseAssets = currentPreset.assets;
        this.caseLocation = currentPreset.location.name;
        this.caseWtg = currentPreset.wtg.name;
    },

    methods: {
        handleCancelClick() {
            this.$emit("hideModal");
        },
    },
};
</script>