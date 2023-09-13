import { useWeatherStore } from "@/stores/WeatherStore";

const wdtStore = useWeatherStore()

function unavailableDays(asset: any, monthsAsset: number[]): number {
    var unavailableDays = 0;
    const name = asset ? asset.name : "Site";
    wdtStore.assetsWdt[name] = monthsAsset;

    for (let i = 0; i < monthsAsset.length; i++) {
        unavailableDays += monthsAsset[i];
    }

    return Math.round(unavailableDays);
}

function availableDays(asset: any, monthsAsset: number[]): number {
    const availableDays = Math.round(365 - unavailableDays(asset, monthsAsset));
    return availableDays;
}

export function workabilityPerAsset(asset: any, monthsAsset: number[]): number {
    const annualAvailability = availableDays(asset, monthsAsset);
    const workability = Math.round((annualAvailability / 365) * 100);
    return workability;
}

export function annualTotalAvailableHours(asset: any, team: any, monthsAsset: number[]): number {
    const dailyHoursPerTeam = team.numberofPersons * team.shiftPeriod;
    const annualAvailability = (availableDays(asset, monthsAsset) * 24);
    const annualTotalAvailableHours = dailyHoursPerTeam * annualAvailability;

    return annualTotalAvailableHours;
}

export function annualTotalRequiredHours(asset: any, location: any): number {
    const amountofWTG = location.wtg;
    const plannedMaintenance = asset.plannedMaintenance;
    const troubleshooting = asset.troubleshootVisits * asset.averageTsHours;
    const requiredHoursPerWtg = plannedMaintenance + troubleshooting;
    const annualTotalRequiredHours = amountofWTG * requiredHoursPerWtg;

    return annualTotalRequiredHours;
}

export function availablePerRequiredInPercent(asset: any, team: any, location: any, monthsAsset: number[]): number {
    const availableHours = annualTotalAvailableHours(asset, team, monthsAsset);
    const requiredHours = annualTotalRequiredHours(asset, location);
    const availablePerRequired = Math.round((availableHours / requiredHours) * 100)
    return availablePerRequired;
}









