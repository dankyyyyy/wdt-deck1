import { type ICoordinate, type ITileInfo } from '@/types/index'
import { defineStore } from "pinia";
import axios from "axios";

export const useTileInfoStore = defineStore("TileInfoStore", {
  state: () => ({
    tileInfo: null as ITileInfo | null,
    loading: false,
  }),
  actions: {
    async fetchTileInfo(coordinates: ICoordinate[]) {
      this.loading = true;
      try {
        const params = new URLSearchParams();
        coordinates.forEach((coord: ICoordinate) => {
          params.append('coords', `${coord.latitude},${coord.longitude}`);
        });
        // Construct the full URL for debugging
        const fullUrl = `http://localhost:8000/api/v1/get-water-depth-for-tile?${params.toString()}`;
        console.log('Making request to:', fullUrl);

        // Using relative URL directly in Axios call
        const response = await axios.get(fullUrl);
        this.tileInfo = response.data;
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching tile info:', error);
      } finally {
        this.loading = false;
      }
    },

    // Other actions can be added here similar to the LocationStore example

    toggleLoading() {
      this.loading = !this.loading;
    },

    setSelectedTileInfo(tileInfo: ITileInfo) {
      this.tileInfo = tileInfo;
    },

    getSelectedTileInfo(): ITileInfo | null {
      return this.tileInfo;
    },
  },
});
