//locations
export interface ILocation {
    _id?: string;
    name: string;
    latitude: number;
    longitude: number;
    limit: number;
    wtg: number;
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

    // vessel-only attributes
    vesselSpeed: number,
    loiteringFuelConsumption: number,
    loitering: number,
    highEngineActivity: number,

    // Helicopter-only Attributes
    helicopterSpeed: number,
    cloudbase: number,
    flightTime: number,
    
    // WTG-only Attributes
    plannedMaintenance: number,
    troubleshootVisits: number,
    averageTsHours: number,
}

//teams
export interface ITeam {
    _id?: string;
    name: string;
    numberOfPersons: number;
    shiftPeriod: number;
}