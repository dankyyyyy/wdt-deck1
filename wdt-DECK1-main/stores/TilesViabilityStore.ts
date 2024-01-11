import { type ITileInfo } from '@/types/index'
import type { LatLng } from "@/types/index";
import { defineStore } from "pinia";
import axios from "axios";
// import { useWindTurbineGeneratorStore } from './WindTurbineGeneratorStore';

export const useTileInfoStore = defineStore("TileInfoStore", {
  state: () => ({
    tiles: [] as any[],
    tileInfoList: [] as any[],
    tileInfo: null as ITileInfo | null,
    region: null as string | null,
    type: null as string | null,
    windSpeedLimit: null as number | null,
    loading: false,
  }),
  actions: {
    async fetchTileInfo(coordinates: []) {
      this.loading = true;
      this.handleWaterDepthRequest(coordinates);
      this.handleWindSpeedRequest(coordinates);
    },
    async handleWaterDepthRequest(coordinates: []) {
      try {
        this.region = this.getSelectedRegion();
        this.type = this.getType();
        const params = new URLSearchParams();
        params.append('region', this.region!);
        params.append('type', this.type!);

        coordinates.forEach((coord: LatLng) => {
          params.append('coords', `${coord.lat},${coord.lng}`);
        });
        const fullUrl = `http://localhost:8000/api/v1/get-water-depth-for-tile?${params.toString()}`;
        console.log('Making request to:', fullUrl);

        // Using relative URL directly in Axios call
        const response = await axios.get(fullUrl);
        if (response.data) this.tileInfo!.average_depth = response.data;
        console.log(response.data);

      } catch (error) {
        console.error('Error fetching tile info:', error);
      } finally {
        this.loading = false;
      }
    },

    async handleWindSpeedRequest(coordinates: []) {
      try {
        this.region = this.getSelectedRegion();
        this.windSpeedLimit = 20;
        // this.windSpeedLimit = useWindTurbineGeneratorStore().getSelectedWtg().windSpeedLimit;

        const params = new URLSearchParams();
        params.append('region', this.region!);

        coordinates.forEach((coord: LatLng) => {
          params.append('coords', `${coord.lat},${coord.lng}`);
        });
        const fullUrl = `http://localhost:8000/api/v1/get-wind-speed-for-tile?${params.toString()}`;
        console.log('Making request to:', fullUrl);

        // Using relative URL directly in Axios call
        const response = await axios.get(fullUrl);

        if (response.data) this.tileInfo!.average_wind_speed = response.data;

      } catch (error) {
        console.error('Error fetching tile info:', error);
      } finally {
        this.loading = false;
      }
    },

   async handleViabilityRequest(coordinates: []) {
      try {
        this.region = this.getSelectedRegion();
        this.type = this.getType();
        this.windSpeedLimit = 20;
        // this.windSpeedLimit = useWindTurbineGeneratorStore().getSelectedWtg().windSpeedLimit;

        const params = new URLSearchParams();
        params.append('region', this.region!);
        params.append('type', this.type!);
        params.append('windSpeedLimit', this.windSpeedLimit!.toString());

        coordinates.forEach((coord: LatLng) => {
          params.append('coords', `${coord.lat},${coord.lng}`);
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
        this.region = this.getSelectedRegion();
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

    addTile(coordinates: LatLng[]): void {
      this.tiles.push(coordinates);
      setCookie('tiles', this.tiles);
    },

    setTilesFromCookie(tiles: LatLng[]): void {
      this.tiles = tiles;
    },

    getTiles(): LatLng[] {
      return this.tiles;
    },

    addTileInfo(coordinates: LatLng[], tileInfo: ITileInfo): void {
      this.tileInfoList.push({
        coordinates: coordinates,
        info: tileInfo,
      });
      setCookie('tileinfo', this.tileInfoList);
    },

    setTileInfoListFromCookie(tileInfoList: ITileInfo[]): void {
      this.tileInfoList = tileInfoList;
    },

    clearTileInfo(): void {
      while (this.tileInfoList.length > 0) {
        this.tileInfoList.pop();
      }
    },

    getTileInfoList(): ITileInfo[] {
      return this.tileInfoList;
    },
  },
});
