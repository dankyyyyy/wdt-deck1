<template>
    <NuxtLink to="/">
        <IconsLogoInverted class="inline-block align-middle w-full" />
    </NuxtLink>
    <div class="heading-container">
        <h1 class="generic-header">Wind Turbine Generators</h1>
    </div>

    <!-- <IconsAdd @click="showModal" class="cursor-pointer" /> -->
    <!-- add on hover description like "by clicking on this "+" button you can add another asset to your fleet" -->

    <!-- CreateWTGModal-->
    <ModalDialogsCreateWtgModal v-if="isModalVisible" @hideModal="hideModal" />

    <div deck-frame-translucent-container>
        <div class="grid deck-frame-translucent" v-if="wtgs !== undefined">
            <div v-for="wtg in  wtgs " :key="wtg.id" class="p-5">
                <CardsWtgCard :wtg="wtg" @wtg-selected="handleWtgSelected" @wtg-deselected="handleWtgDeselected" />
            </div>
        </div>
    </div>
    <SubmitButton @click="navigateToNextPage" />
</template>
  
<script>
import { useWindTurbineGeneratorStore } from "~/stores/WindTurbineGeneratorStore";

export default {
    name: "WTGList",
    data() {
        return {
            wtgs: [],
            isModalVisible: false,
            loading: false,
            isSelected: false,
        };
    },
    async mounted() {
        this.wtgs = await useWindTurbineGeneratorStore().getAll();
        this.wtgs.sort((a, b) => { return a.name.localeCompare(b.name)});
        this.wtgs.length == 0 ? "" : this.loading = false;
    },
    async updated() {
        this.wtgs = await useWindTurbineGeneratorStore().getAll();
        this.wtgs.sort((a, b) => { return a.name.localeCompare(b.name)});
        this.wtgs.length == 0 ? "" : this.loading = false;
    },
    methods: {
        showModal() {
            this.isModalVisible = true;
        },
        hideModal() {
            this.isModalVisible = false;
        },
        handleWtgSelected(wtg) {
            useWindTurbineGeneratorStore().setSelectedWtg(wtg);
        },
        handleWtgDeselected() {
            useWindTurbineGeneratorStore().setSelectedWtg(null);
        },
        navigateToNextPage() {
            this.$router.push('/presetSummary');
        },
    },
};
</script>
  