import { defineStore } from "pinia";
import { IWindTurbineGenerator } from '@/types/index'
import axios from "axios"

export const useWindTurbineGeneratorStore = defineStore("WindTurbineGeneratorStore", {
  state: () => ({
    wtgs: [] as IWindTurbineGenerator[],
  }),
  actions: {
    async getByName(name: string) {
      try {
        let data = await $fetch<IWindTurbineGenerator[]>("/api/windTurbineGenerators")
        const filteredData = data.filter(WindTurbineGenerator => WindTurbineGenerator.name === name);
        data = filteredData;
        if (data.length === 1) {
          const WindTurbineGenerator = data[0];
          return WindTurbineGenerator as IWindTurbineGenerator
        }
      } catch (e) {
        console.error(e)
      }
    },
    async getAll() {
      try {
        let data = await $fetch<IWindTurbineGenerator[]>("/api/windTurbineGenerators")
        this.wtgs = data;
        return data;
      } catch (e) {
        console.error(e)
      }
    },
    async post(WindTurbineGenerator: IWindTurbineGenerator) {
      try {
        console.log('Creating WindTurbineGenerator ', WindTurbineGenerator.name, ' ', WindTurbineGenerator._id);
        const response = await axios.post('/api/windTurbineGenerators/create', WindTurbineGenerator);
        console.log(response.data.message);
        if (response.status === 200) {
          console.log('WindTurbineGenerator created successfully\n', response);
        } else {
          console.error('WindTurbineGenerator creation failed with status', response.status);
        }
      } catch (error) {
        console.error('Error creating WindTurbineGenerator: ', error);
      }
      this.getAll()
    },
    async put(WindTurbineGenerator: IWindTurbineGenerator) {
      try {
        console.log('Updating WindTurbineGenerator ', WindTurbineGenerator.name, ' ', WindTurbineGenerator._id);
        const response = await axios.put('/api/windTurbineGenerators/update', WindTurbineGenerator);
        console.log(response.data.message);
        if (response.status === 200) {
          console.log('WindTurbineGenerator updated successfully\n', response);
        } else {
          console.error('WindTurbineGenerator update failed with status', response.status);
        }
      } catch (error) {
        console.error('Error updating WindTurbineGenerator: ', error);
      }
      this.getAll()
    },
    async delete(WindTurbineGenerator: IWindTurbineGenerator) {
      try {
        console.log('Deleting WindTurbineGenerator ', WindTurbineGenerator.name, ' ', WindTurbineGenerator._id);
        const response = await axios.delete('/api/windTurbineGenerators/delete', {
          data: WindTurbineGenerator
        });
        console.log(response.data.message);
        if (response.status === 200) {
          console.log('WindTurbineGenerator deleted successfully\n', response);
        } else {
          console.error('WindTurbineGenerator deletion failed with status', response.status);
        }
      } catch (error) {
        console.error('Error deleting WindTurbineGenerator: ', error);
      }
      this.getAll()
    },
  }
});
