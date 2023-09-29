<template>
    <div class="w-full h-full deck-frame-grey">
        <div class="flex w-full justify-between p-5">
            <h1 class="text-2xl font-semibold">Presets</h1>
            <IconsAdd @click="showModal" class="cursor-pointer" />
        </div>

        <ModalDialogsCreatePresetModal v-if="isModalVisible" @hideModal="hideModal" />

        <div class="flex flex-wrap pb-5" v-if="presets !== undefined">
            <div v-for="preset in presets" :key="preset.id" class="p-5">
                <CardsPresetCard :preset="preset" />
            </div>
        </div>
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
    async onMounted() {
        this.presets = await usePresetStore().getAll();
        this.presets.length == 0 ? "" : this.loading = false;
        console.log(`Presets: ${this.presets}`);
    },
    async updated() {
        this.presets = await usePresetStore().getAll();
        this.presets.length == 0 ? "" : this.loading = false;
    },
    methods: {
        showModal() {
            this.isModalVisible = true;
        },
        hideModal() {
            this.isModalVisible = false;
        },
    },
}
</script>