<template>
    <button class="submit-button action-button" @click="startChart">
        <IconsDoneTick />
    </button>
</template>
  
<script>
import { useLocationStore } from '~/stores/LocationStore';
import { useAssetStore } from '~/stores/AssetStore';
import { useFilterStore } from '~/stores/FilterStore';
import { useWeatherdataStore } from '~/stores/WeatherdataStore';

export default {
    name: "SubmitButton",
    setup() {
        const filterStore = useFilterStore();
        const weatherStore = useWeatherdataStore();

        return {
            filterStore,
            weatherStore,
        };
    },
    methods: {
        async startChart() {
            const currentPath = window.location.pathname;
            if (currentPath.includes('weatherDownTime')) {
                const location = useLocationStore().getSelectedLocation();
                this.filterStore.hideRecommendation = false;
                useLocationStore().toggleLoading();
                this.$emit("loading")
                let locationId = await useLocationStore().getByName(location)
                locationId = locationId.map(location => location._id)
                await useWeatherdataStore().getByLocationId(locationId)
                useLocationStore().toggleLoading();
                this.$emit("loading")
            } else if (currentPath.includes('financialFeasibility')) {
                const location = useLocationStore().getSelectedLocation();
                const wtg = useAssetStore().getSelectedWtg();
                const asset1 = useAssetStore().getSelectedAsset1();
                const asset2 = useAssetStore().getSelectedAsset2();
                console.log(`${location}, ${wtg}, ${asset1}, ${asset2}`);
                useLocationStore().toggleLoading();
                this.$emit("loading")
                let locationId = await useLocationStore().getByName(location)
                locationId = locationId.map(location => location._id)
                await useWeatherdataStore().getByLocationId(locationId)
                useLocationStore().toggleLoading();
                this.$emit("loading")
            }
        }
    }
};
</script>