import { useLocationStore } from "~/stores/LocationStore";
import { usePresetStore } from "~/stores/PresetStore";
import { IPreset } from "~/types";

export function nullify() {
    usePresetStore().setSelectedPreset(null as unknown as IPreset);
}

export function formatNumberWithDecimal(value: number) {
    const parts = value.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}