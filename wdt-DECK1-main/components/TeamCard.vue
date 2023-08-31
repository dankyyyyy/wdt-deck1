<template>
  <div class="w-52 h-auto deck-frame-white">
    <div class="w-full h-40 flex justify-center items-center">
      Place for image
    </div>
    <div class="w-full border-t-2 border-black p-2">
      <div class="flex justify-between">
        <h2 class="font-semibold text-lg mb-2">{{ team.name }}</h2>
      <IconsUpdate @click="showUpdateModal" class="cursor-pointer " ></IconsUpdate>
      <UpdateTeamCard v-if="isUpdateModalVisible" @hideModal="hideModal" />
      <IconsDelete @click="showDeleteModal" class="cursor-pointer " ></IconsDelete>
      <DeleteTeamCard v-if="isDeleteModalVisible" @hideModal="hideModal" />
      </div>
      <div class="">
        <label for="numberofpersons">Number of persons: </label>
          <input
            type="text"
            v-model="team.numberofPersons"
            class="text-center border-2 rounded"
            disabled
            />
             </div>
              <div class="">
              <label for="shiftPeriod">Shift period: </label>
             <input
              type="text"
              v-model="team.shiftPeriod"   
              class="text-center border-2 rounded"  
              disabled            
              />
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
