import { defineStore } from "pinia";

export const useFinStore = defineStore("FinStore", {
    state: () => {
        const assetsFin: any = {

        }
        const labels = ref<String[]>([
            "Total Cost",
            "Cost of Lease",
            "Cost of Fuel",
            "Cost of Salary",
            "CO2 Tax",
        ]);
        return {
            assetsFin,
            labels,
        };
    },
    actions: {
    },
});