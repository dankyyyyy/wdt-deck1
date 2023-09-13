<template>
  <div class="preset-selector">
    <NuxtLink to="/">
      <IconsLogoInverted class="inline-block align-middle w-full" />
    </NuxtLink>
    <div class="grid">
      <div
        v-for="preset in presets"
        :key="preset.id"
        :class="['preset-box', { 'selected': preset.selected }]"
        @click="toggleSelect(preset)"
      >
        <div class="box-content">
          <NuxtLink to="/">
            <IconsLogoInverted class="box-image inline-block align-middle w-full" />
          </NuxtLink>
          <div class="box-title">{{ preset.title }}</div>
          <div class="box-text"> 
            <div v-for="(line, lineIndex) in preset.text" :key="line">
              {{ line }}
              <hr v-if="lineIndex !== preset.text.length - 1"/> <!-- The horizonal divider between the text lines is added here --> </div>
          </div>
        </div>
      </div>
    </div>
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
export default {
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
        // Add more presets as needed
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
        this.$router.push('/next-page');
      }
    },
  },
};
</script>

<!-- CSS styles moved to main.css; Import where needed and remove the following block -->

<style scoped>

.grid {
  display: flex;
  flex-wrap: wrap;
}

.preset-box {
  width: 30%;
  margin: 1%;
  border: 3px solid black;
  border-radius: 25px;
  background-color: #f5f5f5;
  cursor: pointer;
}

.selected {
  background-color: rgba(173, 216, 230, 0.25); /* Change to DECK1 Blue with 25% opacity */
}

.box-content {
  /* Add box content styles */
}

.box-image {
  max-width: 100%;
  margin-bottom: 3%;
}

.box-title {
  text-align: center;
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 2%;
  /* Add title styles */
}

.box-text {
  font-size: 1em;
  text-align: center;
  margin-left: 40px;
  margin-right: 40px; 
  /* Add text styles */
}

.box-text hr {
  height: 2px; /*Width of the line*/
  background-color: #000; 
  margin: 0 auto; /* Centers the line */
  width: 70%; /* Length of the line*/
  opacity: 70%;
}


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
