<template>
  <div class="grid-container">
    <div class="grid">
      <div class="preset-box">
        <div class="box-content">
          <IconsLogoInverted class="box-image inline-block align-middle w-full" />
          <h2 class="box-title">{{ team.name }}</h2>
          <IconsUpdate @click="showUpdateModal" class="cursor-pointer "></IconsUpdate>
          <ModalDialogsUpdateTeamModal :team="team" v-if="isUpdateModalVisible" @hideModal="hideModal" />
          <IconsDelete @click="showDeleteModal" class="cursor-pointer "></IconsDelete>
          <ModalDialogsDeleteTeamModal :team="team" v-if="isDeleteModalVisible" @hideModal="hideModal" />
        </div>
        <div class="box-text">
          <label for="numberOfPersons">Number of persons: </label>
          <p class="box-text-type">{{ team.numberOfPersons }}m/s</p>
          <hr />
          <label for="shiftPeriod">Shift period: </label>
          <p class="box-text-type">{{ team.shiftPeriod }}m/s</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeamCard",
  props: {
    team: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isUpdateModalVisible: false,
      isDeleteModalVisible: false,
    };
  },
  methods: {
    showUpdateModal() {
      this.isUpdateModalVisible = true;
    },
    showDeleteModal() {
      this.isDeleteModalVisible = true;
    },
    hideModal() {
      this.isUpdateModalVisible = false;
      this.isDeleteModalVisible = false;
    },
  },
};
</script>

<style scoped>
.grid-container {
  display: grid;
  justify-content: center;
}

.grid {
  display: flex;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 16px;
}

.selected {
  background-color: #abd5e5;
  /* Change to DECK1 Blue with 25% opacity */
}
</style>