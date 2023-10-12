<template>
  <div class="deck-sidebar w-full h-full">
    <div class="p-5">
      <NuxtLink to="/">
        <IconsLogo class="inline-block align-middle w-full" />
      </NuxtLink>
    </div>

    <SidebarItem path="/weatherDownTime" text="Weather Down Time" />
    <SidebarItem path="/financialFeasibility" text="Financial Feasibility" />
    <SidebarItem path="/availability" text="Availability"/>
    <!-- <SidebarItem path="/pricePerWtg" text="Price Per WTG"/> -->
    <!-- <SidebarItem path="/presets" text="Presets"/>
    <SidebarItem path="/assets" text="Assets" />
    <SidebarItem path="/locations" text="Locations" />
    <SidebarItem path="/teams" text="Teams" /> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPath: String,
    };
  },
  onMounted() {
    this.currentPath = window.location.pathname;
  },
  computed: {
    showSidebar() {
      const pathsWhereVisible = ["/weatherDownTime", "/financialFeasibility", "/availability"];
      return pathsWhereVisible.includes(this.currentPath);
    }
  }
}
</script>