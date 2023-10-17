<template>
    <div class="h-full align-middle deck-frame-translucent">
        <NuxtLink to="/">
            <IconsLogoInverted class="inline-block align-middle w-full" />
        </NuxtLink>
        <div class="create-input">
            <label for="name" class="box-title justify-center">Name: </label>
            <input type="text" v-model="preset.name" class="border-2 rounded-md text-center justify-center" />
        </div>
    </div>
    <SubmitButton @click="createPreset" />
</template>

<script>
import { usePresetStore } from '~/stores/PresetStore';
import { useAssetStore } from '~/stores/AssetStore';
import { useWindTurbineGeneratorStore } from '~/stores/WindTurbineGeneratorStore';
import { useLocationStore } from '~/stores/LocationStore';
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
        async isADupe(preset) {
            var isADupe = false;
            const presets = await usePresetStore().getAll();

            for (let i = 0; i < presets.length; i++) {
                if (presets[i].name === preset.name) {
                    isADupe = true;
                    break;
                }
            }
            return isADupe;
        },
        async validatePreset(preset) {
            if (await this.isADupe(preset)) {
                showError("Name already taken, please select a different one.");
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
