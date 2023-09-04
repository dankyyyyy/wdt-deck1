<template>
    <div class="bg-blue w-full deck-frame-white flex-col">
        <div class="padding-6">Asset configuration</div>
        <div class="justify-items-stretch flex">
            <label>WDT threshold:</label>
            <input type="range" min="0" max="100" step="5" v-model="wdtThreshold" />
            {{ wdtThreshold }}
        </div>
        <div class="font-bold">Significant Wave Height Limit (m)</div>
        <div class="justify-items-stretch flex">
            <label>Small CTV</label>
            <input type="number" min="0" v-model="ctv_small_limit" @change="handleLimitChange()" />
        </div>
        <div class="justify-items-stretch inline-flex">
            <label>Big CTV</label>
            <input type="number" min="0" v-model="ctv_big_limit" @change="handleLimitChange()" />
        </div>
        <div class="justify-items-stretch flex">
            <label>SOV</label>
            <input type="number" min="0" v-model="sov_limit" @change="handleLimitChange()" />
        </div>
        <div class="justify-items-stretch flex">
            <label>Site</label>
            <input type="number" min="0" v-model="site_limit" @change="handleLimitChange()" />
        </div>
        <div class="justify-items-stretch flex">
            <label>Helicopter Visibility</label>
            <input type="number" min="0" v-model="heli_visibility_limit" @change="handleLimitChange()" />
        </div>
        <div class="justify-items-stretch flex">
            <label>Helicopter Cloudbase</label>
            <input type="number" min="0" v-model="heli_cloudbase_limit" @change="handleLimitChange()" />
        </div>
    </div>
</template>

<script>

import { updateChart } from '~/utils/updateChart.js'

export default {
    data() {
        return {
            wdtThreshold: 0,
            ctv_small_limit: 1.5,
            ctv_big_limit: 1.75,
            sov_limit: 2.75,
            site_limit: 18,
            heli_visibility_limit: 5,
            heli_cloudbase_limit: 1,
        };
    },
    methods: {
        handleLimitChange() {
            updateChart(
                this.ctv_small_limit,
                this.ctv_big_limit,
                this.sov_limit,
                this.site_limit,
                this.heli_visibility_limit,
                this.heli_cloudbase_limit);
        }
    }
};
</script>