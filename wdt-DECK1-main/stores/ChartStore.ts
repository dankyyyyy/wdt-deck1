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
            "Asset Type",
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
            "Asset Type",
            "Total Cost",
            "Cost of Lease",
            "Cost of Fuel",
            "Cost of Salary",
            "CO2 Tax",
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
            availData,
        }
    }
})