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
    }
  }
});
