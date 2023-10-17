<template>
  <div class="overlay" @click="hideModal">
    <div class="modal rounded-lg flex-col">
      <h3 class="font-semibold box-title">Team Creation</h3>
      <div class="py-5 flex flex-col flex-wrap content-normal">
        <div class="create-input">
          <label for="name">Name: </label>
          <input type="text" v-model="team.name" class="border-2 rounded-md text-center" />
        </div>
        <div class="create-input whitespace-nowrap">
          <label for="numberOfPersons">Number of persons: </label>
          <input type="text" v-model="team.numberOfPersons" class="border-2 rounded-sm text-center" />
        </div>
        <div class="create-input whitespace-nowrap">
          <label for="shiftPeriod">Shift period: </label>
          <input type="text" v-model="team.shiftPeriod" class="border-2 rounded-sm text-center" />
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
  </div>
</template>

<script>
import { useTeamStore } from "~/stores/TeamStore";
import { showError } from "~/utils/globalErrorHandling";
import { isNumeric } from "~/utils/chartUtils";

export default {
  name: "CreateTeamModal",
  data() {
    return {
      team: {
        numberOfPersons: "",
        shiftPeriod: "",
      },
    };
  },
  methods: {
    handleCancelClick() {
      this.$emit("hideModal");
    },
    async handleSaveClick() {
      await this.validateTeam(this.team);
    },
    async isADupe(team) {
      var isADupe = false;
      const teams = await useTeamStore().getAll();

      for (let i = 0; i < teams.length; i++) {
        if (teams[i].name === team.name) {
          isADupe = true;
          break;
        }
      }
      return isADupe;
    },
    async validateTeam(team) {
      if (await this.isADupe(team)) {
        showError("Name already taken, please select a different one.");
      } else if (
        !isNumeric(team.numberOfPersons) ||
        !isNumeric(team.shiftPeriod)
      ) {
        showError("Please make sure all attributes except for name are numerical.");
      } else if (
        team.name === "" ||
        team.numberOfPersons === null ||
        team.shiftPeriod === null
      ) {
        showError("Please make sure all fields are filled in.");
      } else {
        const store = useTeamStore();
        await store.post(team);
        this.$emit("hideModal");
      }
    },
  },
};
</script>
