<template>
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
  
    <!-- Styles have been moved to main.css but i can't import them for the life of me. help. -->

  <style scoped>
  .grid {
    display: flex;
    flex-wrap: wrap;
  }
  
  .preset-box {
    width: 23%;
    margin: 1%;
    border: 3px solid #303f50;
    border-radius: 25px;
    background-color: #f5f5f5;
    cursor: pointer;
  }
  
  .selected {
    background-color: rgba(9, 166, 215, 0.25); /* Change to DECK1 Blue with 25% opacity */
  }
  
  .box-image {
    max-width: 100%;
    margin-bottom: 3%;
    margin-top: 25px;
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
    margin-bottom: 25px;
    /* Add text styles */
  }
  
  .box-text hr {
    height: 2px; /*Width of the line*/
    background-color: #000; 
    margin: 0 auto; /* Centers the line */
    width: 70%; /* Length of the line*/
    opacity: 70%;
  }
  
  </style>
  