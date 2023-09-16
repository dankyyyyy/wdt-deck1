<template>
  <div class="preset-selector">
    <NuxtLink to="/">
      <IconsLogoInverted class="inline-block align-middle w-full" />
    </NuxtLink>
    <PresetGrid :presets="presets" @toggle-select="toggleSelect" />
    <button
      class="action-button"
      :class="{ 'active': selectedPresets.length > 0 }"
      @click="navigateToNextPage"
    >
        <IconsDoneTick class="flex items-center justify-center inline-block align-middle w-full"/>
    </button>
  </div>
</template>

<script>
import PresetGrid from './PresetGrid.vue';

export default {
  components: {
    PresetGrid
  },
  data() {
    return {
      presets: [
      {
          id: 1,
          image: 'Logo.jpg',
          title: 'Preset',
          text: ['Location',
                  'Helicopers',
                  'Vessels',
                  'WTGs'],
          selected: false,
        },
        {
          id: 2,
          image: 'Logo.jpg',
          title: 'Preset',
          text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'],
          selected: false,
        },
        {
          id: 3,
          image: 'Logo.jpg',
          title: 'Preset',
          text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'],
          selected: false,
        },
        {
          id: 4,
          image: 'Logo.jpg',
          title: 'Preset',
          text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'],
          selected: false,
        },
        {
          id: 5,
          image: 'Logo.jpg',
          title: 'Preset',
          text: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'],
          selected: false,
        },
      ],
    };
  },
  computed: {
    selectedPresets() {
      return this.presets.filter(preset => preset.selected);
    },
  },
  methods: {
    toggleSelect(preset) {
      if (preset.selected) {
        preset.selected = false; // Deselect the clicked preset
      } else {
        this.presets.forEach(p => {
          p.selected = false; // Deselect all presets
        });
        preset.selected = true; // Select the clicked preset
      }
    },
    navigateToNextPage() {
      if (this.selectedPresets.length > 0) {
        // Set this to the [CalculationsPage]
        this.$router.push('/weatherDownTime');
      }
    },
  },
};
</script>
