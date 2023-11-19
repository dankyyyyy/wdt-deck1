<template>
  <NuxtLink to="/">
    <IconsLogoInverted class="inline-block align-middle w-full" />
  </NuxtLink>
  <div class="heading-container">
    <h1 class="generic-header">Assets</h1>
  </div>

  <!-- CreateAssetModal-->
    <ModalDialogsCreateAssetModal v-show="isModalVisible" @hideModal="hideModal" />

  <div deck-frame-translucent-container>
    <div class="grid deck-frame-translucent" v-if="assets !== undefined">
      <div v-for="asset in assets" :key="asset.id" class="p-5">
        <CardsAssetCard :asset="asset" @asset-selected="handleAssetSelected" @asset-deselected="handleAssetDeselected" />
      </div>
    </div>
  </div>
  <CreateButton @click="showModal" class="cursor-pointer" />
  <SubmitButton @click="navigateToNextPage" />
</template>

<script>
import { useAssetStore } from "~/stores/AssetStore";

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
    this.assets.sort((a, b) => { return a.name.localeCompare(b.name); });
    this.assets.length == 0 ? "" : this.loading = false;
  },
  async updated() {
    this.assets = await useAssetStore().getAll();
    this.assets.sort((a, b) => { return a.name.localeCompare(b.name); });
    this.assets.length == 0 ? "" : this.loading = false;
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    hideModal() {
      this.isModalVisible = false;
    },
    handleAssetSelected(asset) {
      useAssetStore().addSelectedAsset(asset);
    },
    handleAssetDeselected(asset) {
      useAssetStore().removeSelectedAsset(asset);
    },
    navigateToNextPage() {
      if (useAssetStore().getSelectedAssets() !== null) {
        this.$router.push('/locations');
      }
    },
  },
};
</script>
