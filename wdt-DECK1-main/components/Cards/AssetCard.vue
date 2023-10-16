<template>
  <div class="grid-container">
    <div class="grid">
      <div class="card-box" @click="selectAsset" :class="{ 'selected': isSelected }">
        <div class="box-content">
          <IconsLogoInverted class="box-image inline-block align-middle w-full" />
          <h2 class="box-title">{{ asset.name }}</h2>

          <!-- <ModalDialogsUpdateAssetModal :asset="asset" v-if="isUpdateModalVisible" @hideModal="hideModal" />
          <ModalDialogsDeleteAssetModal :asset="asset" v-if="isDeleteModalVisible" @hideModal="hideModal" /> -->

          <!-- <div class="flex space-x-2">
            <IconsUpdate @click="showUpdateModal" class="cursor-pointer" />
            <IconsDelete @click="showDeleteModal" class="cursor-pointer" />
          </div> -->

          <div class="box-text">
            <label for="limit">Wind Speed Limit: </label>
            <p class="box-text-type">{{ asset.windSpeedLimit }}m/s</p>
            <hr />

            <div v-if="asset.category === 'Vessel' || asset.category === 'Helicopter'">
              <label for="limit">H<sub>s</sub> Limit:</label>
              <p class="box-text-type">{{ asset.hs }}m</p>
              <hr />
              <label for="dayRate">Day Rate: </label>
              <p class="box-text-type">{{ asset.dayRate }}€</p>
              <!--Info box for price ranges-->
              <hr />
            </div>

            <div v-if="asset.category === 'Vessel'">
              <label for="limit">Vessel Speed: </label>
              <p class="box-text-type">{{ asset.vesselSpeed }}kt</p>
              <hr />
              <label for="limit">High Engine Activity: </label>
              <p class="box-text-type">{{ asset.highEngineActivity }}h</p>
              <hr />
              <label for="limit">Loitering: </label>
              <p class="box-text-type">{{ asset.loitering }}h</p>
              <hr />

              <div v-if="asset.category === 'Helicopter'">
                <label for="limit">Helicopter Speed: </label>
                <p class="box-text-type">{{ asset.helicopterSpeed }}kt</p>
                <hr />
                <label for="limit">Cloudbase: </label>
                <p class="box-text-type">{{ asset.cloudbase }}m</p>
                <hr />
                <label for="limit">Visibility: </label>
                <p class="box-text-type">{{ asset.visibility }}km</p>
              </div>

              <div v-if="asset.category === 'Vessel' || asset.category === 'Helicopter'">
                <label for="limit">Fuel Consumption: </label>
                <p class="box-text-type">{{ asset.operationalFuelConsumption }}l/h</p>
                <hr />
              </div>

              <div v-if="asset.category === 'Vessel'">
                <label for="limit">Fuel Consumption when Loitering: </label>
                <p class="box-text-type">{{ asset.loiteringFuelConsumption }}l/h</p>
              </div>

              <div v-if="asset.category === 'Helicopter'">

                <label for="limit">Flight Time (2 round trips): </label>
                <p class="box-text-type">{{ asset.flightTime }}h</p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAssetStore } from '~/stores/AssetStore';

export default {
  name: "AssetCard",
  props: {
    asset: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      isSelected: false,
      isUpdateModalVisible: false,
      isDeleteModalVisible: false,
    };
  },
  methods: {
    // showUpdateModal() {
    //   this.isUpdateModalVisible = true;
    // },
    // showDeleteModal() {
    //   this.isDeleteModalVisible = true;
    // },
    // hideModal() {
    //   this.isUpdateModalVisible = false;
    //   this.isDeleteModalVisible = false;
    // },
    selectAsset() {
      const asset = this.asset;
      const selectedAssets = useAssetStore().getSelectedAssets();
      var found = false;

      for (let i = 0; i < selectedAssets.length; i++) {
        if (selectedAssets[i]._id === asset._id) found = true;
      }

      if (found) {
        this.isSelected = false;
        this.$emit("asset-deselected", asset);
      } else {
        this.isSelected = true;
        this.$emit("asset-selected", asset);
      }
    },
  },
};
</script>

<style scoped>
.grid-container {
  display: grid;
  justify-content: center;
}

.grid {
  display: flex;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 16px;
}

.selected {
  background-color: #abd5e5;
  /* Change to DECK1 Blue with 25% opacity */
}
</style>