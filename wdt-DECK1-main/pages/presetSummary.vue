<template>
    <NuxtLink to="/">
        <IconsLogoInverted class="w-full inline-block deck-logo" />
    </NuxtLink>
    <div class="heading-container">
        <h1 class="generic-header">Preset Summary</h1>
    </div>

    <div deck-frame-translucent-container>
        <div class="deck-frame-translucent summary-layout">
            <div class="generic-header-medium">
                <label for="namePrompt">Please give a name to your preset! </label>
            </div>
            <div class="create-input">
                <label for="name" class="box-title justify-center">Name: </label>
                <input type="text" v-model="preset.name" class="border-2 rounded-md text-center justify-center" />
            </div>
            <div style="display: flex;">
                <CardsLocationCard :location="preset.location" />
                <CardsWtgCard :wtg="preset.wtg" />
            </div>
            <div class="summary-table-container">
                <TablesAssetSummaryTable :assets="preset.assets" class="summary-table" />
            </div>
        </div>
    </div>


    <SubmitButton @click="createPreset" />
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
                name: "",
                assets: useAssetStore().getSelectedAssets(),
                location: useLocationStore().getSelectedLocation(),
                wtg: useWindTurbineGeneratorStore().getSelectedWtg(),
            },
        };
    },
    methods: {
        async createPreset() {
            await this.validatePreset(this.preset);
        },
        async validatePreset(preset) {
            if (await isADupe(preset)) {
                showError("Name already taken, please select a different one.");
            } else if (!isValid(preset.name)) {
                showError("Please make sure your preset's name only contains letters, numbers, dashes and no other special characters.");
            } else if (preset.name === "") {
                showError("Please select a name for your preset before proceeding.");
            } else {
                const store = usePresetStore();
                await store.post(preset);
                usePresetStore().setSelectedPreset(preset);

                if (usePresetStore().getSelectedPreset() !== null) {
                    this.$router.push('/availability');
                }
            }
        },
    }
}
</script>
