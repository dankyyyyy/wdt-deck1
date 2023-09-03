<template>
  <div class="start-screen">
    <Logo />
    <div class="centered-boxes">
      <ClickableBox redirectPath="/presetPage" :boxData="presetBoxData" />
      <ClickableBox redirectPath="/customizationPage" :boxData="customizationBoxData" />
    </div>
  </div>
</template>

<script>
import Logo from './icons/Logo.vue';
import ClickableBox from './ClickableBox.vue';

export default {
  components: {
    Logo,
    ClickableBox,
  },
  data() {
    return {
      presetBoxData: {
        title: 'Preset Page',
        description: 'Click to go to the preset page.',
      },
      customizationBoxData: {
        title: 'Customization Page',
        description: 'Click to go to the customization page.',
      },
    };
  },
};
</script>

<style>
.centered-boxes {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
