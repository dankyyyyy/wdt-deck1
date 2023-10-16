<template>
    <div class="deck-frame-grey-container">
        <div class="w-full h-full deck-frame-grey inline-block">
            <div class="create-input">
                <label for="name">Name: </label>
                <input type="text" v-model="preset.name" class="border-2 rounded-md text-center" />
            </div>
        </div>
        <SubmitButton @click="createPreset" />
    </div>
</template>

<script>
import { usePresetStore } from '~/stores/PresetStore';
import { useAssetStore } from '~/stores/AssetStore';
import { useWindTurbineGeneratorStore } from '~/stores/WindTurbineGeneratorStore';
import { useLocationStore } from '~/stores/LocationStore';

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
            if (this.preset.name !== null) {
                const store = usePresetStore();
                await store.post(this.preset);
                usePresetStore().setSelectedPreset(this.preset);
            }

            if (usePresetStore().getSelectedPreset() !== null) {
                this.$router.push('/availability');
            }
        },
    },
}

</script>
