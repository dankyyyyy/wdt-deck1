<template>
  <div class="flex">
    <div class="sidebar-container p-5 h-screen">
      <Sidebar />
    </div>
    <div class="main-content py-5 pr-5 h-min">
      <slot />
    </div>
  </div>
</template>
