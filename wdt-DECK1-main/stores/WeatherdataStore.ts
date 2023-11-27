import { defineStore } from "pinia";
import { type ILocation, type IWeatherdata } from '@/types/index'
import axios from "axios"

interface IWeatherdataStoreState {
    currentData: IWeatherdata[];
    allFetchedData: {
        [locationId: string]: IWeatherdata[];
    };
}

export const useWeatherdataStore = defineStore("WeatherdataStore", {
    state: (): IWeatherdataStoreState => ({
        currentData: [] as IWeatherdata[],
        allFetchedData: {}
    }),

    actions: {
        async checkByLocationId(locationId: string) {
            try {
                let data = await $fetch<IWeatherdata[]>(`/api/weatherdata/find/${locationId}`);
                return data;
            } catch (e) {
                console.error(e)
            }
        },
        async checkByYear(locationId: string, year: Number): Promise<boolean> {
            try {
                if (year !== undefined) {
                    let data = await $fetch<IWeatherdata>(`api/weatherdata/findByYear/${locationId}?year=${year}`);
                    if (data !== undefined) return true
                    else return false
                } else return false
            } catch {
                return false;
            }
        },
        async getByLocationId(locationId: string) {
            try {
                let data = this.allFetchedData[locationId];
                if (!data) {
                    data = await $fetch<IWeatherdata[]>(`/api/weatherdata/${locationId}`);
                    this.allFetchedData[locationId] = data;
                }
                this.currentData = data;
                return data;
            } catch (e) {
                return;
            }
        },
        async postData(weatherData: any[], location: ILocation): Promise<Boolean> {
            weatherData.forEach((entry) => {
                entry.location = location;
            })
            try {
                console.log('Starting to register weather data in database')
                const response = await axios.post('/api/weatherdata/create', weatherData);
                console.log(response.data.message);
                // handle success
                return true;
            } catch (error) {
                console.error(error);
                // handle error
                return false;
            }
        },
        setCurrentData(currentData: IWeatherdata[]) {
            this.currentData = currentData;
        },
        getCurrentData(): unknown | IWeatherdata[] {
            return this.currentData;
        },
    }
})