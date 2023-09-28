<template>
  <div class="w-full h-full deck-frame-grey">
    <div class="flex w-full justify-between p-5">
      <h1 class="text-2xl font-semibold">Assets</h1>
      <IconsAdd @click="showModal" class="cursor-pointer" />
      <!-- add on hover description like "by clicking on this "+" button you can add another asset to your fleet" -->
    </div>

    <!-- CreateAssetModal-->
    <ModalDialogsCreateAssetModal v-if="isModalVisible" @hideModal="hideModal" />

    <div class="flex flex-col p-5">
      <h2 class="text-lg font-semibold w-full pl-5">Vessels</h2>
      <div class="flex flex-wrap pb-5" v-if="assets !== undefined">
        <div v-for="asset in assets.filter((x) => x.category === 'Vessel')" :key="asset.id" class="p-5">
          <CardsAssetCard :asset="asset" />
        </div>
      </div>

      <h2 class="text-lg font-semibold w-full pl-5 pt-5">Helicopters</h2>
      <div class="flex flex-wrap pb-5" v-if="assets !== undefined">
        <div v-for="asset in assets.filter((x) => x.category === 'Helicopter')" :key="asset.id" class="p-5">
          <CardsAssetCard :asset="asset" />
        </div>
      </div>

      <h2 class="text-lg font-semibold w-full pl-5 pt-5">Wind Turbine Generators</h2>
      <div class="flex flex-wrap pb-5" v-if="wtgs !== undefined">
        <div v-for="wtg in wtgs" :key="wtg.id" class="p-5">
          <CardsAssetCard :asset="wtg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAssetStore } from "~/stores/AssetStore";
import { useWindTurbineGeneratorStore } from "~/stores/WindTurbineGeneratorStore";

export default {
  name: "AssetList",
  data() {
    return {
      assets: [],
      wtgs: [],
      isModalVisible: false,
      loading: false,
    };
  },
  async mounted() {
    this.assets = await useAssetStore().getAll();
    this.assets.length == 0 ? "" : this.loading = false;

    this.wtgs = await useWindTurbineGeneratorStore().getAll();
    this.wtgs.length == 0 ? "" : this.loading = false;
  },
  async updated() {
    this.assets = await useAssetStore().getAll();
    this.assets.length == 0 ? "" : this.loading = false;

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
  },
};
</script>
