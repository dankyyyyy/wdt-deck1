<template>
  <NuxtLink to="/">
    <IconsLogoInverted class="inline-block align-middle w-full" />
  </NuxtLink>
  <div class="heading-container">
    <h1 class="generic-header">Locations</h1>
  </div>

  <IconsAdd @click="showModal" class="cursor-pointer" />

  <ModalDialogsCreateLocationModal v-if="isModalVisible" @hideModal="hideModal"
    @downloaded="sendDownloadedNotification" />
  <div deck-frame-translucent-container>
    <div v-if="!loading" class="grid deck-frame-translucent">
      <div v-for="location in locations" :key="location._id">
        <CardsLocationCard :location="location" :downloaded="downloaded" @location-selected="handleLocationSelected"
          @location-deselected="handleLocationDeselected" />
      </div>
      <SubmitButton @click="navigateToNextPage" />
    </div>
    <div v-else>
      Loading data...
    </div>
  </div>
</template>

<script>
import { useLocationStore } from "~/stores/LocationStore";

export default {
  name: "LocationList",
  data() {
    return {
      locations: [],
      isModalVisible: false,
      loading: true,
      cardKey: false,
    };
  },
  async mounted() {
    this.locations = await useLocationStore().getAll();
    this.locations.length === 0 ? "" : this.loading = false;
  },
  async updated() {
    this.locations = await useLocationStore().getAll();
    this.locations.length === 0 ? "" : this.loading = false;
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    hideModal() {
      this.isModalVisible = false;
    },
    sendDownloadedNotification() {
      this.downloaded = true;
    },
    handleLocationSelected(location) {
      useLocationStore().setSelectedLocation(location);
    },
    handleLocationDeselected() {
      useLocationStore().setSelectedLocation(null);
    },
    navigateToNextPage() {
      if (useLocationStore().getSelectedLocation() !== null) {
        this.$router.push('/wtgs');
      }
    }
  },
};
</script>
