<template>
    <div class="grid">
        <div class="preset-box" :class= "{'selected-preset': isSelected }">
            <div class="box-content">
                <IconsLogoInverted class="box-image inline-block align-middle w-full" />
                <div class="box-title">{{ preset.name }}</div>
                <div class="box-text">
                    <hr />
                    <label for="location">Location: </label>
                    <p class="box-text-type">{{ preset.location.name }}</p>
                    <hr />
                    <label for="wtg">WTG (Model): </label>
                    <p class="box-text-type">{{ preset.wtg.name }}</p>
                    <hr />
                    <label for="asset1">Asset1: </label>
                    <p class="box-text-type">{{ preset.asset1.name }}</p>
                    <hr />
                    <label for="asset2">Asset2: </label>
                    <p class="box-text-type">{{ preset.asset2.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { usePresetStore } from '~/stores/PresetStore';

export default {
    name: "PresetCard",
    props: {
        preset: {
            type: Object,
            required: true,
        }
    },
    computed: {
        isSelected(){
            const presetStore = usePresetStore();
            return this.preset === presetStore.getSelectedPreset();
        },
    },
    methods: {
        toggleSelect(preset) {
            this.$emit('toggle-select', preset);
        },
    },
}
</script>

<style scoped>
.grid {
    display: flex;
    flex-wrap: wrap;
}
</style>