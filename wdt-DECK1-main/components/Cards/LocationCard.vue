<template>
  <div class="grid-container">
    <div class="grid">
      <div class="customize-card-box" @click="selectLocation" :class="{ 'selected': isSelected }">
        <div class="box-content">
          <IconsLogoInverted class="box-image inline-block align-middle w-full" />
          <div v-if="dataInformation.isFetching" style="align-items: center;">
            <p style="text-align: center;">Checking for data...</p>
          </div>
          <div v-else-if="dataInformation.isDataRegistered">
            <p style="text-align: center;">Data Found</p>
            <p style="text-align: center;">Latest Year Found: {{ dataInformation.latestDataYear }}</p>
          </div>
          <div v-else>
            <p class="font-semibold" style="text-align: center;">No Data Found</p>
          </div>

          <h2 class="box-title">{{ location.name }}</h2>

          <div class="customize-box-text">
            <label for="latitude">Latitude: </label>
            <p class="customize-box-text-type">{{ location.latitude }}</p>
            <hr />
            <label for="longitude">Longitude: </label>
            <p class="customize-box-text-type">{{ location.longitude }}</p>
            <hr />
            <label for="limit">Wind Speed Limit: </label>
            <p class="customize-box-text-type">{{ location.limit }}m/s</p>
            <hr />
            <label for="turbines">Turbines: </label>
            <p class="customize-box-text-type">{{ location.wtg }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useWeatherdataStore } from "~/stores/WeatherdataStore";
import { useLocationStore } from "~/stores/LocationStore";

export default {
  name: "LocationCard",
  props: {
    location: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dataInformation: {
        isFetching: true,
        isDataRegistered: false,
        latestDataYear: null,
      },
      isSelected: false,
      yearNow: new Date().getFullYear(),
      yearStart: 2004,
    };
  },
  async mounted() {
    const foundData = await useWeatherdataStore().checkByLocationId(this.location._id)
    if (foundData !== undefined) {
      this.dataInformation.isDataRegistered = true;
      this.dataInformation.latestDataYear = await this.determineLatestYear();
      this.dataInformation.isFetching = false;
    } else {
      this.dataInformation.isDataRegistered = false;
      this.dataInformation.isFetching = false;
    }
  },
  methods: {
    selectLocation() {
      const location = this.location;

      if (useLocationStore().getSelectedLocation() === null) {
        this.isSelected = true,
          this.$emit("location-selected", location)
      } else if (useLocationStore().getSelectedLocation()._id === this.location._id) {
        this.isSelected = false;
        this.$emit("location-deselected");
      }
    },
    async determineLatestYear() {
      const integrity = await checkIntegrity(this.location);
      var latestYear = null;
      if (integrity[this.yearNow] === true) latestYear = this.yearNow; else {
        for (let i = this.yearStart; i <= this.yearNow; i++) {
          if (integrity[i] === true) {
            latestYear = i;
          } else break;
        }
      }

      return latestYear;
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

.summary-grid {
  display: flex;
  grid-template-columns: repeat(auto-fit, minmax(min(30rem, 100%), 1fr));
  gap: 16px;
}

.selected {
  background-color: #abd5e5;
  /* Change to DECK1 Blue with 25% opacity */
}
</style>