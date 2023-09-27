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
    <SidebarItem path="/assets" text="Assets" />
    <SidebarItem path="/locations" text="Locations" />
    <SidebarItem path="/teams" text="Teams" />
  </div>
</template>
