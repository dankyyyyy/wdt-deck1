<template>
    <button class="proceed-button" @click="startChart" :disabled="!isActive" :class="{ 'active': isActive }">
        <IconsDoneTick class="flex items-center justify-center inline-block align-middle w-full" />
    </button>
</template>

<script>
import { usePresetStore } from '~/stores/PresetStore';
import { useFilterStore } from '~/stores/FilterStore';
import { useWeatherdataStore } from '~/stores/WeatherdataStore';
import { useLocationStore } from '~/stores/LocationStore';

export default {
    name: "PresetsSubmitButton",
    computed: {
        isActive() {
            return usePresetStore().getSelectedPreset() !== null;
        }
    },
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
            const currentPreset = usePresetStore().getSelectedPreset();
            const currentLocation = currentPreset.location;

            console.log(currentPreset.location);
            console.log(currentPreset.asset1);
            console.log(currentPreset.asset2);
            console.log(currentPreset.asset1.team);
            console.log(currentPreset.asset2.team);


            this.filterStore.hideRecommendation = false;
            useLocationStore().toggleLoading();
            this.$emit("loading");
            await useWeatherdataStore().getByLocationId(currentLocation._id)
            useLocationStore().toggleLoading();
            this.$emit("loading")

            /*const statusCode = await checkConnection(currentLocation);
            console.log(statusCode);
            if (statusCode === 200) {
                this.filterStore.hideRecommendation = false;
                useLocationStore().toggleLoading();
                this.$emit("loading");
                await useWeatherdataStore().getByLocationId(currentLocation._id)
                useLocationStore().toggleLoading();
                this.$emit("loading")
            } else {
                showError(`An error with the status code ${statusCode} occurred. Please try again later.`);
                return;
            }*/
        },
    }
}

</script>