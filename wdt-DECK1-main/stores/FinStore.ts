import { defineStore } from "pinia";

export const useFinStore = defineStore("FinStore", {
    state: () => {
        const assetsFin: any = {

        }
        const labels = ref<String[]>([
            "Yearly Available Hours",
            "Cost Without Fuel",
            "Cost of Fuel",
            "Total Cost",
        ]);
        return {
            assetsFin,
            labels,
        };
    },
    actions: {
    },
});