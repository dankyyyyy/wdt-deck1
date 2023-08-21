import { defineStore } from "pinia";

export const useConfigurationStore = defineStore("ConfigurationStore", {
    state: () => {
        const wdtThreshold = ref<Number>();
        const ctv_small_limit = ref<Number>(2);
        const ctv_big_limit = ref<Number>();
        const sov_limit = ref<Number>();
        const site_limit = ref<Number>();
        const heli_visibility_limit = ref<Number>();
        const heli_cloudbase_limit = ref<Number>();

        return {
            wdtThreshold,
            ctv_small_limit,
            ctv_big_limit,
            sov_limit,
            site_limit,
            heli_visibility_limit,
            heli_cloudbase_limit,
        };
    },
});