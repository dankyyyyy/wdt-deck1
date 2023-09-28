/* ==============
    Workability
=============== */

function unavailableDays(annualWorkability: number[]): number {
    var unavailableDays = 0;
    for (let i = 0; i < annualWorkability.length; i++) {
        unavailableDays += annualWorkability[i];
    }
    return Math.round(unavailableDays);
}

function availableDays(annualWorkability: number[]): number {
    const availableDays = Math.floor(365 - unavailableDays(annualWorkability));
    return availableDays;
}

export function monthlyWorkabilityPerAsset(annualWorkability: number[]): number[] {
    const monthlyWorkability: number[] = [];
    for (let i = 0; i < annualWorkability.length; i++) {
        monthlyWorkability[i] = Math.floor(((30 - annualWorkability[i]) / 30 ) * 100);
    }
    return monthlyWorkability;
}

export function yearlyWorkabilityPerAsset(annualWorkability: number[]): number {
    const annualAvailability = availableDays(annualWorkability);
    const workability = Math.floor((annualAvailability / 365) * 100) / 100;
    return workability;
}

/* ===========================
   Available & Required Hours
=========================== */

export function annualTotalAvailableHours(team: any, annualWorkability: number[]): number {
    const dailyHoursPerTeam = team.numberOfPersons * team.shiftPeriod;
    const annualAvailability = availableDays(annualWorkability);
    const annualTotalAvailableHours = dailyHoursPerTeam * annualAvailability;
    return annualTotalAvailableHours;
}

export function annualTotalRequiredHours(wtg: any, location: any): number {
    const amountOfWTG = location.wtg;
    const plannedMaintenance = wtg.plannedMaintenance;
    const troubleshooting = wtg.troubleshootVisits * wtg.averageTsHours;
    const requiredHoursPerWtg = plannedMaintenance + troubleshooting;
    const annualTotalRequiredHours = amountOfWTG * requiredHoursPerWtg;
    return annualTotalRequiredHours;
}

export function availablePerRequiredInPercent(wtg: any, team: any, location: any, annualWorkability: number[]): number {
    const availableHours = annualTotalAvailableHours(team, annualWorkability);
    const requiredHours = annualTotalRequiredHours(wtg, location);
    const availablePerRequired = Math.floor((availableHours / requiredHours) * 100);
    return availablePerRequired;
}

/* =====================
    Fuel Totals & Costs
===================== */

export function annualCostPerAssetWithoutFuel(asset: any): number {
    const dayRate = asset.dayRate;
    const annualCost = dayRate * 365;
    return annualCost;
}

export function totalDailyFuelVessel(asset: any): number {
    const totalLoitering = asset.loitering * asset.loiteringFuelConsumption;
    const totalOperational = asset.highEngineActivity * asset.operationalFuelConsumption;
    const totalDailyFuel = totalLoitering + totalOperational;
    return totalDailyFuel;
}

export function totalDailyFuelHelicopter(asset: any): number {
    const totalDailyFuel = asset.operationalFuelConsumption * asset.flightTime;
    return totalDailyFuel;
}

export function totalAnnualFuelVessel(asset: any, annualWorkability: number): number {
    const totalFuel = totalDailyFuelVessel(asset) * Math.floor(annualWorkability * 365);
    return totalFuel;
}

export function totalAnnualFuelHelicopter(asset: any, annualWorkability: number): number {
    const totalFuel = totalDailyFuelHelicopter(asset) * Math.floor(annualWorkability * 365);
    return totalFuel;
}

export function totalAnnualFuelCostVessel(asset: any, annualWorkability: number): number {
    const totalFuelCost = totalAnnualFuelVessel(asset, annualWorkability) * 0.75;
    return totalFuelCost;
}

export function totalAnnualFuelCostHelicopter(asset: any, annualWorkability: number): number {
    const totalFuelCost = totalAnnualFuelHelicopter(asset, annualWorkability) * 0.75;
    return totalFuelCost;
}

/* =======================
   Downtime Salary Costs
======================= */

export function downtimeSalaryCost(team: any, annualWorkability: number[]): number {
    const salary = 1500; //€
    const wdt = unavailableDays(annualWorkability);
    const teamSize = team.teamSize; //amount of people
    const downtimeSalary = salary * wdt * teamSize;
    return downtimeSalary;
}

/* ===========
   CO2 Tax
=========== */

export function helicopterCarbonOutput(asset: any, annualWorkability: number): number {
    const conversionDecimal = 0.00255; //divide by 1000, multiply by 2.55 [conversion rate for kerosene]
    const usedFuel = totalAnnualFuelHelicopter(asset, annualWorkability);
    const carbonEmmissions = conversionDecimal * usedFuel;
    return carbonEmmissions;
}

export function vesselCarbonOutput(asset: any, annualWorkability: number): number {
    const conversionDecimal = 0.00273; //divide by 1000, multiply by 2.73 [conversion rate for diesel]
    const usedFuel = totalAnnualFuelVessel(asset, annualWorkability); 
    const carbonEmmissions = conversionDecimal * usedFuel;
    return carbonEmmissions;
}

export function helicopterCarbonTaxCost(asset: any, annualWorkability: number): number {
    const carbonTaxPerTon = 42; //€; tax for the Netherlands
    const carbonEmitted = helicopterCarbonOutput(asset, annualWorkability);
    const annualCarbonTax = carbonTaxPerTon * carbonEmitted;
    return annualCarbonTax;
}

export function vesselCarbonTaxCost(asset: any, annualWorkability: number): number {
    const carbonTaxPerTon = 42; //€; tax for the Netherlands
    const carbonEmitted = vesselCarbonOutput(asset, annualWorkability);
    const annualCarbonTax = carbonTaxPerTon * carbonEmitted;
    return annualCarbonTax;
}

/* =============
   Total Costs
============= */

export function totalAnnualCostVessel(asset: any, annualWorkability: number): number {
    const totalCost = totalAnnualFuelCostVessel(asset, annualWorkability) + annualCostPerAssetWithoutFuel(asset);
    return totalCost;
}

export function totalAnnualCostHelicopter(asset: any, annualWorkability: number): number {
    const totalCost = totalAnnualFuelCostHelicopter(asset, annualWorkability) + annualCostPerAssetWithoutFuel(asset);
    return totalCost;
}