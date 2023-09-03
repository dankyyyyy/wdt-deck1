<template>
  <div class="clickable-box" @click="redirectToPage">
    <!-- Box content -->
    <div class="box-content">
      <div class="box-title">{{ boxData.title }}</div>
      <div class="box-description">{{ boxData.description }}</div>
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

<style>
.clickable-box {
  /* Box styles */
  cursor: pointer; /* Add a pointer cursor to indicate it's clickable */
  width: 500px; /* Set the width */
  height: 300px; /* Set the height */
  border: 3px solid #000; /* Add a 3px black border */
  background-color: #97979791; /* Light gray background color */
  margin: 10px; /* Add margin to separate the boxes */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  
  /* Add border-radius for rounded corners */
  border-radius: 30px; /* Adjust the value to control the roundness */
}

/* Style for box title and description */
.box-content {
  padding: 20px;
}

.box-title {
  font-size: xx-large;
  font-weight: bold;
  margin-bottom: 8px;
}

.box-description {
  font-size: large;
  color: #383838;
}
</style>
