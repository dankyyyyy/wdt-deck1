<template>
    <div class="overlay" @click="hideModal">
        <div class="modal rounded-lg flex-col">
            <h3 class="font-semibold">Update a Location</h3>
            <div class="py-5 flex flex-col flex-wrap content-normal">

                <div class="border-2 border-dashed rounded-md h-56 flex flex-col justify-center items-center">
                    <h3 class="text-center">
                        Drag & drop your <br />
                        location image
                    </h3>
                    <IconsDrop />
                </div>

                <div class="update-input">
                    <label for="name">Name: </label>
                    <input type="text" v-model="locationRef.name" class="border-2 rounded-md text-center" />
                </div>

                <div class="update-input">
                    <label for="latitude">Latitude: </label>
                    <input type="number" v-model="locationRef.latitude" class="border-2 rounded-md text-center" />
                </div>

                <div class="update-input">
                    <label for="longitude">Longitude: </label>
                    <input type="number" v-model="locationRef.longitude" class="border-2 rounded-md text-center" />
                </div>

                <div class="update-input">
                    <label for="limit">Limit: </label>
                    <input type="number" v-model="locationRef.limit" class="border-2 rounded-md text-center" />
                </div>
                <div class="update-input">
                    <label for="limit">WTG: </label>
                    <input type="number" v-model="locationRef.wtg" class="border-2 rounded-md text-center" />
                </div>
            </div>

            <div class="flex w-full justify-end">
                <button type="submit" class="border-2 rounded-md px-2" @click="handleCancelClick">
                    Cancel
                </button>

                <button type="submit" class="rounded-md px-2 ml-2 action-button" @click="handleSaveClick">
                    Save
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { useLocationStore } from "~/stores/LocationStore";


export default {
    name: "UpdateLocationModal",
    props: {
        location: {
            type: Object,
            required: true,
        }
    },
    setup(props) {
        const locationRef = ref(props.location);

        return {
            locationRef,
        }
    },
    methods: {
        handleCancelClick() {
            this.$emit("hideModal");
        },
        async handleSaveClick() {
            const store = useLocationStore();
            console.log(this.locationRef);
            await store.put(this.locationRef);
            this.$emit("hideModal");
        },
    },
};
</script>