<template>
    <button class="proceed-button" :disabled="!isActive" :class="{ 'active': isActive }">
        <IconsDoneTick class="flex items-center justify-center inline-block align-middle w-full" />
    </button>
</template>

<script>
import { useLocationStore } from '~/stores/LocationStore';
import { usePresetStore } from '~/stores/PresetStore';
import { useTeamStore } from '~/stores/TeamStore';
import { useAssetStore } from '~/stores/AssetStore';
import { useWindTurbineGeneratorStore } from '~/stores/WindTurbineGeneratorStore';
import { useRouter } from 'vue-router';

export default {
    name: "SubmitButton",
    computed: {
        isActive() {
            const router = useRouter();
            const currentPath = router.currentRoute.value.path;

            switch (currentPath) {
                case "/presets": {
                    return usePresetStore().getSelectedPreset() !== null;
                }
                case "/dashboard": {
                    return usePresetStore().getSelectedPreset() !== null;
                }
                case "/availability": {
                    return usePresetStore().getSelectedPreset() !== null;
                }
                case "/financialFeasibility": {
                    return usePresetStore().getSelectedPreset() !== null;
                }
                case "/assets": {
                    return useAssetStore().getSelectedAssets().length !== 0;
                }
                case "/locations": {
                    return useLocationStore().getSelectedLocation() !== null;
                }
                case "/teams": {
                    return useTeamStore().getSelectedTeam() !== null;
                }
                case "/wtgs": {
                    return useWindTurbineGeneratorStore().getSelectedWtg() !== null;
                }
                case "/presetSummary": {
                    return true;
                }
                default: {
                    return false;
                }
            }
        },
    },
}
</script>