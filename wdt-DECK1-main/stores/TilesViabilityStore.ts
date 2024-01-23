import { type ITileInfo } from '@/types/index'
import type { LatLng } from "@/types/index";
import { defineStore } from "pinia";
import axios from "axios";
// import { useWindTurbineGeneratorStore } from './WindTurbineGeneratorStore';

export const useTileInfoStore = defineStore("TileInfoStore", {
  state: () => ({
    tiles: [] as any[],
    tileInfoList: [] as any[],
    tileInfo: {
      average_depth: null,
      average_wind_speed: null,
    } as unknown as ITileInfo | null,
    region: null as string | null,
    type: null as string | null,
    windSpeedLimit: null as number | null,
    loading: false,
  }),
  actions: {
    async fetchTileInfo(coordinates: []) {
      this.toggleLoading();
      try {
        this.tileInfo!.average_depth = await this.handleWaterDepthRequest(coordinates);
        this.tileInfo!.average_wind_speed = await this.handleWindSpeedRequest(coordinates);
      } catch (error) {
        console.error('Error fetching tile info:', error);
      } finally {
        this.toggleLoading();
      }

    },
    async handleWaterDepthRequest(coordinates: []) {
      this.toggleLoading();
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
        return response.data;

      } catch (error) {
        console.error('Error fetching tile info:', error);
      } finally {
        this.toggleLoading();
      }
    },

    async handleWindSpeedRequest(coordinates: []) {
      this.toggleLoading();
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

        return response.data;

      } catch (error) {
        console.error('Error fetching tile info:', error);
      } finally {
        this.toggleLoading();
      }
    },

    async handleViabilityRequest(coordinates: []) {
      this.toggleLoading();
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
        this.toggleLoading();
      }
    },

    async handleCoordinateBoundsRequest() {
      this.toggleLoading();
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
        this.toggleLoading();
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

    setRegionfromCookie(region: string) {
      this.region = region;
    },

    setType(type: string) {
      this.type = type;
    },

    getType(): string | null {
      return this.type;
    },

    setTypeFromCookie(type: string) {
      this.type = type;
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

    clearTiles(): void {
      while (this.tiles.length > 0) {
        this.tiles.pop();
      }
      setCookie('tiles', this.tiles);

      while (this.tileInfoList.length > 0) {
        this.tileInfoList.pop();
      }

      setCookie('tileinfo', this.tileInfoList);
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
