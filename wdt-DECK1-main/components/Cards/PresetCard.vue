<template>
    <div class="grid-container">
        <div class="grid">
            <div class="card-box" @click="selectPreset" :class="{ 'selected': isSelected }">
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
                        <label for="asset2">Assets: </label>
                        <div v-for="(asset, key) in preset.assets" :key="key">
                            <p class="box-text-type">{{ asset.name }}</p>
                        </div>
                    </div>
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
        },
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
            } else if (usePresetStore().getSelectedPreset()._id === preset._id) {
                this.isSelected = false;
                this.$emit("preset-deselected");
            }
        },
    },
}
</script>

<style scoped>
.grid-container {
    display: grid;
    justify-content: center;
}

.grid {
    display: flex;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 16px;
}

.selected {
    background-color: #abd5e5;
}
</style>