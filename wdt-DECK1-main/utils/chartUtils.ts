import { useLocationStore } from "~/stores/LocationStore";
import { useAssetStore } from "~/stores/AssetStore";
import { useWindTurbineGeneratorStore } from "~/stores/WindTurbineGeneratorStore";
import { IAsset, ILocation, IWindTurbineGenerator } from "~/types";

export function nullify() {
    useLocationStore().setSelectedLocation(null as unknown as ILocation);
    useAssetStore().setSelectedAsset1(null as unknown as IAsset);
    useAssetStore().setSelectedAsset2(null as unknown as IAsset);
    useWindTurbineGeneratorStore().setSelectedWtg(null as unknown as IWindTurbineGenerator);
}

export function formatNumberWithDecimal(value: number) {
    const parts = value.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}