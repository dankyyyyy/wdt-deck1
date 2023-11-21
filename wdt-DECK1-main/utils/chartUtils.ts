import { useAssetStore } from "~/stores/AssetStore";
import { useLocationStore } from "~/stores/LocationStore";
import { usePresetStore } from "~/stores/PresetStore";
import { useTeamStore } from "~/stores/TeamStore";
import { useWeatherdataStore } from "~/stores/WeatherdataStore";
import { useWindTurbineGeneratorStore } from "~/stores/WindTurbineGeneratorStore";
import { IPreset, ITeam, ILocation, IWindTurbineGenerator } from "~/types";

export function nullify() {
    usePresetStore().setSelectedPreset(null as unknown as IPreset);
    useAssetStore().nullifySelectedAssets();
    useLocationStore().setSelectedLocation(null as unknown as ILocation);
    useWindTurbineGeneratorStore().setSelectedWtg(null as unknown as IWindTurbineGenerator);
    useTeamStore().setSelectedTeam(null as unknown as ITeam);
}

export function formatNumberWithDecimal(value: number) {
    return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function generateLabelsFromAssets(): String[] {
    const preset = usePresetStore().getSelectedPreset() as IPreset;
    const assets = preset.assets;
    const names = [];

    for (let i = 0; i < assets.length; i++) {
        const name = assets[i].name;
        names.push(name);
    }

    return names;
}

export function isValid(value: any) {
    return /^[a-zA-Z0-9.() -]+$/.test(value);
}

export function isNumeric(value: any) {
    return /^-?\d*\.?\d*$/.test(value);
}

export async function isADupe(preset: any) {
    var isADupe = false;
    const presets = await usePresetStore().getAll();

    if (presets !== undefined) {
        for (let i = 0; i < presets.length; i++) {
            if (presets[i].name === preset.name) {
                isADupe = true;
                break;
            }
        }
    }
    return isADupe;
}

export async function checkIntegrity(location: any) {
    var integrity = [];
    const yearNow = new Date().getFullYear();
    const yearStart = 2004;
    for (let i = yearStart; i <= yearNow; i++) {
        integrity[i] = await useWeatherdataStore().checkByYear(location._id, i);
    }
    return integrity;
}

export function decimalToCoordinates(long: any, lat: any) {
    let north, west, south, east;
    north = Number(lat) + 0.75
    south = Number(lat) - 0.75
    west = Number(long) - 0.75
    east = Number(long) + 0.75
    return {
      North: north,
      South: south,
      East: east,
      West: west,
    };
  }