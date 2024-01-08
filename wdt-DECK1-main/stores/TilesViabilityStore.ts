import { type ICoordinate, type ITileInfo } from '@/types/index'
import { defineStore } from "pinia";
import { getCookie } from '../utils/cookieHandler';
import axios from "axios";

export const useTileInfoStore = defineStore("TileInfoStore", {
  state: () => ({
    tileInfo: null as ITileInfo | null,
    region: null as string | null,
    type: null as string | null,
    windSpeedLimit: null as number | null,
    loading: false,
  }),
  actions: {
    async fetchTileInfo(coordinates: ICoordinate[]) {
      this.loading = true;
      this.handleWaterDepthRequest(coordinates);
      this.handleWindSpeedRequest(coordinates);
    },
    async handleWaterDepthRequest(coordinates: ICoordinate[]) {
      try {
        this.region = getCookie('region');
        this.type = getCookie('type');
        const params = new URLSearchParams();
        params.append('region', this.region!);
        params.append('type', this.type!);

        coordinates.forEach((coord: ICoordinate) => {
          params.append('coords', `${coord.latitude},${coord.longitude}`);
        });
        const fullUrl = `http://localhost:8000/api/v1/get-water-depth-for-tile?${params.toString()}`;
        console.log('Making request to:', fullUrl);

        // Using relative URL directly in Axios call
        const response = await axios.get(fullUrl);
        this.tileInfo!.average_depth = response.data;
        console.log(response.data);

      } catch (error) {
        console.error('Error fetching tile info:', error);
      } finally {
        this.loading = false;
      }
    },

    async handleWindSpeedRequest(coordinates: ICoordinate[]) {
      try {
        this.region = getCookie('region');
        this.windSpeedLimit = getCookie('windSpeedLimit');

        const params = new URLSearchParams();
        params.append('region', this.region!);

        coordinates.forEach((coord: ICoordinate) => {
          params.append('coords', `${coord.latitude},${coord.longitude}`);
        });
        const fullUrl = `http://localhost:8000/api/v1/get-wind-speed-for-tile?${params.toString()}`;
        console.log('Making request to:', fullUrl);

        // Using relative URL directly in Axios call
        const response = await axios.get(fullUrl);
        this.tileInfo!.average_wind_speed = response.data;

      } catch (error) {
        console.error('Error fetching tile info:', error);
      } finally {
        this.loading = false;
      }
    },

   async handleViabilityRequest(coordinates: ICoordinate[]) {
      try {
        this.region = getCookie('region');
        this.type = getCookie('type');
        this.windSpeedLimit = 20;
        // this.windSpeedLimit = getCookie('windSpeedLimit');

        const params = new URLSearchParams();
        params.append('region', this.region!);
        params.append('type', this.type!);
        params.append('windSpeedLimit', this.windSpeedLimit!.toString());

        coordinates.forEach((coord: ICoordinate) => {
          params.append('coords', `${coord.latitude},${coord.longitude}`);
        });
        const fullUrl = `http://localhost:8000/api/v1/get-tile-viability?${params.toString()}`;
        console.log('Making request to:', fullUrl);

        // Using relative URL directly in Axios call
        const response = await axios.get(fullUrl);
        return response.data;

      } catch (error) {
        console.error('Error fetching tile info:', error);
      } finally {
        this.loading = false;
      }
    },

    async handleCoordinateBoundsRequest() {
      try {
        this.region = getCookie('region');
        const params = new URLSearchParams();
        params.append('region', this.region!);

        const fullUrl = `http://localhost:8000/api/v1/get-region-bounds?${params.toString()}`;
        console.log('Making request to:', fullUrl);

        // Using relative URL directly in Axios call
        const response = await axios.get(fullUrl);
        return response.data;

      } catch (error) {
        console.error('Error fetching region bounds:', error);
      } finally {
        this.loading = false;
      }
    },

    toggleLoading() {
      this.loading = !this.loading;
    },

    setSelectedTileInfo(tileInfo: ITileInfo) {
      this.tileInfo = tileInfo;
    },

    getSelectedTileInfo(): ITileInfo | null {
      return this.tileInfo;
    },

    setSelectedRegion(region: string) {
      this.region = region;
    },

    getSelectedRegion(): string | null {
      return this.region;
    },

    setType(type: string) {
      this.type = type;
    },

    getType(): string | null {
      return this.type;
    },

    setWindSpeedLimit(windSpeedLimit: number) {
      this.windSpeedLimit = windSpeedLimit;
    },

    getWindSpeedLimit(): number | null {
      return this.windSpeedLimit;
    },
  },
});
