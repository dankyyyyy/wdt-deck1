/* ==============
    Workability
=============== */

function unavailableDays(annualWorkability: number[], startMonth: number, endMonth: number): number {
    var unavailableDays = 0;
    console.log(`${startMonth}, ${endMonth}`);
    for (let i = startMonth; i < endMonth; i++) {
        unavailableDays += annualWorkability[i];
    }
    return Math.round(unavailableDays);
}

function unavailableDaysFromPercentage(annualWorkability: number): number {
    const unavailableDays = 365 * annualWorkability;
    return unavailableDays;
}

function availableDays(annualWorkability: number[], startMonth: number, endMonth: number): number {
    const availableDays = Math.floor(365 - unavailableDays(annualWorkability, startMonth, endMonth));
    return availableDays;
}

function availableDaysFromPercentage(annualWorkability: number): number {
    const availableDays = 365 * annualWorkability;
    return availableDays;
}

export function monthlyWorkabilityPerAsset(annualWorkability: number[]): number[] {
    const monthlyWorkability: number[] = [];
    for (let i = 0; i < annualWorkability.length; i++) {
        monthlyWorkability[i] = Math.floor(((30 - annualWorkability[i]) / 30) * 100);
    }
    return monthlyWorkability;
}

export function yearlyWorkabilityPerAsset(annualWorkability: number[], startMonth: number, endMonth: number): number {
    const annualAvailability = availableDays(annualWorkability, startMonth, endMonth);
    const workability = Math.floor((annualAvailability / 365) * 100) / 100;
    return workability;
}

/* ===========================
   Available & Required Hours
=========================== */

export function annualDeployableHours(team: any, annualWorkability: number): number {
    const dailyHoursPerTeam = team.numberOfPersons * team.shiftPeriod;
    const annualAvailability = availableDaysFromPercentage(annualWorkability);
    const annualDeployableHours = dailyHoursPerTeam * annualAvailability;
    return annualDeployableHours;
}

export function annualLostAvailableHours(team: any, annualWorkability: number): number { // available hours lost due to wdt
    const dailyHoursPerTeam = team.numberOfPersons * team.shiftPeriod;
    const annualUnavailableDays = unavailableDaysFromPercentage(annualWorkability);
    const annualLostAvailableHours = dailyHoursPerTeam * annualUnavailableDays;
    return annualLostAvailableHours;
}

export function annualTotalRequiredHours(wtg: any, location: any): number {
    const amountOfWTG = location.wtg;
    const plannedMaintenance = wtg.plannedMaintenance;
    const troubleshooting = wtg.troubleshootVisits * wtg.averageTsHours;
    const requiredHoursPerWtg = plannedMaintenance + troubleshooting;
    const annualTotalRequiredHours = amountOfWTG * requiredHoursPerWtg;
    return annualTotalRequiredHours;
}

export function annualTotalHoursDifference(team: any, annualWorkability: number, location: any, wtg: any): number {
    const availableHours = annualDeployableHours(team, annualWorkability);
    const requiredHours = annualTotalRequiredHours(wtg, location);
    const totalDifference = availableHours - requiredHours;
    return totalDifference;
}

export function availablePerRequiredInPercent(wtg: any, team: any, location: any, annualWorkability: number): number {
    const availableHours = annualDeployableHours(team, annualWorkability);
    const requiredHours = annualTotalRequiredHours(wtg, location);
    const availablePerRequired = Math.floor((availableHours / requiredHours) * 100);
    return availablePerRequired;
}

/* ==============================
    Downtime Fuel Totals & Costs
============================== */

export function annualCharterCostsWdt(asset: any, annualWorkability: number): number {
    const dayRate = asset.dayRate;
    const weatherDownTime = unavailableDaysFromPercentage(annualWorkability);
    const annualCharterCost = Math.round(dayRate * weatherDownTime);
    return annualCharterCost;
}

export function dailyFuel(asset: any): number {
    var totalDailyFuel = 0;
    if (asset.category === 'Vessel') {
        const totalLoitering = asset.loitering * asset.loiteringFuelConsumption;
        const totalOperational = asset.highEngineActivity * asset.operationalFuelConsumption;
        totalDailyFuel = totalLoitering + totalOperational;
    } else if (asset.category === 'Helicopter') {
        totalDailyFuel = asset.operationalFuelConsumption * asset.flightTime;
    }
    return totalDailyFuel;
}

export function annualFuelWdt(asset: any, annualWorkability: number): number {
    const fuelPerDay = dailyFuel(asset);
    const annualUnavailableDays = unavailableDaysFromPercentage(annualWorkability);
    const annualFuelWdt = fuelPerDay * annualUnavailableDays;
    return annualFuelWdt;
}

export function annualFuelCost(asset: any, annualWorkability: number): number {
    const fuelCost = Math.round(annualFuelWdt(asset, annualWorkability));
    return fuelCost;
}

/* =======================
   Downtime Salary Costs
======================= */

export function downtimeSalaryCost(team: any, annualWorkability: number): number {
    const salary = 1500; //€
    const wdt = unavailableDaysFromPercentage(annualWorkability);
    const teamSize = team.numberOfPersons; //amount of people
    const downtimeSalary = Math.round(salary * wdt * teamSize);
    return downtimeSalary;
}

/* ===================
   CO2 Tax (WDT only)
=================== */

export function annualCarbonOutput(asset: any, annualWorkability: number): number {
    var conversionDecimal = 0;
    if (asset.category === 'Vessel') {
        conversionDecimal = 0.00273; //divide by 1000, multiply by 2.73 [conversion rate for diesel]
    } else if (asset.category === 'Helicopter') {
        conversionDecimal = 0.00255; //divide by 1000, multiply by 2.55 [conversion rate for kerosene]
    }
    const usedFuel = annualFuelWdt(asset, annualWorkability);
    const carbonEmissions = conversionDecimal * usedFuel;
    return carbonEmissions;
}

export function annualCarbonTax(asset: any, annualWorkability: number): number {
    const carbonTaxPerTon = 42; //€; tax for the Netherlands
    const carbonEmitted = annualCarbonOutput(asset, annualWorkability);
    const annualCarbonTax = Math.round(carbonTaxPerTon * carbonEmitted);
    return annualCarbonTax;
}

/* ======================
   Indirect Annual Cost
=======================*/

export function totalAnnualCost(asset: any, team: any, annualWorkability: number): number {
    const totalCost = Math.round(annualFuelCost(asset, annualWorkability) + annualCharterCostsWdt(asset, annualWorkability)
        + annualCarbonTax(asset, annualWorkability) + downtimeSalaryCost(team, annualWorkability));
    return totalCost;
}

/* ===================
   Direct Annual Cost
=====================*/

export function directFuelCost(asset: any) {
    const fuelPerDay = dailyFuel(asset);
    const costPerLiter = 0.75;
    const directFuelCost = (fuelPerDay * 365) * costPerLiter;
    return directFuelCost;
}

export function directCharterCost(asset: any) {
    const dayRate = asset.dayRate;
    const directCharterCost = dayRate * 365;
    return directCharterCost;
}

export function directCarbonOutput(asset: any): number {
    var conversionDecimal = 0;
    if (asset.category === 'Vessel') {
        conversionDecimal = 0.00273; //divide by 1000, multiply by 2.73 [conversion rate for diesel]
    } else if (asset.category === 'Helicopter') {
        conversionDecimal = 0.00255; //divide by 1000, multiply by 2.55 [conversion rate for kerosene]
    }
    const usedFuel = dailyFuel(asset) * 365;
    const carbonEmissions = conversionDecimal * usedFuel;
    return carbonEmissions;
}

export function directCarbontax(asset: any): number {
    const carbonTaxPerTon = 42; //€; tax for the Netherlands
    const carbonEmitted = directCarbonOutput(asset) * 365;
    const annualCarbonTax = carbonTaxPerTon * carbonEmitted;
    return annualCarbonTax;
}

export function directAnnualCost(asset: any): number {
    const directCost = directFuelCost(asset) + directCarbontax(asset) + directCharterCost(asset);
    return directCost;
}

/* ===============
    Costs per WTG
================ */

export function wdtCostsPerWtg(asset: any, team: any, location: any, annualWorkability: number): number { // cell H41 in excel
    const totalCostWdt = totalAnnualCost(asset, team, annualWorkability);
    const amountOfWTG = location.wtg;
    const wdtCostsPerWtg = totalCostWdt / amountOfWTG;
    return wdtCostsPerWtg;
}

/* ============================
   Costs per Required Workhour
============================ */

export function directCostPerWorkHour(asset: any, team: any, annualWorkability: number): number {
    const directCost = directAnnualCost(asset);
    const deployableHours = annualDeployableHours(team, annualWorkability);
    const directCostPerWorkHour = directCost / deployableHours;
    return directCostPerWorkHour;
}

export function directCostPerRequiredWorkHour(asset: any, wtg: any, location: any): number { // cell H55 in excel
    const directCost = directAnnualCost(asset);
    const requiredHours = annualTotalRequiredHours(wtg, location);
    const directCostPerRequiredWorkHour = directCost / requiredHours;
    return directCostPerRequiredWorkHour;
}