<template>
    <div class="grid-container">
        <div class="grid">
            <div class="generic-box tiles-list">
                <div class="box-content">
                    <h3 class="generic-header prompt">Tiles List</h3>
                    <ul>
                        <li v-for="(tile, index) in tileInfoList" :key="index" class="border-b last:border-b-0">
                            <div @click="tile.showDetails = !tile.showDetails"
                                class="cursor-pointer p-4 hover:bg-gray-100 flex items-center justify-between transition">
                                <span>Tile #{{ index + 1 }}</span>
                                <span
                                    :class="{ 'transform rotate-180': tile.showDetails, 'transform rotate-0': !tile.showDetails }"
                                    class="transition-transform">
                                    &#x25BC; <!-- Unicode down arrow, rotates when clicked -->
                                </span>
                            </div>
                            <div v-if="tile.showDetails" class="p-4 bg-gray-50">
                                <div class="text-gray-600">Coordinates: {{ formatCoordinates(tile.coordinates) }}</div>
                                <div class="text-gray-600">Depth: {{ tile.info && tile.info.average_depth ?
                                    `${tile.info.average_depth}m` : 'Not available' }}</div>
                            </div>
                        </li>
                    </ul>


                </div>
                <DeleteButton />
            </div>
        </div>
    </div>
</template>

<script>
import DeleteButton from '~/components/DeleteButton.vue';
import RetryButton from '~/components/RetryButton.vue';

export default {
    components: { DeleteButton, RetryButton }
};
</script>
  
<style scoped>
.grid-container {
    display: grid;
    justify-content: center;
}

.grid {
    display: flex;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 16px;
}
</style>