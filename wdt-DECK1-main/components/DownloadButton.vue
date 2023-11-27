<template>
    <button class="download-button" :disabled="!isLocationSelected" :class="{ 'location-selected': isLocationSelected }">
        <IconsDownload class="flex items-center justify-center inline-block align-middle w-full" />
    </button>
</template>

<script>
import { useLocationStore } from '~/stores/LocationStore';

export default {
    name: "DownloadButton",
    computed: {
        isLocationSelected() {
            if (useLocationStore().getSelectedLocation() === null) return false
            else return true
        }
    }
}
</script>