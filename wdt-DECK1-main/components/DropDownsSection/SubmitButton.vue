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
import { showError } from '~/utils/chartUtils';

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
            const location = useLocationStore().getSelectedLocation();

            const currentPath = window.location.pathname;

            if (currentPath.includes('financialFeasibility') || currentPath.includes('availability')) {
                const wtg = useAssetStore().getSelectedWtg();
                const asset1 = useAssetStore().getSelectedAsset1();
                const asset2 = useAssetStore().getSelectedAsset2();

                if (asset1 === asset2) {
                    showError("Assets cannot be identical.");
                    return;
                }

                if (wtg === null || asset1 === null || asset2 === null) {
                    showError("Please make sure all attributes have been selected.");
                    return;
                }
            }

            this.filterStore.hideRecommendation = false;
            useLocationStore().toggleLoading();
            this.$emit("loading")
            await useWeatherdataStore().getByLocationId(location._id)
            useLocationStore().toggleLoading();
            this.$emit("loading")
        }
    }
}
</script>