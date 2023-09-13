<template>
  <!-- Apply the .clickable-box class to the outer div -->
  <div class="clickable-box" @click="redirectToPage">
    <!-- Box content -->
    <div class="box-content">
      <!-- Icon above the title -->
      <i class="clickable-box-icon">Icon</i>
      <div class="clickable-box-text">
        <div class="clickable-box-title">{{ boxData.title }}</div>
        <div class="clickable-box-description">{{ boxData.description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    redirectToPage() {
      // Use Vue Router to navigate to the desired page
      this.$router.push(this.redirectPath);
    },
  },
  props: {
    redirectPath: String, // Path to the page to redirect to
    boxData: Object, // Mock data for the box
  },
};
</script>