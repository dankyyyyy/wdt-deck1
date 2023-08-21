//locations
export interface ILocation {
    _id?: string;
    name: string;
    latitude: number;
    longitude: number;
    limit: number;
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
    _id?: string;
    name: string;
    category: string;
    hs: number;
    cloudbase: number;
    visibility: number;
}