<template>
    <div class="grid">
        <div class="preset-box" @click="selectPreset" :class="{ 'selected': isSelected }">
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
    data() {
        return {
            isSelected: false,
        }
    },
    methods: {
        selectPreset() {
            const preset = this.preset;
            
            if (usePresetStore().getSelectedPreset() === null) {
                this.isSelected = true;
                this.$emit("preset-selected", preset);
            /*} else if (usePresetStore().getSelectedPreset() !== preset && usePresetStore().getSelectedPreset() !== null) {
                const oldPreset = usePresetStore().getSelectedPreset();
                this.$emit("preset-deselected", oldPreset);
                this.$emit("preset-selected", preset);
                this.isSelected = true;*/
            } else if (usePresetStore().getSelectedPreset()._id === preset._id) {
                this.isSelected = false;
                this.$emit("preset-deselected");
            }
        },
    },
}
</script>

<style scoped>
.grid {
    display: flex;
    flex-wrap: wrap;
}

.selected {
    background-color: #abd5e5;
    /* Change to DECK1 Blue with 25% opacity */
}
</style>