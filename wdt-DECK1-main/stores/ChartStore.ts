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

        const estimatedRiskTableLabels = ref<String[]>([
            "Asset Name",
            "Downtime Cost",
            "Lost Charter",
            "Lost Salary",
        ]);

        const yearlyCommitmentTableLabels = ref<String[]>([
            "Asset Name",
            "Yearly Commitment",
            "Fuel and CO2",
            "Charter Cost",
        ]);

        const EfficiencyTableLabels = ref<String[]>([
            "Asset Name",
            "Yearly Commitment",
            "Charter",
            "Fuel",
            "CO2 Tax",
        ]);

        const dashboardYearlyCommitmentTableLabels = ref<String[]>([
            "Asset Name",
            "Yearly Commitment",
        ]);

        const dashboardAssetAvailabilityTableLabels = ref<String[]>([
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
            estimatedRiskTableLabels,
            yearlyCommitmentTableLabels,
            EfficiencyTableLabels,
            dashboardYearlyCommitmentTableLabels,
            dashboardAssetAvailabilityTableLabels,
            assetSummaryTableLabels,
            availData,
        }
    }
})