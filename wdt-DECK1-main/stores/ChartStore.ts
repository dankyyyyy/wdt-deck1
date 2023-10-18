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
            "Annual Workability",
        ]);

        const perWTGLabels = ref<String[]>([
            "Asset Name",
            "Price per WTG",

        ]);

        const perWRKHRLabels = ref<String[]>([
            "Asset Name",
            "Price per WRKHR",
        ]);

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
            "Fuel and CO2",
            "Charter Cost",
        ]);

        const yearlyDirectCostTableLabels = ref<String[]>([
            "Asset Name",
            "Direct Cost",
            "Charter",
            "Fuel",
            "CO2 Tax",
        ]);

        const yearlyCommitmentTableLabels = ref<String[]>([
            "Asset Name",
            "Yearly Commitment",
        ]);

        const assetAvailabilityTableLabels = ref<String[]>([
            "Asset Name",
            "Annual Availability",
        ]);

        const assetSummaryTableLabels = ref<String[]>([
            "Asset Name",
            "Team Name",
            "Team Size",
        ]);

        const availData: any = {

        }

        return {
            wdtData,
            wdtLabels,
            wdtTableLabels,
            perWTGLabels,
            perWRKHRLabels,
            finChartLabels,
            finTableLabels,
            yearlyCommitmentRiskTableLabels,
            yearlyDirectCostTableLabels,
            yearlyCommitmentTableLabels,
            assetAvailabilityTableLabels,
            assetSummaryTableLabels,
            availData,
        }
    }
})