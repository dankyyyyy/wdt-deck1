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
let current_year: number = 1;

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

  hours = [];
  days = [];
  months = [];

  weatherData.forEach((element: any) => {
    for (let i = (element.Year - yearStart + 1); i <= years; i++) {
      if (current_year != Number(element.Year)) {
        months = [];
        current_year = Number(element.Year);
      }

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
        chartStore.wdtData[`${asset.name}${i}`] = months;
        days = [];
        current_month = Number(element.Month);
      }
    }
  });
  calculateAverage(asset, years);

  function evaluateHour(asset: any, element: any, timeRangeStart: number, timeRangeEnd: number) {
    if (element.Hour >= timeRangeStart && element.Hour <= timeRangeEnd) {
      hours.push(
        ((parseFloat(element["Wind speed"]) < asset.windSpeedLimit) && (parseFloat(element["Wave height"]) < asset.hs)) ? 1 : 0
      );
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
}

function calculateAverage(this: any, asset: any, years: number) {
  const chartStore = useChartStore();
  let sumMonths: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 1; i <= years; i++) {
    console.log(`Year ${i}: ${chartStore.wdtData[`${asset.name}${i}`]}`);
    for (let j = 0; j < 12; j++) {
      sumMonths[j] += chartStore.wdtData[`${asset.name}${i}`].at(j);
    }
  }
  console.log(sumMonths);

  let average = [];
  for (let i = 0; i < 12; i++) {
    average[i] = Math.floor(sumMonths[i] / years);
  }

  if (average[1] > 28) average[1] = 28;

  console.log(average);
  chartStore.wdtData[asset.name] = average;
}