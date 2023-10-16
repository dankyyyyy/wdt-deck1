<template>
  <div class="w-full h-full">
    <NuxtLink to="/">
      <IconsLogoInverted class="inline-block align-middle w-full" />
    </NuxtLink>
    <div class="flex w-full justify-between p-5">
      <h1 class="text-2xl font-semibold">Teams</h1>
      <IconsAdd @click="showModal" class="cursor-pointer" />
    </div>
    <div class="flex flex-col p-5">
      <h2 class="text-lg font-semibold w-full pl-5">Available teams</h2>

      <ModalDialogsCreateTeamModal v-if="isModalVisible" @hideModal="hideModal" />
      <div v-if="!loading" class="grid">
        <div v-for="team in teams" :key="team._id">
          <CardsTeamCard :team="team" />
        </div>
      </div>
      <div v-else>
        Loading data...
      </div>
    </div>
  </div>
</template>
  
<script>
import { useTeamStore } from "~/stores/TeamStore";

export default {
  name: "TeamList",
  data() {
    return {
      teams: [],
      isModalVisible: false,
      loading: true,
    };
  },
  async mounted() {
    this.teams = await useTeamStore().getAll()
    this.teams.length == 0 ? "" : this.loading = false;
  },
  async updated() {
    this.teams = await useTeamStore().getAll()
    this.teams.length == 0 ? "" : this.loading = false;
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    hideModal() {
      this.isModalVisible = false;
    },
    handleTeamSelected(team) {
      useTeamStore().setSelectedTeam(team);
    },
    handleTeamDeselected() {
      useTeamStore().setSelectedTeam(null);
    },
  },
};
</script>
  