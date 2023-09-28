import { useLocationStore } from "~/stores/LocationStore";
import { useAssetStore } from "~/stores/AssetStore";
import { useWindTurbineGeneratorStore } from "~/stores/WindTurbineGeneratorStore";
import { IAsset, ILocation, IWindTurbineGenerator } from "~/types";

export function generateRandomColor() {
    var materialColors = [
        { r: 244, g: 67, b: 54 },   // #F44336
        { r: 233, g: 30, b: 99 },   // #E91E63
        { r: 156, g: 39, b: 176 },  // #9C27B0
        { r: 103, g: 58, b: 183 },  // #673AB7
        { r: 63, g: 81, b: 181 },   // #3F51B5
        { r: 33, g: 150, b: 243 },  // #2196F3
        { r: 3, g: 169, b: 244 },   // #03A9F4
        { r: 0, g: 188, b: 212 },   // #00BCD4
        { r: 0, g: 150, b: 136 },   // #009688
        { r: 76, g: 175, b: 80 },   // #4CAF50
        { r: 139, g: 195, b: 74 },  // #8BC34A
        { r: 205, g: 220, b: 57 },  // #CDDC39
        { r: 255, g: 235, b: 59 },  // #FFEB3B
        { r: 255, g: 193, b: 7 },   // #FFC107
        { r: 255, g: 152, b: 0 },   // #FF9800
        { r: 255, g: 87, b: 34 },   // #FF5722
        { r: 121, g: 85, b: 72 },   // #795548
        { r: 158, g: 158, b: 158 }, // #9E9E9E
        { r: 96, g: 125, b: 139 }   // #607D8B
    ];

    var randomIndex = Math.floor(Math.random() * materialColors.length);
    var randomColor = materialColors[randomIndex];

    return `rgb(${randomColor.r}, ${randomColor.g}, ${randomColor.b})`;
}

export function showError(message: string) {
    const errorBar = document.createElement("div");
    errorBar.classList.add("error-bar");

    const errorMessage = document.createElement("span");
    errorMessage.classList.add("error-message");
    errorMessage.textContent = message;

    errorBar.appendChild(errorMessage);
    document.body.appendChild(errorBar);

    setTimeout(() => {
        errorBar.classList.add("fade-out");
        setTimeout(() => {
            document.body.removeChild(errorBar);
        }, 500);
    }, 5000);
}

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