<template>
    <div class="presets-screen">
      <h1>Presets Page</h1>
      <carousel :per-page="3">
        <!-- Mock data for tiles -->
        <div v-for="preset in presets" :key="preset.id" class="preset-tile">
          {{ preset.name }}
        </div>
      </carousel>
    </div>
  </template>
  
  <script>
  import VueCarousel from 'vue-carousel';
  
  export default {
    components: {
      carousel: VueCarousel.Carousel,
    },
    data() {
      return {
        presets: [
          { id: 1, name: 'Mock Preset 1' },
          { id: 2, name: 'Mock Preset 2' },
          { id: 3, name: 'Mock Preset 3' },
          // Add more mock data as needed
        ],
      };
    },
  };
  </script>
  
  <style>
  .presets-page {
    padding: 20px;
  }
  
  .preset-tile {
    width: 300px;
    height: 200px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }
  </style>
  