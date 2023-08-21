import { useConfigurationStore } from "~/stores/ConfigurationStore";

export function updateChart(
    ctv_small_limit,
     ctv_big_limit,
     sov_limit,
     site_limit,
     heli_visibility_limit,
     heli_cloudbase_limit) {   
    const configStore = useConfigurationStore();
    configStore.ctv_small_limit = ctv_small_limit;
    configStore.ctv_big_limit = ctv_big_limit;
    configStore.sov_limit = sov_limit;
    configStore.site_limit = site_limit;
    configStore.heli_visibility_limit = heli_visibility_limit;
    configStore.heli_cloudnbase_limit = heli_cloudbase_limit;
}