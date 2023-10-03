<template>
    <div class="overlay" @click="hideModal">
        <div class="modal rounded-lg flex-col">
            <h3 class="font-semibold">Delete Asset</h3>
            <div class="py-5 flex flex-col flex-wrap content-normal">
                <h3 class="text-center w-auto my-5">
                    Are you sure you want to delete this preset?

                </h3>

            </div>
            <div class="flex w-full justify-end">
                <button type="submit" class="border-2 rounded-md px-2" @click="handleCancelClick">
                    Cancel
                </button>
                <button type="submit" class="rounded-md px-2 ml-2 action-button" @click="handleSaveClick">
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>
  
<script>
import { usePresetStore } from '~/stores/PresetStore';



export default {
    name: "DeletePresetModal",
    props: {
        preset: {
            type: Object,
            required: true,
        }
    },
    setup(props) {
        const presetRef = ref(props.preset);

        return {
            presetRef,
        }
    },
    methods: {
        handleCancelClick() {
            this.$emit("hideModal");
        },
        async handleSaveClick() {
            const store = usePresetStore();
            await store.delete(this.presetRef);
            this.$emit("hideModal");
        },
    },
};
</script>
  