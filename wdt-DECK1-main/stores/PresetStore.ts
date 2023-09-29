import { defineStore } from "pinia";
import { IPreset } from '@/types/index'
import axios from "axios"

export const usePresetStore = defineStore("PresetStore", {
  state: () => ({
    presets: [] as IPreset[],
    selectedPreset: null as unknown | IPreset,
  }),
  actions: {
    async getByName(name: string) {
      try {
        let data = await $fetch<IPreset[]>("/api/presets")
        const filteredData = data.filter(preset => preset.name === name);
        data = filteredData;
        if (data.length === 1) {
          const preset = data[0];
          return preset as IPreset 
        }         
      } catch (e) {
        console.error(e)
      }
    },
    async getAll() {
      try {
        let data = await $fetch<IPreset[]>("/api/presets")
        this.presets = data;
        return data;
      } catch (e) {
        console.error(e)
      }
    },
    async post(preset: IPreset) {
      try {
        console.log('Creating preset ', preset.name, ' ', preset._id);
        const response = await axios.post('/api/presets/create', preset);
        console.log(response.data.message);
        if (response.status === 200) {
          console.log('Preset created successfully\n', response);
        } else {
          console.error('Preset creation failed with status', response.status);
        }
      } catch (error) {
        console.error('Error creating preset: ', error);
      }
      this.getAll()
    },
    async put(preset: IPreset) {
      try {
        console.log('Updating preset ', preset.name, ' ', preset._id);
        const response = await axios.put('/api/presets/update', preset);
        console.log(response.data.message);
        if (response.status === 200) {
          console.log('Preset updated successfully\n', response);
        } else {
          console.error('Preset update failed with status', response.status);
        }
      } catch (error) {
        console.error('Error updating preset: ', error);
      }
      this.getAll()
    },
    async delete(preset: IPreset) {
      try {
        console.log('Deleting preset ', preset.name, ' ', preset._id);
        const response = await axios.delete('/api/presets/delete', {
          data: preset
        });
        console.log(response.data.message);
        if (response.status === 200) {
          console.log('Preset deleted successfully\n', response);
        } else {
          console.error('Preset deletion failed with status', response.status);
        }
      } catch (error) {
        console.error('Error deleting preset: ', error);
      }
      this.getAll()
    },
    setSelectedPreset(preset: IPreset) {
      this.selectedPreset = preset;
    },
    getSelectedPreset(): unknown | IPreset {
      return this.selectedPreset;
    },
  } 
});
