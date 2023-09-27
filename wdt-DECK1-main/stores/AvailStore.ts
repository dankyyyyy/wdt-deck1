import { defineStore } from "pinia";

export const useAvailStore = defineStore("AvailStore", {
    state: () => {
        const assetsAvailability: any = {

        }
        const labels = ref<String[]>([
            "Total Required Hours",
            "Total Available Hours",
        ]);
        return {
            assetsAvailability,
            labels,
        };
    },
    actions: {
    },
});