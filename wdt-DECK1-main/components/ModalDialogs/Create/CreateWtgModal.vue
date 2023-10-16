<template>
    <div class="overlay" @click="hideModal">
        <div class="modal rounded-lg flex-col" style="max-height: 80%; overflow-y: scroll; overflow-x: hidden;">
            <h3 class="font-semibold">WTG creation</h3>
            <div class="py-5 flex flex-col flex-wrap content-normal">
                <div class="border-2 border-dashed rounded-md h-56 flex flex-col justify-center items-center">
                    <h3 class="text-center">
                        Drag & drop your <br />
                        asset image
                    </h3>
                    <IconsDrop />
                </div>

                <div class="create-input">
                    <label for="id">Id: </label>
                    <input type="text" v-model="this.wtg.id" class="border-2 rounded-md text-left" disabled />
                </div>

                <div class="create-input">
                    <label for="name">Name: </label>
                    <input type="text" v-model="wtg.name" class="border-2 rounded-md text-center" />
                </div>

                <div class="create-input whitespace-nowrap">
                    <label for="windSpeedLimit">Wind Speed Limit: </label>
                    <input type="text" v-model="wtg.windSpeedLimit" class="border-2 rounded-md text-center " />
                    <label for="windSpeedLimit"> m/s</label>
                </div>

                <div class="create-input whitespace-nowrap">
                    <label for="limit">Planned Maintenance: </label>
                    <input type="text" v-model="wtg.plannedMaintenance" class="border-2 rounded-md text-center" />
                    <label for="plannedMaintenance"> h/WTG</label>
                </div>

                <div class="create-input whitespace-nowrap">
                    <label for="limit">Troubleshoot Visits: </label>
                    <input type="text" v-model="wtg.troubleshootVisits" class="border-2 rounded-md text-center" />
                    <label for="troubleshootVisits"> /WTG</label>
                </div>

                <div class="create-input whitespace-nowrap">
                    <label for="limit">Average TS hours: </label>
                    <input type="text" v-model="wtg.averageTsHours" class="border-2 rounded-md text-center" />
                    <label for="averageTsHours"> h</label>
                </div>
            </div>
            <div class="flex w-full justify-end">
                <button type="submit" class="border-2 rounded-md px-2" @click="handleCancelClick">
                    Cancel
                </button>
                <button type="submit" class="rounded-md px-2 ml-2 dialog-button" @click="handleSaveClick">
                    Save
                </button>
            </div>
        </div>
    </div>
</template>
  
<script>
import { useWindTurbineGeneratorStore } from '~/stores/WindTurbineGeneratorStore';

export default {
    name: "CreateAssetModal",
    data() {
        return {
            wtg: {
                name: "",
            },
        };
    },
    methods: {
        handleCancelClick() {
            this.$emit("hideModal");
        },
        async handleSaveClick() {
            const store = useWindTurbineGeneratorStore();
            await store.post(this.wtg);
            this.$emit("hideModal");
        },
    },
};
</script>
  