<template>
  <div>
    <NuxtLink to="/">
        <IconsLogoInverted class="inline-block align-middle w-full" />
    </NuxtLink>
    <PresetGrid
      :presets="presets"
      @toggle-select="toggleSelect"
    />
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
      presets: [ /* Your presets data here */ ],
      selectedPresets: [],
      objects: [ /* Your objects data here, including presetId */ ],
      objectsByPresetId: {}
    };
  },

  async mounted() {
    this.fetchObjects(); // Call the method to fetch objects
  },

  methods: {
    async fetchObjects() {
      try {
        // Fetch locations
        const locationsResponse = await fetch('~/server/api/locations/index.get.ts');
        const locationsData = await locationsResponse.json();

        // Fetch assets
        const assetsResponse = await fetch('~/server/api/assets/index.get.ts');
        const assetsData = await assetsResponse.json();

        // Merge locations and assets into objects
        this.objects = [...locationsData, ...assetsData];

        // Group objects by presetId
        this.groupObjectsByPresetId();
      } catch (error) {
        console.error('Error fetching objects:', error);
      }
    },
    groupObjectsByPresetId() {
      this.objectsByPresetId = this.objects.reduce((acc, obj) => {
        if (!acc[obj.presetId]) {
          acc[obj.presetId] = [];
        }
        acc[obj.presetId].push(obj);
        return acc;
      }, {});
    },
    toggleSelect(preset) {
      this.$set(preset, 'selected', !preset.selected);
      if (preset.selected) {
        this.selectedPresets.push(preset);
      } else {
        const index = this.selectedPresets.findIndex(p => p.id === preset.id);
        if (index !== -1) this.selectedPresets.splice(index, 1);
      }
    },
    confirmSelection() {
      const selectedObjects = this.selectedPresets.flatMap(preset => preset.objects);
      // Duplicates the selected objects

      // Pass duplicates to next page
      this.$router.push({
        path: 'pages/weatherDownTime.vue', //TODO update path or change/remove this segment entirely
        query: { duplicates: JSON.stringify(duplicates) }
      });
    }
  }
}
</script>
