<template>
    <div class="grid">
      <div
        v-for="preset in presets"
        :key="preset.id"
        :class="['preset-box', { 'selected': preset.selected }]"
        @click="toggleSelect(preset)"
      >
        <div class="box-content">
            <IconsLogoInverted class="box-image inline-block align-middle w-full" />  
          <div class="box-title">{{ preset.title }}</div>
          <div class="box-text"> 
            <div v-for="(line, lineIndex) in preset.text" :key="line">
              {{ line }}
              <hr v-if="lineIndex !== preset.text.length - 1"/> <!-- The horizonal divider between the text lines is added here -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      presets: Array
    },
    methods: {
      toggleSelect(preset) {
        this.$emit('toggle-select', preset);
      }
    }
  };
  </script>
  
    <!-- All other styles have been moved to main.css but the grid stays cause it no workie otherwise -->

  <style scoped>
  .grid {
    display: flex;
    flex-wrap: wrap;
  }
  </style>
  