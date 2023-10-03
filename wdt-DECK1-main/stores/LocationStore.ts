import { defineStore } from "pinia";
import { ILocation } from '@/types/index'
import axios from "axios"

export const useLocationStore = defineStore("LocationStore",{
    state: () => ({
        locations: [] as ILocation[],
        loading: false,
        selectedLocation: null as unknown as ILocation,
    }),
    actions: {
        async getByName(name: string) {
            try {
                let data = await $fetch<ILocation[]>(`/api/locations/${name}`);
                if (data.length === 1) {
                    const location = data[0];
                    return location;
                }
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
                console.log('Creating location', location.name, ' ', location._id);
                const response = await axios.post('/api/locations/create', location);
                console.log(response.data.message);
                if (response.status === 200) {
                    console.log('Location created successfully\n', response);
                  } else {
                    console.error('Location creation failed with status', response.status);
                  }
            } catch (error) {
                console.error('Error creating location: ', error);
            }
            this.getAll()
        },
        async put(location: ILocation) {
            try {
                console.log('Updating location ', location.name, ' ', location._id);
                const response = await axios.post('/api/locations/update', location);
                console.log(response.data.message);
                if (response.status === 200) {
                    console.log('Location updated successfully\n', response);
                  } else {
                    console.error('Location update failed with status', response.status);
                  }
            } catch (error) {
                console.error('Error updating location: ', error);
            }
            this.getAll()
        },
        async delete(location: ILocation) {
            try {
                console.log('Deleting location ', location.name, ' ', location._id);
                const response = await axios.delete('/api/locations/delete', {
                    data: location
                });
                console.log(response.data.message);
                if (response.status === 200) {
                    console.log('Location deleted successfully\n', response);
                  } else {
                    console.error('Location delete failed with status', response.status);
                  }
            } catch (error) {
                console.error('Error deleting location:', error);
            }
           this.getAll()
        },
        toggleLoading() {
            this.loading = !this.loading;
        },
    }
});
