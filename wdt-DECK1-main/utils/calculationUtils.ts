
/*************************
 * 
 *      Workability
 * 
 */

function unavailableDays(monthsAsset: number[]): number {
    var unavailableDays = 0;

    for (let i = 0; i < monthsAsset.length; i++) {
        unavailableDays += monthsAsset[i];
    }

    return Math.round(unavailableDays);
}

function availableDays(monthsAsset: number[]): number {
    const availableDays = Math.floor(365 - unavailableDays(monthsAsset));
    return availableDays;
}

export function monthlyWorkabilityPerAsset(monthsAsset: number[]): number[] {
    const monthlyWorkability: number[] = [];
    for (let i = 0; i < monthsAsset.length; i++) {
        monthlyWorkability[i] = Math.floor(((30 - monthsAsset[i]) / 30 ) * 100);
    }
    return monthlyWorkability;
}

export function yearlyWorkabilityPerAsset(monthsAsset: number[]): number {
    const annualAvailability = availableDays(monthsAsset);
    const workability = Math.floor((annualAvailability / 365) * 100) / 100;
    
    return workability;
}

/*************************
 * 
 *      Available & Required Hours
 * 
 */

export function annualTotalAvailableHours(team: any, monthsAsset: number[]): number {
    const dailyHoursPerTeam = team.numberOfPersons * team.shiftPeriod;
    const annualAvailability = (availableDays(monthsAsset) * 24);
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
    const availableHours = annualTotalAvailableHours(team, monthsAsset);
    const requiredHours = annualTotalRequiredHours(asset, location);
    const availablePerRequired = Math.floor((availableHours / requiredHours) * 100);
    
    return availablePerRequired;
}

/*************************
 * 
 *      Fuel Totals and Costs
 * 
 */

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

/*************************
 * 
 *      Salary Costs
 * 
 */

/*************************
 * 
 *      CO2 Tax
 * 
 */

/*************************
 * 
 *      Total Costs
 * 
 */

export function totalAnnualCostVessel(asset: any, annualWorkability: number): number {
    const totalCost = totalAnnualFuelCostVessel(asset, annualWorkability) + annualCostPerAssetWithoutFuel(asset);
    return totalCost;
}

export function totalAnnualCostHelicopter(asset: any, annualWorkability: number): number {
    const totalCost = totalAnnualFuelCostHelicopter(asset, annualWorkability) + annualCostPerAssetWithoutFuel(asset);
    return totalCost;
}







