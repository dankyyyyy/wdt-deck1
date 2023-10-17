import { useAssetStore } from "~/stores/AssetStore";
import { useLocationStore } from "~/stores/LocationStore";
import { usePresetStore } from "~/stores/PresetStore";
import { useTeamStore } from "~/stores/TeamStore";
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

export function isString(value: any): value is string {
    return typeof value === 'string';
}

export function isNumber(value: any): value is number {
    return typeof value === 'number';
}
