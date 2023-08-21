<template>
  <div
    class="w-full h-full deck-frame-white content-center transition-all duration-500 ease-in-out items-center"
    :class="{ 'bg-transparent shadow-none': hideRecommendation }"
  >
    <IconsIdea class="inline-block" :class="{ hidden: hideRecommendation }" />
    <p
      class="text-black pl-4 transition-all duration-500 ease-in-out"
      :class="{ 'text-transparent': hideRecommendation }"
    >
      Click
      <span
        class="click-here"
        :class="{ 'text-transparent': hideRecommendation }"
        >here</span
      >
      to get recommendation for relocating assets to minimize costs...
    </p>
  </div>
</template>

<script>
import { useFilterStore } from "~/stores/FilterStore";

export default defineComponent({
  setup() {
    const filterStore = useFilterStore();
    const hideRecommendation = computed(() => filterStore.hideRecommendation);
    const removeBackground = "bg-transparent shadow-none";

    return {
      hideRecommendation,
      removeBackground,
    };
  },
});
</script>
