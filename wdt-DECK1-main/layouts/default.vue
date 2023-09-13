<template>
  <div class="flex">
    <div class="main-content py-5 pr-5 h-screen w-full">
      <router-view presets />
      

    </div>
  </div>
</template>

<script>
import StartScreen from '@/components/StartScreen.vue';

export default {
  components: {
    StartScreen,
  },
};
</script>