import { usePresetStore } from "~/stores/PresetStore";
import { IPreset } from "~/types";

export function nullify() {
    usePresetStore().setSelectedPreset(null as unknown as IPreset);
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
