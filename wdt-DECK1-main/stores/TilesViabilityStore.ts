import { defineStore } from "pinia";
import axios from "axios";

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface TileInfo {
  average_depth: number;
}

export const useTileInfoStore = defineStore("TileInfoStore", {
  state: () => ({
    tileInfo: null as TileInfo | null,
    loading: false,
  }),
  actions: {
    async fetchTileInfo(coordinates: Coordinate[]) {
      this.loading = true;
      try {
        const params = new URLSearchParams();
        coordinates.forEach((coord: Coordinate) => {
          params.append('coords', `${coord.latitude},${coord.longitude}`);
        });

        // Using relative URL directly in Axios call
        const response = await axios.get(`/api/v1/tile-water-depth`, { params });
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

    setSelectedTileInfo(tileInfo: TileInfo) {
      this.tileInfo = tileInfo;
    },

    getSelectedTileInfo(): TileInfo | null {
      return this.tileInfo;
    },
  },
});
