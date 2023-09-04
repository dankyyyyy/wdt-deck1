import { defineStore } from "pinia";
import { ILocation } from '@/types/index'
import axios from "axios"

export const useLocationStore = defineStore("LocationStore",{
    state: () => ({
        // const location1 = reactive<object>({id: 1,name: "Location 1",latitude: "55.675758",longitude: "12.569020", limit: 15});
        // const location2 = reactive<object>({id: 2,name: "Location 2",latitude: "59.913868",longitude: "10.752245", limit: 21});
        // const location3 = reactive<object>({id: 3,name: "Location 3",latitude: "34.321843",longitude: "19.231034", limit: 13});
        // const location4 = reactive<object>({id: 4,name: "Location 4",latitude: "42.497681",longitude: "27.470030", limit: 19});
        locations: [] as ILocation[],
        loading: false,
        
        // return{
        //     location1,
        //     location2,
        //     location3,
        //     location4,
        //     locations,
        // }
    }),
    actions: {
        async getByName(name: string) {
            try {
                let data = await $fetch<ILocation[]>(`/api/locations/${name}`);
                return data as ILocation[]
            } catch (e) {
                console.error(e)
            }
        },
        async getAll() {
            try {
                let data = await $fetch<ILocation[]>("/api/locations");
                this.locations = data;
                return data as ILocation[];
            } catch (e) {
                console.error(e)
            }
        },
        async post(location: ILocation) {
            try {
                console.log('Registering location to database')
                const response = await axios.post('/api/locations/create', location);
                console.log(response.data.message);
                // handle success
            } catch (error) {
                console.error(error);
                // handle error
            }
            this.getAll()
        },
        async put(location: ILocation) {
            try{
                const response = await axios.post('/api/locations/update', location);
            } catch (error) {
                console.error(error);
            }
            this.getAll()
        },
        toggleLoading(){
            this.loading = !this.loading;
        }
    }
});