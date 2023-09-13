<template>
  <div class="start-screen no-scroll">
      <NuxtLink to="/">
        <IconsLogoInverted class="inline-block align-middle w-full" />
      </NuxtLink>
    <div class="centered-boxes">
      <ClickableBox redirectPath="/presets" :boxData="presetBoxData" />
      <ClickableBox redirectPath="/customization" :boxData="customizationBoxData" />
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
