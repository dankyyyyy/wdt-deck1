import { defineStore } from "pinia";

export const useWeatherStore = defineStore("WeatherStore", {
  state: () => {
    const assetsWdt: any = {
      
    }
    const labels = ref<String[]>([
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]);

    return {
      assetsWdt,
      labels,
    };
  },
  actions: {
  },
});
