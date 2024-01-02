<template>
    <div v-if="visible" class="tooltip" :style="{ top: position.y + 'px', left: position.x + 'px' }">
      lat: {{ lat.toFixed(4) }}, lon: {{ lon.toFixed(4) }}
    </div>
  </template>
  
  <script>
  export default {
    props: {
      lat: {
        type: Number,
        required: true
      },
      lon: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        visible: false,
        position: { x: 0, y: 0 }
      };
    },
    methods: {
      showTooltip(event) {
        this.position = { x: event.clientX, y: event.clientY };
        this.visible = true;
      },
      hideTooltip() {
        this.visible = false;
      }
    }
  };
  </script>
  
  <style>
  .tooltip {
    position: fixed;
    padding: 10px;
    background: white;
    border: 1px solid black;
    border-radius: 5px;
    pointer-events: none;
    z-index: 1000;
  }
  </style>
  