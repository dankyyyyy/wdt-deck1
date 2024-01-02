//locations
export interface ILocation {
    _id?: string;
    name: string;
    latitude: number;
    longitude: number;
    limit: number;
    wtg: number;
}

//wind turbine generator
export interface IWindTurbineGenerator {
    _id?: string;
    name: string;
    windSpeedLimit: number,
    plannedMaintenance: number,
    troubleshootVisits: number,
    averageTsHours: number,
}

//assets
export interface IAsset {
    // shared attributes
    _id?: string;
    name: string;
    category: string;
    hs: number;
    visibility: number;
    windSpeedLimit: number,
    dayRate: number,
    operationalFuelConsumption: number,
    dailyAvailableTimePerTeam: number,
    staffPerTeam: number,
    totalYearlyAvailableTime: number,

    // vessel-only attributes
    vesselSpeed: number,
    fuelFlowLoitering: number,
    loitering: number,
    highEngineActivity: number,

    // Helicopter-only Attributes
    helicopterSpeed: number,
    cloudbase: number,

    team: ITeam,
}

//teams
export interface ITeam {
    _id?: string;
    name: string;
    numberOfPersons: number;
    shiftPeriod: number;
}

//preset
export interface IPreset {
    _id?: string;
    name: string;
    location:ILocation;
    wtg: IWindTurbineGenerator;
    assets: IAsset[];
}

//weatherdata
export interface IWeatherdata {
    Year: number;
    Month: number;
    Day: number;
    Hour: number;
    Hs: number;
    Windspeed: number;
    Visibility: number;
    Cloud: number;
    locationId: ILocation;
}

//coordinate
export interface ICoordinate {
    latitude: number;
    longitude: number;
  }
  
//tileinfo
export interface ITileInfo {
    average_depth: number;
  }