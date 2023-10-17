<template>
    <div class="h-full align-middle deck-frame-translucent">
        <NuxtLink to="/">
            <IconsLogoInverted class="inline-block align-middle w-full" />
        </NuxtLink>
        <div class="flex w-full justify-between p-5">
            <h1 class="text-2xl font-semibold">Wind Turbine Generators</h1>
            <IconsAdd @click="showModal" class="cursor-pointer" />
            <!-- add on hover description like "by clicking on this "+" button you can add another asset to your fleet" -->
        </div>

        <!-- CreateAssetModal-->
        <ModalDialogsCreateWtgModal v-if="isModalVisible" @hideModal="hideModal" />
        
        <div class="flex flex-wrap pb-5" v-if="wtgs !== undefined">
            <div v-for="wtg in  wtgs " :key="wtg.id" class="p-5">
                <CardsWtgCard :wtg="wtg" @wtg-selected="handleWtgSelected" @wtg-deselected="handleWtgDeselected" />
            </div>
        </div>
        <SubmitButton @click="navigateToNextPage" />
    </div>
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
        this.wtgs.length == 0 ? "" : this.loading = false;
    },
    async updated() {
        this.wtgs = await useWindTurbineGeneratorStore().getAll();
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
  