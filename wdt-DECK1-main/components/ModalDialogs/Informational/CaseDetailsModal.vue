
<template>
    <div class="overlay" @click="handleBackgroundClick">
        <div class="modal-overlay" @click="handleOverlayClick">
            <div class="box-content">
                <h3 class="box-title">{{ caseName }}</h3>
                <div style="display: flex; justify-content: center; text-align: center;">
                    <h1 class="box-text">{{ caseLocation }}</h1>
                    <h1 class="box-text">{{ caseWtg }}</h1>
                </div>
                <div class="summary-table-container">
                    <TablesAssetSummaryTable v-if="caseAssets" :assets="caseAssets" class="summary-table" />
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

        document.addEventListener('click', this.handleDocumentClick);
    },

    methods: {
        handleOverlayClick(event) {
            // Prevent clicks inside the overlay from propagating to the background
            event.stopPropagation();
        },

        handleBackgroundClick() {
            // Close the overlay when clicking anywhere outside of it
            this.$emit('hideModal');
        },

        handleCancelClick() {
            this.$emit("hideModal");
        },
    },
};
</script>