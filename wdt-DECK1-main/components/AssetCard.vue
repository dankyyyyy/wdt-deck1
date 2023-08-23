<template>
  <div class="w-50 h-min deck-frame-white">
    <div class="w-full h-40 flex justify-center items-center">
      Place for image
    </div>
    <div class="w-full border-t-2 border-black p-2">
      <div class="flex justify-between">
        <h2 class="font-semibold text-lg mb-2">{{ asset.name }}</h2>
        <IconsCardOptions />
      </div>
      <div v-if="asset.category === 'Vessel'" class="flex justify-between">
        <label for="limit">HS limit: </label>
        <p>{{ asset.hs }}m</p>
          <IconsInfo class="" />
      </div>
      <div v-else-if="asset.category === 'Helicopter'">
        <div class="flex justify-between">
          <label for="limit" class="w-min">Cloudbase: </label>
          <p class="w-min">{{ asset.cloudbase }}</p>
        </div>
        <div class="flex justify-between">
          <label for="limit" class="w-min">Visibility: </label>
          <p class="w-min">{{ asset.visibility }}</p>
        </div>
      </div>
      <div v-else-if="asset.category === 'WindTurbineGenerator'">
        <div class ="flex justify-between">
          <label for="limit" class="w-min whitespace-nowrap">Wind speed limit: </label>
          <p class="w-min">{{ asset.windspeedlimit }}</p>
      </div>
      <div class = "flex justify-between">
        <label for="limit" class="w-min whitespace-nowrap">Planned maintenance: </label>
        <p class="w-min">{{ asset.plannedmaintenance }}</p>
      </div>
      <div class = "flex justify-between">
        <label for="limit" class="w-min whitespace-nowrap">Troubleshoot visitings: </label>
        <p class="w-min">{{ asset.troubleshootvisitings }}</p>
      </div>
      <div class = "flex justify-between">
        <label for="limit" class="w-min whitespace-nowrap">Average TS hours:</label>
        <p class="w-min">{{ asset.averagetshours }}</p>
      </div>
    </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "AssetCard",
  props: {
    asset: {
      type: Object,
      required: true,
    },
  },
};
</script>
