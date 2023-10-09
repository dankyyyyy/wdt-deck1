<template>
    <button class="proceed-button" :disabled="!isActive" :class="{ 'active': isActive }">
        <IconsDoneTick class="flex items-center justify-center inline-block align-middle w-full" />
    </button>
</template>

<script>
import { usePresetStore } from '~/stores/PresetStore';

export default {
    name: "PresetsSubmitButton",
    computed: {
        isActive() {
            return usePresetStore().getSelectedPreset() !== null;
        }
    },
}
</script>