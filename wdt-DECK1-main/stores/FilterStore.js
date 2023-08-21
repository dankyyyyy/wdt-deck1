import { defineStore } from "pinia";

export const useFilterStore = defineStore("FilterStore", {
  state: () => {
    const workTimeFrom = ref(8);
    const workTimeTo = ref(20);
    const hideRecommendation = ref(true);

    return {
      workTimeFrom,
      workTimeTo,
      hideRecommendation,
    };
  },
});
