import { defineStore } from "pinia";
import { generateLabelsFromAssets } from "~/utils/chartUtils";

export const useAvailStore = defineStore("AvailStore", {
    state: () => {
        const assetsAvailability: any = {
            requiredHours: [],
            availableHours: [],
            hoursDifference: [],
        }
        const datasets: any = {

        }
        const labels = generateLabelsFromAssets();
        return {
            assetsAvailability,
            datasets,
            labels,
        };
    },
    actions: {
    },
});