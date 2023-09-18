import { useWeatherdataStore } from "@/stores/WeatherdataStore";
import { useWeatherStore } from "@/stores/WeatherStore";
import "@/utils/wgtCalc";

// CONFIG LIMITS
// placeholder for location limit
// wind speed limit - m*s^-1
const conf_site_limit: number = 18;

// CONFIG THRESHOLDS - percentage of a day that can be no-fly
// determines availability (50%+ => available)
const threshold: number = 0.5;

//hours
let hoursAsset: Number[] = []

//days
let daysAsset: number[] = []

//months
let monthsAsset: number[] = []

let current_day: number;
let current_month: number;
let amountOfYears: number;

export function start(
  // filter variables
  timeRangeStart: number,
  timeRangeEnd: number,
  startMonth: number,
  endMonth: number,
  years: number,
  asset: any,
) {

  const wdtStore = useWeatherStore()
  const dataStore = useWeatherdataStore();
  
  // filters initialized
  startMonth = startMonth;
  endMonth = endMonth;
  current_day = 1;
  current_month = 1;
  amountOfYears = 0;
  monthsAsset = [];

  const weatherData: any = dataStore.currentData;
  
  countYears(weatherData);
  
  weatherData.forEach((element: any) => {
    if (element.Year >= amountOfYears - years + 1) {
      if (current_day === Number(element.Day)) {
        if (
          Number(element.Hour) >= timeRangeStart &&
          Number(element.Hour) <= timeRangeEnd
        ) {
          //evaluate hour wdt
          evaluateHourDay(asset, element, false);
        }
      } else {
        //evaluate day wdt
        evaluateHourDay(asset, element, true);

        //without this part, one hour is skipped
        if (
          Number(element.Hour) >= timeRangeStart &&
          Number(element.Hour) <= timeRangeEnd
        ) {
          evaluateHourDay(asset, element, false);
        }

        //increment current day
        current_day = Number(element.Day);
      }
      //if month changes -> evaluate
      if (
        current_month != Number(element.Month) ||
        (Number(element.Month) === 12 &&
          Number(element.Day) === 31 &&
          Number(element.Hour) === timeRangeEnd)
      ) {
        monthsAsset = evaluateMonth(
          monthsAsset,
          daysAsset,
          current_month,
          startMonth,
          endMonth
        );

        //clear days arrays
        daysAsset = [];
        //increment current month
        current_month = Number(element.Month);
      }
    }
  });

  for (let i = 0; i < 12; i++) {
    monthsAsset[i] = monthsAsset[i] / years;
  }

  const name = asset ? asset.name : "Site";
  // access asset
  wdtStore.assetsWdt[name] = monthsAsset;
  console.log(name,": ", monthsAsset);
  // console.log(workabilityPerAsset(asset, monthsAsset), "% ");
  /*
  console.log(annualTotalAvailableHours(asset, team, monthsAsset), " hours");
  console.log(annualTotalRequiredHours(asset, location), "hours");
  console.log(availablePerRequiredInPercent(asset, team, location, monthsAsset), "%");
  */
}

function evaluateHourDay(asset: any, element: any, newDay: boolean) {
  if (!newDay) {
    if (asset) { //If it's an asset, not the site itself
      if (asset.category === "Vessel") {
        hoursAsset.push(
        parseFloat(element.Sign[" wave height (Hs)"]) > asset.hs ? 1 : 0
      );
      } else if (asset.category === "Helicopter") {
        hoursAsset.push(
        parseFloat(element.Visibility) < asset.visibility ||
        Number(element["VFR cloud"]) === asset.cloudbase
        ? 1 : 0
        );
      } else if (asset.category === "WindTurbineGenerator") {
        hoursAsset.push(parseFloat(element["Wind speed"]) > asset.windSpeedLimit ? 1 : 0);
        } 
    } else {
      // 1 = WDT, 0 = !WDT
      hoursAsset.push(parseFloat(element["Wind speed"]) > conf_site_limit ? 1 : 0);
    }
    
  } else { //if it's the site we're evaluating
    daysAsset.push(
      hoursAsset.filter((num) => num === 1).length / hoursAsset.length >=
        threshold
        ? 1 : 0
    );
    
    //reset hours arrays
    hoursAsset = [];
  }
}

function evaluateMonth(
  monthArr: number[],
  dayArr: number[],
  month: number,
  startMonth: number,
  endMonth: number
): number[] {
  if (month >= startMonth && month <= endMonth) {
    if (monthArr[month - 1] != null) {
      monthArr[month - 1] += dayArr.filter((num) => num === 1).length;
    } //amountOfYears+1 because it starts from 0
    else {
      monthArr[month - 1] = dayArr.filter((num) => num === 1).length;
    }
  }
  return monthArr;
}

// shows available data in db
function countYears(weatherData: any) {
  let maxYear = 0;
  for (const item of weatherData) {
    if (item.Year > maxYear) {
      maxYear = item.Year;
    }
  }
  amountOfYears = maxYear;

  return amountOfYears
}