<template>
    <NuxtLink to="/">
        <IconsLogoInverted class="inline-block align-middle w-full" />
    </NuxtLink>

    <div class="heading-container">
        <h1 class="generic-header">Preset Selection</h1>
    </div>

    <!-- <IconsAdd @click="showModal" class="cursor-pointer" /> -->

    <!-- <ModalDialogsCreatePresetModal v-if="isModalVisible" @hideModal="hideModal" /> -->
    <div class="deck-frame-translucent-container">
        <div class="grid deck-frame-translucent" v-if="presets !== undefined">
            <div v-for="preset in presets" :key="preset.id">
                <CardsPresetCard :preset="preset" @preset-selected="handlePresetSelected"
                    @preset-deselected="handlePresetDeselected" />
            </div>
        </div>
    </div>
    <SubmitButton @click="navigateToNextPage" />
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
        console.log(usePresetStore().getSelectedPreset());
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
        },
        navigateToNextPage() {
            if (usePresetStore().getSelectedPreset() !== null) {
                this.$router.push('/availability');
            }
        },
        showModal() {
            this.isModalVisible = true;
        },
        hideModal() {
            this.isModalVisible = false;
        },
    },
}
</script>

<style scoped>
.selected {
    background-color: #abd5e5;
}
</style>