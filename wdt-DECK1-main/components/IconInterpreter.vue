
<!-- 
  -=EXPLANATION=-

  SVG paths can be added here and assigned names. 
  The IconInterpreter component then needs to be imported into the component where the icons need to be populated.
  See ClickableBox.vue and StartScreen.vue for an example. :)

-->

<template>

  <!------------------
   Start Page Section 
  ------------------->

  <!-- PresetsPage Box Icon -->
  <svg v-if="iconName === 'PresetsIcon'" class="clickable-box-icon" xmlns="http://www.w3.org/2000/svg" width="7.986em" height="7.986em" viewBox="0 0 24 24">
    <path fill="currentColor" d="m22 3-1.67 1.67L18.67 3 17 4.67 15.33 3l-1.66 1.67L12 3l-1.67 1.67L8.67 3 7 4.67 5.33 3 3.67 4.67 2 3v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V3zM11 19H4v-6h7v6zm9 0h-7v-2h7v2zm0-4h-7v-2h7v2zm0-4H4V8h16v3z"/>
  </svg>

  <!-- CustomizationPage Box Icon -->
  <svg v-if="iconName === 'CustomizationIcon'" class="clickable-box-icon" xmlns="http://www.w3.org/2000/svg" width= "7.986em" height="7.986em" viewBox="0 0 24 24">
    <path fill="currentColor" d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/>
  </svg>

<!-- Maybe we should move all icons here and centralize? -->

</template>

<script>
export default {
  props: {
    iconName: String
  }
}
</script>
