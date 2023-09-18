<template>
  <div class="overlay" @click="hideModal">
    <div class="modal rounded-lg flex-col">
      <h3 class="font-semibold">Update Team</h3>
      <div class="py-5 flex flex-col flex-wrap content-normal">
        <div class="border-2 border-dashed rounded-md h-56 flex flex-col justify-center items-center">
          <h3 class="text-center">
            Drag & drop your <br />
            team image
          </h3>
          <IconsDrop />
        </div>
        <div class="create-input">
          <label for="id">Id: </label>
          <input type="text" v-model="this.teamRef.id" class="border-2 rounded-md text-left" disabled />
        </div>
        <div class="create-input">
          <label for="name">Name: </label>
          <input type="text" v-model="teamRef.name" class="border-2 rounded-md text-center" />
        </div>
        <div class="create-input whitespace-nowrap">
          <label for="numberOfPersons">Number of persons: </label>
          <input type="text" v-model="teamRef.numberOfPersons" class="border-2 rounded-sm text-center" />
        </div>
        <div class="create-input whitespace-nowrap">
          <label for="shiftPeriod">Shift period: </label>
          <input type="text" v-model="teamRef.shiftPeriod" class="border-2 rounded-sm text-center" />
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
  </div>
</template>
  
<script>
import { useTeamStore } from "~/stores/TeamStore";



export default {
  name: "UpdateTeamModal",
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
      console.log('Updated team: ', this.teamRef);
      await store.put(this.teamRef);
      this.$emit("hideModal");
    },
  },
};
</script>
  