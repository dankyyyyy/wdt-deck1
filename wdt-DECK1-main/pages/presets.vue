<template>
    <div class="w-full h-full">
        <NuxtLink to="/">
            <IconsLogoInverted class="inline-block align-middle w-full" />
        </NuxtLink>
        <div class="grid" v-if="presets !== undefined">
            <div v-for="preset in presets" :key="preset.id">
                <CardsPresetCard :preset="preset" @preset-selected="handlePresetSelected"
                    @preset-deselected="handlePresetDeselected" />
            </div>
        </div>
        <PresetsSubmitButton @click="navigateToNextPage" />
    </div>
</template>

<script>
import { usePresetStore } from '~/stores/PresetStore';

export default {
    name: "PresetList",
    data() {
        return {
            presets: [],
            isModalVisible: false,
            loading: false,
        };
    },
    async mounted() {
        this.presets = await usePresetStore().getAll();
        this.presets.length == 0 ? "" : this.loading = false;
    },
    async updated() {
        this.presets = await usePresetStore().getAll();
        this.presets.length == 0 ? "" : this.loading = false;
    },
    methods: {
        handlePresetSelected(preset) {
            usePresetStore().setSelectedPreset(preset);
        },
        handlePresetDeselected() {
            usePresetStore().setSelectedPreset(null);
            console.log(usePresetStore().getSelectedPreset());
        },
        navigateToNextPage() {
            if (usePresetStore().getSelectedPreset() !== null) {
                this.$router.push('/weatherDownTime');
                // this.$router.push('/financialFeasibility');
                // this.$router.push('/availability');
            }
        }
    },
}
</script>

<style scoped>
.selected {
    background-color: #abd5e5;
    /* Change to DECK1 Blue with 25% opacity */
}
</style>