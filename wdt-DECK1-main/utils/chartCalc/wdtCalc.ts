import { useWeatherdataStore } from "@/stores/WeatherdataStore";
import { useChartStore } from "~/stores/ChartStore";
import "@/utils/chartUtils";

// THRESHOLD - percentage of a day that can be no-fly
// determines availability (50%+ => available)
const threshold: number = 0.5;
const yearStart: number = 2004;

let hours: number[] = []
let days: number[] = []
let months: number[] = []

let current_day: number = 1;
let current_month: number = 1;

export function start(
  timeRangeStart: number,
  timeRangeEnd: number,
  startMonth: number,
  endMonth: number,
  years: number,
  asset: any,
) {

  startMonth = startMonth;
  endMonth = endMonth;
  timeRangeStart = timeRangeStart;
  timeRangeEnd = timeRangeEnd;

  const chartStore = useChartStore();
  const dataStore = useWeatherdataStore();
  const weatherData: any = dataStore.currentData;

  if (years !== years) chartStore.wdtData = [];

  weatherData.forEach((element: any) => {
    for (let i = (element.Year - yearStart + 1); i <= years; i++) {

      if (current_day === Number(element.Day)) {
        if (
          Number(element.Hour) >= timeRangeStart &&
          Number(element.Hour) <= timeRangeEnd
        ) evaluateHour(asset, element, timeRangeStart, timeRangeEnd);
      } else {
        evaluateDay();
        current_day = Number(element.Day);
      }

      if (
        current_month != Number(element.Month) ||
        (Number(element.Month) === 12 &&
          Number(element.Day) === 31 &&
          Number(element.Hour) === timeRangeEnd)
      ) {
        months = evaluateMonth(
          months,
          days,
          current_month,
          startMonth,
          endMonth
        );
        days = [];
        current_month = Number(element.Month);
      }
    }
  });

  for (let i = 0; i < 12; i++) {
    if (years !== 1) months[i] = months[i] / years;
  }
  const name = asset.name;
  chartStore.wdtData[name] = months;
  months = [];
}

function evaluateHour(asset: any, element: any, timeRangeStart: number, timeRangeEnd: number) {
  if (element.Hour >= timeRangeStart && element.Hour <= timeRangeEnd) {
    if (asset.category === "Vessel") {
      hours.push(
        (parseFloat(element["Wave height"]) < asset.hs) ? 1 : 0
      );
    } else if (asset.category === "Helicopter") {
      hours.push(
        (parseFloat(element["Wind speed"]) < asset.windSpeedLimit) ? 1 : 0
      );
    }
  }
}

function evaluateDay() {
  days.push(
    hours.filter((num) => num === 1).length / hours.length >=
      threshold
      ? 1 : 0
  );
  hours = [];
}

// month - 1 because values of month range from 1 to 12, but array indices from 0 to 11
// changing this causes the first column in the chart to be empty
function evaluateMonth(
  months: number[],
  days: number[],
  month: number,
  startMonth: number,
  endMonth: number
): number[] {
  if (month >= startMonth && month <= endMonth) {
    if (months[month - 1] != null) months[month - 1] += days.filter((num) => num === 1).length;
    else months[month - 1] = days.filter((num) => num === 1).length;
  }
  return months;
}