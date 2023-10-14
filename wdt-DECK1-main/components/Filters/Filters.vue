<template>
  <div class="flex wdt-filter-container">
    <div class="flex w-full h-full deck-frame-white">
      <h2 class="text-xl w-full font-semibold p-2">Filters</h2>
      <div class="p-2 pt-4 w-full flex justify-between relative">
        <label for="startHour" class="text-lg">Years of data: </label>
      </div>
      <div class="p-2 flex w-full justify-around">
        <div class="range-slider">
          <span @change="slider">
            <input v-model="filterParams.years" ref="inputYears" id="years" type="number" min="1" max="23" /></span>
          <input @change="slider" v-model="filterParams.years" ref="inputYears" id="years" min="1" max="23" step="1"
            type="range" />
          <svg width="100%" height="16"></svg>
        </div>
      </div>

      <div class="p-2 pt-4 w-full flex justify-between relative">
        <label for="startHour" class="text-lg">Working hours: </label>
      </div>
      <div class="p-2 flex w-full justify-around">
        <div class="range-slider">
          <span @change="slider">
            <input v-model.number="filterParams.startHour" ref="inputStartHour" type="number" min="0" max="23" />
            <input v-model.number="filterParams.endHour" ref="inputEndHour" type="number" min="0" max="23" /></span>
          <input @change="slider" v-model.number="filterParams.startHour" ref="inputStartHour" min="0" max="23" step="1"
            type="range" />
          <input @change="slider" v-model.number="filterParams.endHour" ref="inputEndHour" min="0" max="23" step="1"
            type="range" />
          <svg width="100%" height="16"></svg>
        </div>
      </div>

      <div class="p-2 pt-4 w-full flex justify-between relative">
        <label for="startMonth" class="text-lg">Months from-to: </label>
      </div>
      <div class="p-2 pb-7 flex w-full justify-around">
        <div class="range-slider">
          <span @change="slider">
            <input v-model.number="filterParams.startMonth" ref="inputStartMonth" type="number" min="1" max="12" />
            <input v-model.number="filterParams.endMonth" ref="inputEndMonth" type="number" min="1" max="12" /></span>
          <input @change="slider" v-model.number="filterParams.startMonth" ref="inputStartMonth" min="1" max="12" step="1"
            type="range" />
          <input @change="slider" v-model.number="filterParams.endMonth" ref="inputEndMonth" min="1" max="12" step="1"
            type="range" />
          <svg width="100%" height="16"></svg>
        </div>
      </div>
      <p class="text-red-600 w-full" v-if="error">{{ errorMessage }}</p>
      <button class="mx-2 my-3 p-1 px-3 rounded-md border-2 text-center button-87" @click="emitButtonClick">
        Apply changes
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filterProps: {
      startHour: Number,
      endHour: Number,
      startMonth: Number,
      endMonth: Number,
      years: Number,
      chartId: Number,
    },
  },
  data(props) {
    return {
      filterParams: {
        startHour: props.filterProps.startHour,
        endHour: props.filterProps.endHour,
        startMonth: props.filterProps.startMonth,
        endMonth: props.filterProps.endMonth,
        years: props.filterProps.years,
      },
      error: ref(false),
      errorMessage: ref("Enter a valid input!"),
      showTooltip: false,
    };
  },
  methods: {
    emitButtonClick() {
      this.checkInput();
      if (!this.error) {
        const data = {
          startHour: this.filterParams.startHour,
          endHour: this.filterParams.endHour,
          startMonth: this.filterParams.startMonth,
          endMonth: this.filterParams.endMonth,
          years: this.filterParams.years,
        };
        this.$emit("buttonClick", data);
      }
    },
    checkInput() {
      if (
        this.$refs.inputStartHour.value < 0 ||
        this.$refs.inputStartHour.value > 23 ||
        this.$refs.inputEndHour.value < 0 ||
        this.$refs.inputEndHour.value > 23 ||
        Number(this.$refs.inputStartHour.value) >
        Number(this.$refs.inputEndHour.value) ||
        Number(this.$refs.inputStartHour.value) % 1 !== 0 ||
        Number(this.$refs.inputEndHour.value) % 1 !== 0 ||
        this.$refs.inputEndHour.value === "" ||
        this.$refs.inputStartHour.value === "" ||
        //end of start-endhour checks
        this.$refs.inputStartMonth.value < 1 ||
        this.$refs.inputStartMonth.value > 12 ||
        this.$refs.inputEndMonth.value < 1 ||
        this.$refs.inputEndMonth.value > 12 ||
        Number(this.$refs.inputStartMonth.value) >
        Number(this.$refs.inputEndMonth.value) ||
        Number(this.$refs.inputStartMonth.value) % 1 !== 0 ||
        Number(this.$refs.inputEndMonth.value) % 1 !== 0 ||
        this.$refs.inputStartMonth.value === "" ||
        this.$refs.inputEndMonth.value === "" ||
        //end of start-endmonth checks
        this.$refs.inputYears.value < 1 ||
        this.$refs.inputYears.value > 23 ||
        Number(this.$refs.inputYears.value) % 1 !== 0 ||
        this.$refs.inputYears.value === ""
      ) {
        this.error = true;
      } else {
        this.error = false;
      }
    },
  },
};
</script>

<style scoped>
/* disable arrows/spinners in input field */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
