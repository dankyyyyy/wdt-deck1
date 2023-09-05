import { defineStore } from "pinia";
import { IAsset } from '@/types/index'
import axios from "axios"

export const useAssetStore = defineStore("AssetStore", {
  state: () => ({
    assets: [] as IAsset[]
  }),
  actions: {
    async getAll() {
      try {
        let data = await $fetch<IAsset[]>("/api/assets")
        this.assets = data; // Update the store's assets with the processed assets

        return data;
      } catch (e) {
        console.error(e)
      }
    },
    async post(asset: IAsset) {
      try {
        console.log('Registering asset to database')
        const response = await axios.post('/api/assets/create', asset);
        console.log(response.data.message);
        // handle success
      } catch (error) {
        console.error(error);
        // handle error
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
        console.error('Error updating asset', error);
      }
      this.getAll()
    },
    async delete(asset: IAsset) {
      try {
        console.log('Deleting asset ', asset.name, ' ', asset._id);
        const response = await axios.delete('/api/assets/delete', {
          data: asset // Pass the asset object in the 'data' property
        });
        console.log(response.data.message);
        //handle success
      } catch (error) {
        console.error(error);
        // handle error
      }
      this.getAll()
    }
  }
});
