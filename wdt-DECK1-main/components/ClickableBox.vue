<template>
    <!-- Apply the .clickable-box class to the outer div -->
    <div class="clickable-box" @click="redirectToPage">
      <!-- Box content -->
      <div class="box-content">
        <!-- Icon above the title -->
        <IconInterpreter :iconName="boxData.iconName" class="clickable-box-icon" />
        <div class="clickable-box-text">
          <div class="clickable-box-title">{{ boxData.title }}</div>
          <div class="clickable-box-description">{{ boxData.description }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import IconInterpreter from "./IconInterpreter.vue";
  
  export default {
    components:{
      IconInterpreter
    },
    methods: {
      redirectToPage() {
        this.$router.push(this.redirectPath);
      },
    },
    props: {
      redirectPath: String, // Path to the page to redirect to
      boxData: Object, // Mock data for the box
    },
  };
  </script>
  