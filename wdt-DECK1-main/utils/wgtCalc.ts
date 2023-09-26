import { useWeatherStore } from "@/stores/WeatherStore";

const wdtStore = useWeatherStore()



function unavailableDays(asset: any, monthsAsset: number[]): number {
    var unavailableDays = 0;
    const name = asset.name;
    wdtStore.assetsWdt[name] = monthsAsset;

    for (let i = 0; i < monthsAsset.length; i++) {
        unavailableDays += monthsAsset[i];
    }

    return Math.round(unavailableDays);
}

function availableDays(asset: any, monthsAsset: number[]): number {
    const availableDays = Math.floor(365 - unavailableDays(asset, monthsAsset));
    return availableDays;
}

export function monthlyWorkabilityPerAsset(monthsAsset: number[]): number[] {
    const monthlyWorkability: number[] = [];

    for (let i = 0; i < monthsAsset.length; i++) {
        monthlyWorkability[i] = Math.floor(((30 - monthsAsset[i]) / 30 ) * 100);
    }
    return monthlyWorkability;
}

export function workabilityPerAsset(asset: any, monthsAsset: number[]): number {
    const annualAvailability = availableDays(asset, monthsAsset);
    const workability = Math.floor((annualAvailability / 365) * 100);
    
    return workability;
}

export function annualTotalAvailableHours(asset: any, team: any, monthsAsset: number[]): number {
    const dailyHoursPerTeam = team.numberOfPersons * team.shiftPeriod;
    const annualAvailability = (availableDays(asset, monthsAsset) * 24);
    const annualTotalAvailableHours = dailyHoursPerTeam * annualAvailability;

    return annualTotalAvailableHours;
}

export function annualTotalRequiredHours(asset: any, location: any): number {
    const amountOfWTG = location.wtg;
    const plannedMaintenance = asset.plannedMaintenance;
    const troubleshooting = asset.troubleshootVisits * asset.averageTsHours;
    const requiredHoursPerWtg = plannedMaintenance + troubleshooting;
    const annualTotalRequiredHours = amountOfWTG * requiredHoursPerWtg;

    return annualTotalRequiredHours;
}

export function availablePerRequiredInPercent(asset: any, team: any, location: any, monthsAsset: number[]): number {
    const availableHours = annualTotalAvailableHours(asset, team, monthsAsset);
    const requiredHours = annualTotalRequiredHours(asset, location);
    const availablePerRequired = Math.floor((availableHours / requiredHours) * 100);
    
    return availablePerRequired;
}

export function annualCostPerAssetWithoutFuel(asset: any): number {
    const dayRate = asset.dayRate;
    const annualCost = dayRate * 365;
    return annualCost;
}

export function totalDailyFuelVessel(asset: any): number {
    const totalLoitering = asset.loitering * asset.loiteringFuelConsumption;
    const totalOperational = asset.highEngineActivity * asset.operationalFuelConsumption;
    const totalFuel = totalLoitering + totalOperational;
    
    return totalFuel;
}

export function totalDailyFuelHelicopter(asset: any): number {
    const totalFuel = asset.operationalFuelConsumption * asset.flightTime;
    return totalFuel;
}







