<template>
    <div class="w-full h-full">
        <NuxtLink to="/">
            <IconsLogoInverted class="inline-block align-middle w-full" />
        </NuxtLink>
        <div class="flex flex-wrap pb-5" v-if="presets !== undefined">
            <div v-for="preset in presets" :key="preset.id" class="p-5">
                <CardsPresetCard :preset="preset" @click="toggleSelect" />
            </div>
        </div>
        <button class="action-button" :class="{ 'active': isActionButtonActive }" :disabled="!isActionButtonActive"
            @click="navigateToNextPage">
            <IconsDoneTick class="flex items-center justify-center inline-block align-middle w-full" />
        </button>
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
            selectedPreset: null,
        };
    },
    computed: {
        isActionButtonActive() { return this.selectedPreset !== null; },
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
        toggleSelect(preset) {

            const presetStore = usePresetStore();

            if (this.selectedPreset !== preset) {
                // Select a new preset
                presetStore.setSelectedPreset(preset);
                this.selectedPreset = preset;
            } else {
                presetStore.setSelectedPreset(null);
                this.selectedPreset = null; // Deselect the preset
            }

            this.isActionButtonActive = this.selectedPreset !== null;
        },
        navigateToNextPage() {
            if (this.selectedPreset) {
                // Set this to the [CalculationsPage]
                this.$router.push('/weatherDownTime');
            }
        },
    },
}
</script>