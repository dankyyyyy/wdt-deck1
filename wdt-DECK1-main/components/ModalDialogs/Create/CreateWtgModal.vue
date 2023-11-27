<template>
    <div class="overlay" @click="hideModal">
        <div class="modal rounded-lg flex-col" style="max-height: 80%; overflow-y: scroll; overflow-x: hidden;">
            <h3 class="font-semibold box-title">WTG Creation</h3>
            <div class="py-5 flex flex-col flex-wrap content-normal">
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
import { isNumeric } from "~/utils/chartUtils";
import { showError } from "~/utils/globalErrorHandling";

export default {
    name: "CreateWtgModal",
    data() {
        return {
            wtg: {
                _id: null,
                name: "",
                limit: 0,
            },
        };
    },
    methods: {
        handleCancelClick() {
            this.$emit("hideModal");
        },
        async handleSaveClick() {
            await this.validateWtg(this.wtg);
        },
        async isADupe(wtg) {
            const wtgs = await useWindTurbineGeneratorStore().getAll();
            var isADupe = false;

            for (let i = 0; i < wtgs.length; i++) {
                if (wtgs[i].name === wtg.name) {
                    isADupe = true;
                    break;
                }
            }
            return isADupe;
        },
        async validateWtg(wtg) {
            if (await this.isADupe(wtg)) {
                showError("Name already taken, please select a different one.");
            } else if (
                wtg.name === "" ||
                wtg.windSpeedLimit === "" ||
                wtg.plannedMaintenance === "" ||
                wtg.troubleshootVisits === "" ||
                wtg.averageTsHours === ""
            ) {
                showError("Please make sure all fields are filled in.");
            } else if (
                !isNumeric(wtg.windSpeedLimit) ||
                !isNumeric(wtg.plannedMaintenance) ||
                !isNumeric(wtg.troubleshootVisits) ||
                !isNumeric(wtg.averageTsHours)
            ) {
                showError("Please make sure all attributes except for name are numerical.");
            } else {
                const store = useWindTurbineGeneratorStore();
                await store.post(wtg);
                this.$emit("hideModal");
            }
        }
    },
}
</script>
  