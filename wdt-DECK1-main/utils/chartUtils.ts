import { usePresetStore } from "~/stores/PresetStore";
import { IPreset } from "~/types";

export function nullify() {
    usePresetStore().setSelectedPreset(null as unknown as IPreset);
}

export function formatNumberWithDecimal(value: number) {
    return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function generateLabelsFromAssets(): String[] {
    const preset = usePresetStore().getSelectedPreset() as { asset1: { name: string }, asset2: { name: string } };
    const names = [preset.asset1.name, preset.asset2.name];
    return names;
}
