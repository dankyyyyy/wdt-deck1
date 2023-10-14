import { defineStore } from "pinia";

export const useChartStore = defineStore("ChartStore", {
    state: () => {
        const wdtData: any = {

        }

        const wdtLabels = ref<String[]>([
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

        const wdtTableLabels = ref<String[]>([
            "Asset Name",
            "Annual Availability",
        ]);

        const perWTGData: any = {

        }

        const perWRKHRData: any = {

        }

        const finChartLabels = ref<String[]>([
            "Price per WTG",
            "Price per Required Work Hour",
        ]);

        const finTableLabels = ref<String[]>([
            "Asset Name",
            "Downtime Cost",
            "Lost Charter",
            "Lost Salary",
        ]);

        const yearlyCommitmentRiskTableLabels = ref<String[]>([
            "Asset Name",
            "Yearly Commitment",
            "Downtime Cost",
            "Direct Cost",
        ]);

        const yearlyDirectCostTableLabels = ref<String[]>([
            "Asset Name",
            "Direct Cost",
            "Charter",
            "Fuel",
            "CO2 Tax",
        ]);

        const yearlyCommitmentTableLabels =  ref<String[]>([
            "Asset Name",
            "Yearly Commitment"
        ]);

        const assetWorkabilityTableLabels =  ref<String[]>([
            "Asset Name",
            "Annual Workability"
        ]);

        const availData: any = {

        }



        return {
            wdtData,
            wdtLabels,
            wdtTableLabels,
            perWTGData,
            perWRKHRData,
            finChartLabels,
            finTableLabels,
            yearlyCommitmentRiskTableLabels,
            yearlyDirectCostTableLabels,
            yearlyCommitmentTableLabels,
            assetWorkabilityTableLabels,
            availData,
        }
    }
})