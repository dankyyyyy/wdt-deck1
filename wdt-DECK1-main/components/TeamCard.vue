<template>
  <div class="w-50 h-min deck-frame-white">
    <div class="w-full h-40 flex justify-center items-center">
      Place for image
    </div>
    <div class="w-full border-t-2 border-black p-2">
      <div class="flex justify-between">
        <h2 class="font-semibold text-lg mb-2">{{ team.name }}</h2>
        <IconsCardOptions />
      </div>
      <div class="create-input whitespace-nowrap">
            <label for="numberofpersons">Name: </label>
            <input
              type="text"
              v-model="team.name"
              class="border-2 rounded-sm text-center"
              />
              </div>
      <div class="create-input whitespace-nowrap">
            <label for="numberofpersons">Number of persons: </label>
            <input
              type="text"
              v-model="team.numberofPersons"
              class="border-2 rounded-sm text-center"
              />
              </div>
              <div class="create-input whitespace-nowrap">
            <label for="shiftPeriod">Shift period: </label>
            <input
              type="text"
              v-model="team.shiftPeriod"
              class="border-2 rounded-sm text-center"
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
};
</script>
