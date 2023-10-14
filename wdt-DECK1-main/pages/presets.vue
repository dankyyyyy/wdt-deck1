<template>
    <div class="w-full h-full">
        <NuxtLink to="/">
            <IconsLogoInverted class="inline-block align-middle w-full" />
        </NuxtLink>
        <div class="flex w-full justify-between p-5">
            <h1 class="text-2xl font-semibold"></h1>
            <IconsAdd @click="showModal" class="cursor-pointer" />
        </div>

        <ModalDialogsCreatePresetModal v-if="isModalVisible" @hideModal="hideModal" />

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
        },
        navigateToNextPage() {
            if (usePresetStore().getSelectedPreset() !== null) {
                // this.$router.push('/weatherDownTime');
                // this.$router.push('/financialFeasibility');
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
    /* Change to DECK1 Blue with 25% opacity */
}
</style>