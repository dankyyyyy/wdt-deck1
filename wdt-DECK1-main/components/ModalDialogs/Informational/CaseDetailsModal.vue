
<template>
    <div class="overlay" @click="handleBackgroundClick">
        <div class="modal-overlay" @click="handleOverlayClick">
            <div class="box-content">
                <h3 class="generic-header">{{ preset.name.name }}</h3>
                <div style="display: flex; justify-content: center; text-align: center;">
                    <CardsLocationCard :location="preset.location" />
                    <CardsWtgCard :wtg="preset.wtg" />
                </div>
                <div class="summary-table-container">
                    <TablesCaseDetailsAssetsTable :assets="preset.assets" class="summary-table" />
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
    name: "PresetSummary",
    data() {
        return {
            preset: {
                name: usePresetStore().getSelectedPreset(),
                assets: usePresetStore().getSelectedPreset().assets,
                location: usePresetStore().getSelectedPreset().location,
                wtg: usePresetStore().getSelectedPreset().wtg,
            },
        };
    },

    async mounted() {
        // const currentPreset = usePresetStore().getSelectedPreset();
        // this.caseName = currentPreset.name;
        // this.caseAssets = currentPreset.assets;
        // this.caseLocation = currentPreset.location.name;
        // this.caseWtg = currentPreset.wtg.name;

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