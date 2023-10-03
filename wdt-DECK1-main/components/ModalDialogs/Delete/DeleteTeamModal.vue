<template>
    <div class="overlay" @click="hideModal">
      <div class="modal rounded-lg flex-col">
        <h3 class="font-semibold">Delete Team</h3>
        <div class="py-5 flex flex-col flex-wrap content-normal">
            <h3 class="text-center w-auto my-5">
              Are you sure you want to delete this team?

            </h3>
            
          </div>
        <div class="flex w-full justify-end">
          <button
            type="submit"
            class="border-2 rounded-md px-2"
            @click="handleCancelClick"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="rounded-md px-2 ml-2 action-button"
            @click="handleSaveClick"
          >
            Delete
          </button>
          </div>
        </div>
       </div>
  </template>
  
  <script>
  import { useTeamStore } from "~/stores/TeamStore";
  

  
  export default {
    name: "DeleteTeamModal",
    props: {
      team: {
        type: Object,
        required: true,
      }
    },
    setup(props) {
      const teamRef = ref(props.team);

      return {
        teamRef,
      }
    },
    methods: {
      handleCancelClick() {
        this.$emit("hideModal");
      },
      async handleSaveClick() {
        const store = useTeamStore();
        await store.delete(this.teamRef);
        this.$emit("hideModal");
      },
    },
  };
  </script>
  