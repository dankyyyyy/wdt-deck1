/* ==============
    Workability
=============== */

function unavailableDays(annualWorkability: number[], startMonth: number, endMonth: number): number {
    var unavailableDays = 0;
    for (let i = startMonth; i < endMonth; i++) {
        unavailableDays += annualWorkability[i];
    }
    return unavailableDays;
}

function availableDays(annualWorkability: number[], startMonth: number, endMonth: number): number {
    const amountOfMonths = Math.abs(startMonth - endMonth) + 1;
    const availableDays = (amountOfMonths * 30) - unavailableDays(annualWorkability, startMonth, endMonth);
    return availableDays;
}

function unavailableDaysFromPercentage(annualWorkability: number, startMonth: number, endMonth: number): number {
    const amountOfMonths = Math.abs(startMonth - endMonth) + 1;
    const unavailableDays = (365 - (amountOfMonths * 30) * annualWorkability);
    return unavailableDays;
}

function availableDaysFromPercentage(annualWorkability: number, startMonth: number, endMonth: number): number {
    var amountOfMonths = Math.abs(startMonth - endMonth) + 1;
    const availableDays = (amountOfMonths * 30) * annualWorkability;
    return availableDays;
}

export function monthlyWorkabilityPerAsset(annualWorkability: number[], startMonth: number, endMonth: number): number[] {
    const monthlyWorkability: number[] = [];
    for (let i = startMonth - 1; i < endMonth; i++) {
        monthlyWorkability[i] = Math.floor(((30 - annualWorkability[i]) / 30) * 100);
    }
    return monthlyWorkability;
}

export function yearlyWorkabilityPerAsset(annualWorkability: number[], startMonth: number, endMonth: number): number {
    var amountOfMonths = Math.abs(startMonth - endMonth) + 1;
    const annualAvailability = availableDays(annualWorkability, startMonth, endMonth);
    const workability = Math.floor((annualAvailability / (amountOfMonths * 30)) * 100) / 100;
    return workability;
}

/* ===========================
   Available & Required Hours
=========================== */

export function annualDeployableHours(team: any, annualWorkability: number, startMonth: number, endMonth: number): number {
    const dailyHoursPerTeam = team.numberOfPersons * team.shiftPeriod;
    const annualAvailability = availableDaysFromPercentage(annualWorkability, startMonth, endMonth);
    const annualDeployableHours = dailyHoursPerTeam * annualAvailability;
    return Math.floor(annualDeployableHours);
}

export function annualLostAvailableHours(team: any, annualWorkability: number, startMonth: number, endMonth: number): number { // available hours lost due to wdt
    const dailyHoursPerTeam = team.numberOfPersons * team.shiftPeriod;
    const annualUnavailableDays = unavailableDaysFromPercentage(annualWorkability, startMonth, endMonth);
    const annualLostAvailableHours = dailyHoursPerTeam * annualUnavailableDays;
    return Math.ceil(annualLostAvailableHours);
}

export function annualTotalRequiredHours(wtg: any, location: any): number {
    const amountOfWTG = location.wtg;
    const plannedMaintenance = wtg.plannedMaintenance;
    const troubleshooting = wtg.troubleshootVisits * wtg.averageTsHours;
    const requiredHoursPerWtg = plannedMaintenance + troubleshooting;
    const annualTotalRequiredHours = amountOfWTG * requiredHoursPerWtg;
    return annualTotalRequiredHours;
}

export function annualTotalHoursDifference(team: any, annualWorkability: number, location: any, wtg: any, startMonth: number, endMonth: number): number {
    const availableHours = annualDeployableHours(team, annualWorkability, startMonth, endMonth);
    const requiredHours = annualTotalRequiredHours(wtg, location);
    const totalDifference = availableHours - requiredHours;
    return Math.floor(totalDifference);
}

export function availablePerRequiredInPercent(wtg: any, team: any, location: any, annualWorkability: number, startMonth: number, endMonth: number): number {
    const availableHours = annualDeployableHours(team, annualWorkability, startMonth, endMonth);
    const requiredHours = annualTotalRequiredHours(wtg, location);
    const availablePerRequired = Math.floor((availableHours / requiredHours) * 100);
    return availablePerRequired;
}

/* ======================
   Complete Annual Cost
=======================*/

export function yearlyCommitment(asset: any, annualWorkability: number, startMonth: number, endMonth: number): number {
    const totalCost = directAnnualCost(asset, annualWorkability, startMonth, endMonth) + annualDayRate(asset);
    return totalCost;
}

/* ======================
   Indirect Annual Cost
=======================*/

export function wdtAnnualCost(asset: any, team: any, annualWorkability: number, startMonth: number, endMonth: number): number {
    const wdtCost = annualCharterLoss(asset, annualWorkability, startMonth, endMonth) + downtimeSalaryCost(team, annualWorkability, startMonth, endMonth);
    return wdtCost;
}

export function annualCharterLoss(asset: any, annualWorkability: number, startMonth: number, endMonth: number): number {
    const dayRate = asset.dayRate;
    const weatherDownTime = unavailableDaysFromPercentage(annualWorkability, startMonth, endMonth);
    const annualCharterCost = Math.round(dayRate * weatherDownTime);
    return annualCharterCost;
}

export function downtimeSalaryCost(team: any, annualWorkability: number, startMonth: number, endMonth: number): number {
    const salary = 1500; //€
    const wdt = unavailableDaysFromPercentage(annualWorkability, startMonth, endMonth);
    const teamSize = team.numberOfPersons; //amount of people
    const downtimeSalary = Math.round(salary * wdt * teamSize);
    return downtimeSalary;
}

/* ===================
   Direct Annual Cost
=====================*/

export function directAnnualCost(asset: any, annualAvailability: number, startMonth: number, endMonth: number): number {
    const directCost = fuelCost(asset, annualAvailability, startMonth, endMonth) + carbonTax(asset, annualAvailability, startMonth, endMonth);
    return directCost;
}

export function annualDayRate(asset: any) {
    const totalDayRate = asset.dayRate * 365;
    return totalDayRate;
}

function dailyFuel(asset: any): number {
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

export function fuelCost(asset: any, annualAvailability: number, startMonth: number, endMonth: number) {
    const fuelPerDay = dailyFuel(asset);
    const costPerLiter = 0.75;
    const availableDays = availableDaysFromPercentage(annualAvailability, startMonth, endMonth);
    const directFuelCost = ((fuelPerDay) * availableDays) * costPerLiter;
    return directFuelCost;
}

export function charterCost(asset: any, annualAvailability: number, startMonth: number, endMonth: number) {
    const dayRate = asset.dayRate;
    const availableDays = availableDaysFromPercentage(annualAvailability, startMonth, endMonth);
    const directCharterCost = dayRate * availableDays;
    return directCharterCost;
}

function carbonOutput(asset: any, annualAvailability: number, startMonth: number, endMonth: number): number {
    var conversionDecimal = 0;
    if (asset.category === 'Vessel') {
        conversionDecimal = 0.00273; //divide by 1000, multiply by 2.73 [conversion rate for diesel]
    } else if (asset.category === 'Helicopter') {
        conversionDecimal = 0.00255; //divide by 1000, multiply by 2.55 [conversion rate for kerosene]
    }
    const availableDays = availableDaysFromPercentage(annualAvailability, startMonth, endMonth)
    const usedFuel = dailyFuel(asset) * availableDays;
    const carbonEmissions = conversionDecimal * usedFuel;
    return carbonEmissions;
}

export function carbonTax(asset: any, annualAvailability: number, startMonth: number, endMonth: number): number {
    const carbonTaxPerTon = 42; //€; tax for the Netherlands
    const carbonEmitted = carbonOutput(asset, annualAvailability, startMonth, endMonth);
    const annualCarbonTax = carbonTaxPerTon * carbonEmitted;
    return annualCarbonTax;
}

/* ===============
    Costs per WTG
================ */

export function totalPerWtg(asset: any, team: any, location: any, annualWorkability: number, startMonth: number, endMonth: number): number {
    const totalCostWdt = fuelPerWtg(asset, location, annualWorkability, startMonth, endMonth) 
                         + CO2PerWtg(asset, location, annualWorkability, startMonth, endMonth)
                         + wdtPerWtg(asset, team, location, annualWorkability, startMonth, endMonth);
    // const amountOfWTG = location.wtg;
    // const totalPerWtg = totalCostWdt / amountOfWTG;
    return totalCostWdt;
}

export function fuelPerWtg(asset: any, location: any, annualWorkability: number, startMonth: number, endMonth: number): number {
    const yearlyFuelCost = fuelCost(asset, annualWorkability, startMonth, endMonth);
    const amountOfWTG = location.wtg;
    const fuelPerWtg = yearlyFuelCost / amountOfWTG;
    return fuelPerWtg;
}

export function CO2PerWtg(asset: any, location: any, annualWorkability: number, startMonth: number, endMonth: number): number {
    const yearlyCarbonTax = carbonTax(asset, annualWorkability, startMonth, endMonth);
    const amountOfWTG = location.wtg;
    const CO2PerWtg = yearlyCarbonTax / amountOfWTG;
    return CO2PerWtg;
}

export function wdtPerWtg(asset: any, team: any, location: any, annualWorkability: number, startMonth: number, endMonth: number): number {
    const annualWdtCost = wdtAnnualCost(asset, team, annualWorkability, startMonth, endMonth);
    const amountOfWTG = location.wtg;
    const wdtPerWTG = annualWdtCost / amountOfWTG;
    return wdtPerWTG;
}



/* ============================
   Costs per Required Workhour
============================ */

export function directCostPerWorkHour(asset: any, team: any, annualWorkability: number, startMonth: number, endMonth: number): number {
    const directCost = directAnnualCost(asset, annualWorkability, startMonth, endMonth);
    const deployableHours = annualDeployableHours(team, annualWorkability, startMonth, endMonth);
    const directCostPerWorkHour = directCost / deployableHours;
    return directCostPerWorkHour;
}

export function directCostPerRequiredWorkHour(asset: any, wtg: any, location: any, annualWorkability: number, startMonth: number, endMonth: number): number { // cell H55 in excel
    const directCost = yearlyCommitment(asset, annualWorkability, startMonth, endMonth);
    const requiredHours = annualTotalRequiredHours(wtg, location);
    const directCostPerRequiredWorkHour = directCost / requiredHours;
    return directCostPerRequiredWorkHour;
}