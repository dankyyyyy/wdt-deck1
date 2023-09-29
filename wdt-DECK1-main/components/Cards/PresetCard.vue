<template>
    <div class="w-70 h-min deck-frame-white">
        <div class="w-full h-40 flex justify-center items-center">
            Place for image
        </div>
        <div class="w-full border-t-2 border-black p-2">
            <div class="flex justify-between">
                <h2 class="font-semibold text-lg mb-2">{{ preset.name }}</h2>
            </div>

            <div class="flex justify-between">
                <label for="location">Location: </label>
                <p class="w-min whitespace-nowrap">{{ preset.location.name }}</p>
            </div>

            <div class="flex justify-between">
                <label for="wtg">WTG (Model): </label>
                <p class="w-min whitespace-nowrap">{{ preset.wtg.name }}</p>
            </div>

            <div class="flex justify-between">
                <label for="asset1">Asset1: </label>
                <p class="w-min whitespace-nowrap">{{ preset.asset1.name }}</p>
            </div>

            <div class="flex justify-between">
                <label for="asset2">Asset2: </label>
                <p class="w-min whitespace-nowrap">{{ preset.asset2.name }}</p>
            </div>

            <div class="flex justify-between">
                <label for="team1">Team1: </label>
                <p class="w-min whitespace-nowrap">{{ preset.team1.name }}</p>
            </div>

            <div class="flex justify-between">
                <label for="team2">Team1: </label>
                <p class="w-min whitespace-nowrap">{{ preset.team2.name }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PresetCard",
    props: {
        preset: {
            type: Object,
            required: true,
        }
    },
}
</script>