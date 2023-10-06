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
import { usePresetStore } from '~/stores/PresetStore';

export default {
  components: {
    Logo,
    ClickableBox,
  },
  data() {
    return {
      presetBoxData: {
        iconName: "PresetsIcon",
        title: 'Preset Page',
        description: 'Choose from a wide variety of operation presets.',
      },
      customizationBoxData: {
        iconName: "CustomizationIcon",
        title: 'Customization Page',
        description: 'Create your own operation or model an existing one.',
      },
    };
  },
  mounted() {
    usePresetStore().setSelectedPreset(null);
  },
};
</script>

<style>
.centered-boxes {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 84vh;
}
</style>
