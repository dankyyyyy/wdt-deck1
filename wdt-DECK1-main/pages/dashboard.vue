<template>
    <div>
        <LoadingPage v-if="loading" />
        <div v-else>
            <div class="flex">
                <div class="sidebar-container p-5 h-screen">
                    <Sidebar />
                </div>
                <div class="h-full deck-frame-translucent-w-sidebar inline-block">
                    <!-- <div class="w-4/5 h-20 p-3">
                            <RecommendationPopUp />
                        </div> -->
                    <div class="flex flex-col">
                        <div v-for="id in ids" :key="id">
                            <FiltersWdtGraphFilter :key="chartKey" :tableKey="tableKey" @remove="handleRemove" :chartId="id"
                                :amountOfCharts="ids.length" />
                        </div>
                    </div>
                    <div class="w-full p-3">
                        <button v-if="ids.length !== 3" type="button"
                            class="w-full border-2 border-gray-400 rounded-full py-1 font-semibold text-xl text-gray-600"
                            @click="addGraph">
                            Add more graphs
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>

import { usePresetStore } from '~/stores/PresetStore';
import { useFilterStore } from '~/stores/FilterStore';
import { useLocationStore } from '~/stores/LocationStore';
import { useWeatherdataStore } from '~/stores/WeatherdataStore';
import LoadingPage from '~/components/LoadingPage.vue';

export default {
    layout: "default",
    name: "Dashboard",
    data() {
        return {
            loading: true,
            ids: [],
            chartKey: false,
            tableKey: false,
        };
    },
    async mounted() {
        this.ids.push(1);
        await this.startChart();
        await this.startTables();
        this.toggleChartKey();
        this.toggleTableKey();
        this.loading = false;
    },
    fetch() {
        return this.startChart();
    },
    methods: {
        addGraph() {
            this.ids.push(this.ids[this.ids.length - 1] + 1);
        },
        handleRemove(id) {
            if (this.ids.length !== 1) {
                this.ids = this.ids.filter((el) => el !== id);
            }
        },
        toggleChartKey() {
            this.chartKey = !this.chartKey;
        },
        async startChart() {
            const currentPreset = usePresetStore().getSelectedPreset();
            const currentLocation = currentPreset.location;

            useFilterStore().hideRecommendation = false;
            useLocationStore().toggleLoading();
            this.$emit("loading");
            await useWeatherdataStore().getByLocationId(currentLocation._id);
            useLocationStore().toggleLoading();
            this.$emit("loading");

            this.loading = false;
        },
        async startTables() {

        },
        toggleTableKey() {
            this.tableKey = !this.tableKey;
        }
    },
};
</script>
  