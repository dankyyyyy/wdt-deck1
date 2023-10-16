import { defineStore } from "pinia";
import { IAsset } from '@/types/index'
import axios from "axios"

export const useAssetStore = defineStore("AssetStore", {
  state: () => ({
    assets: [] as IAsset[],
    selectedAssets: [] as IAsset[],
  }),
  actions: {
    async getByName(name: string) {
      try {
        let data = await $fetch<IAsset[]>("/api/assets")
        const filteredData = data.filter(asset => asset.name === name);
        data = filteredData;
        if (data.length === 1) {
          const asset = data[0];
          return asset as IAsset
        }
      } catch (e) {
        console.error(e)
      }
    },

    async getAll() {
      try {
        let data = await $fetch<IAsset[]>("/api/assets")
        this.assets = data;
        return data;
      } catch (e) {
        console.error(e)
      }
    },

    async post(asset: IAsset) {
      try {
        console.log('Creating asset ', asset.name, ' ', asset._id);
        const response = await axios.post('/api/assets/create', asset);
        console.log(response.data.message);
        if (response.status === 200) {
          console.log('Asset created successfully\n', response);
        } else {
          console.error('Asset creation failed with status', response.status);
        }
      } catch (error) {
        console.error('Error creating asset: ', error);
      }
      this.getAll()
    },

    async put(asset: IAsset) {
      try {
        console.log('Updating asset ', asset.name, ' ', asset._id);
        const response = await axios.put('/api/assets/update', asset);
        console.log(response.data.message);
        if (response.status === 200) {
          console.log('Asset updated successfully\n', response);
        } else {
          console.error('Asset update failed with status', response.status);
        }
      } catch (error) {
        console.error('Error updating asset: ', error);
      }
      this.getAll()
    },

    async delete(asset: IAsset) {
      try {
        console.log('Deleting asset ', asset.name, ' ', asset._id);
        const response = await axios.delete('/api/assets/delete', {
          data: asset
        });
        console.log(response.data.message);
        if (response.status === 200) {
          console.log('Asset deleted successfully\n', response);
        } else {
          console.error('Asset deletion failed with status', response.status);
        }
      } catch (error) {
        console.error('Error deleting asset: ', error);
      }
      this.getAll()
    },
    addSelectedAsset(asset: IAsset) {
      this.selectedAssets.push(asset);
    },
    removeSelectedAsset(asset: IAsset) {
      for (let i = 0; i < this.selectedAssets.length; i++) {
        if (this.selectedAssets[i]._id === asset._id) {
          this.selectedAssets.splice(i, 1);
        }
      }
    },
    getSelectedAssets(): unknown | IAsset[] {
      return this.selectedAssets;
    },
    nullifySelectedAssets() {
      while (this.selectedAssets.length > 0) {
        this.selectedAssets.pop();
      }
    },
  }
});
