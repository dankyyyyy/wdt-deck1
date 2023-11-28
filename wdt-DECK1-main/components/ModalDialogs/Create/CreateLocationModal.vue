<template>
  <div class="overlay">
    <div class="modal-overlay" style="max-height: 80%; overflow-y: hidden; overflow-x: hidden;">
      <h3 class="font-semibold box-title">Location Creation</h3>
      <div class="modal-content">
        <div class="py-5 flex flex-col flex-wrap content-center">
          <div class="create-input">
            <label for="name">Name: </label>
            <input type="text" v-model="location.name" class="border-2 rounded-md text-center" />
          </div>
          <div class="create-input">
            <label for="latitude">Latitude: </label>
            <input type="text" v-model="location.latitude" class="border-2 rounded-md text-center" />
          </div>
          <div class="create-input">
            <label for="longitude">Longitude: </label>
            <input type="text" v-model="location.longitude" class="border-2 rounded-md text-center" />
          </div>
          <div class="create-input">
            <label for="wtg">WTG: </label>
            <input type="text" v-model="location.wtg" class="border-2 rounded-md text-center" />
          </div>
        </div>
        <div class="modal-button-container">
          <ModalCancelButton @click="handleCancelClick" />
          <ModalSaveButton @click="handleSaveClick" />
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { useLocationStore } from "~/stores/LocationStore";
import { isNumeric } from "~/utils/chartUtils";
import { showError } from "~/utils/globalErrorHandling";

export default {
  name: "CreateLocationModal",
  data() {
    return {
      location: {
        _id: null,
        name: "",
        latitude: 0,
        longitude: 0,
      },
    };
  },
  methods: {
    handleCancelClick() {
      this.$emit("hideModal");
    },
    async handleSaveClick() {
      await this.validateLocation(this.location);
    },
    async isADupe(location) {
      const locations = await useLocationStore().getAll();
      var isADupe = false;

      for (let i = 0; i < locations.length; i++) {
        if (locations[i].name === location.name) {
          isADupe = true;
          break;
        }
      }
      return isADupe;
    },
    async validateLocation(location) {
      if (await this.isADupe(location)) {
        showError("Name already taken, please select a different one.");
      } else if (
        location.name === "" ||
        location.longitude === "" ||
        location.latitude === "" ||
        location.wtg === ""
      ) {
        showError("Please make sure all fields are filled in.");
      } else if (
        !isNumeric(location.longitude) ||
        !isNumeric(location.latitude) ||
        !isNumeric(location.wtg)
      ) {
        showError("Please make sure all attributes except name are numerical.");
      } else {
        const store = useLocationStore();
        await store.post(this.location);
        this.$emit("hideModal");
      }
    },
  },
};
</script>
  