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
      Go
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

<!-- Styles have been moved to main.css but i can't import them for the life of me. help.
  [I think it actually works for this but the PresetGrid.vue import is defo hecked] -->

<style>

.action-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #575757; /* Grey color as it's inactive by default */
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.5em;
  width: 60px;
  height: 60px;
  cursor: pointer;
}

.active {
  background-color: #4caf50;
}

</style>
