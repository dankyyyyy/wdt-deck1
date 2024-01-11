<template>
    <div>
        <NuxtLink to="/">
            <IconsLogoInverted class="inline-block align-middle w-full" />
        </NuxtLink>

        <!-- First Section -->
        <div class="generic-section">
            <h1 class="page-header">Maritime Asset Map</h1>
        </div>

        <!-- Second Section -->
        <div class="generic-section flex section-color-1">
            <h2 class="section-header black">How does it work?</h2>
            <div class="grid info-card-container">
                <!-- Info Cards with pictures and text -->

                <!-- Step 1 - Choose region -->
                <InfoCard :infoText="card1.infoText">
                    <IconsMapFilled class="inline-block align-middle w-full" />
                </InfoCard>

                <!-- Step 2 - Choose type and model of turbine -->
                <InfoCard :infoText="card2.infoText">
                    <IconsWindmillLarge class="inline-block align-middle w-full" />
                </InfoCard>

                <!-- Step 3 - Get a recommendation -->
                <InfoCard :infoText="card3.infoText">
                    <IconsRecommendation class="inline-block align-middle w-full" />
                </InfoCard>
            </div>

            <div class="grid info-card-container">
                <!-- To Powered by -->
                <ButtonCard :infoText="card9.infoText" @click="scrollToSection('third-section')" />

                <!-- To Options -->
                <ButtonCard :infoText="card10.infoText" @click="scrollToSection('fourth-section')" />
            </div>
        </div>

        <!-- Third Section -->
        <div id="third-section" class="generic-section section-color-2">
            <h2 class="section-header white">Powered by:</h2>
            <div class="grid info-card-container">
                <!-- Info Cards for the third section -->

                <!-- CDS -->
                <InfoCard :infoText="card4.infoText">
                    <IconsCopernicusLogo class="inline-block align-middle w-full" />
                </InfoCard>

                <!-- Depth data site -->
                <InfoCard :infoText="card5.infoText">
                    <IconsGebcoLogo class="inline-block align-middle w-full" />
                </InfoCard>

                <!-- Our algorithm -->
                <InfoCard :infoText="card6.infoText">
                    <IconsLogoInvertedLargest class="inline-block align-middle w-full" />
                </InfoCard>

            </div>
        </div>

        <!-- Fourth Section -->

        <div id="fourth-section" class="intermediate-section">
            <h2 class="section-header black">Select installation region:</h2>
        </div>

        <div class="option-section">
            <!-- North Sea -->
            <div class="options-section-left black" @click="selectRegion('north'), scrollToSection('fifth-section')">
                <div class="option-text right">
                    North Sea
                </div>
            </div>
            <!-- Baltic Sea -->
            <div class="options-section-right black" @click="selectRegion('baltic'), scrollToSection('fifth-section')">
                <div class="option-text left">
                    Baltic Sea
                </div>
            </div>
        </div>

        <!-- Fifth Section -->

        <div id="fifth-section" class="intermediate-section">
            <h2 class="section-header black">Select installation type:</h2>
        </div>

        <div class="option-section">
            <!-- Shallow -->
            <div class="options-section-2-first black">
                <div class="option-text center" @click="setType('shallow'), scrollToSection('sixth-section')">
                    Shallow
                </div>
            </div>
            <!-- Transitional -->
            <div class="options-section-2-second black">
                <div class="option-text center" @click="setType('transitional'), scrollToSection('sixth-section')">
                    Transitional
                </div>
            </div>
            <!-- Deepwater -->
            <div class="options-section-2-third black">
                <div class="option-text center" @click="setType('deepwater'), scrollToSection('sixth-section')">
                    Deepwater
                </div>
            </div>
        </div>

        <!-- Sixth Section -->

        <div id="sixth-section" class="intermediate-section">
            <h2 class="section-header black">Our recommendation</h2>
        </div>

        <div class="map-section">
            <LeafletMap ref="leafletMap" />
            <button @click="clearTiles, $emit('clear-tiles')"
                class="delete-button bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:shadow-outline">
                Clear Tiles
            </button>
        </div>

        <button @click="emitClearTilesEvent"
                class="delete-button bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:shadow-outline">
                Clear Tiles
            </button>
            
         <div class="tiles-list">
            <h3 class="text-lg font-semibold text-gray-700 p-4">Tiles List</h3>
            <ul>
                <li v-for="(tile, index) in tileInfoList" :key="index" class="border-b last:border-b-0">
                    <div @click="tile.showDetails = !tile.showDetails"
                        class="cursor-pointer p-4 hover:bg-gray-100 flex items-center justify-between transition">
                        <span>Tile #{{ index + 1 }}</span>
                        <span :class="{ 'transform rotate-180': tile.showDetails, 'transform rotate-0': !tile.showDetails }"
                            class="transition-transform">
                            &#x25BC; <!-- Unicode down arrow, rotates when clicked -->
                        </span>
                    </div>
                    <div v-if="tile.showDetails" class="p-4 bg-gray-50">
                        <div class="text-gray-600">Coordinates: {{ formatCoordinates(tile.coordinates) }}</div>
                        <div class="text-gray-600">Depth: {{ tile.info && tile.info.average_depth ?
                            `${tile.info.average_depth}m` : 'Not available' }}</div>
                        <div class="text-gray-600">Wind Speed: {{ tile.info && tile.info.average_wind_speed ?
                            `${tile.info.average_wind_speed}m/s` : 'Not available' }}</div>
                    </div>
                </li>
            </ul>
        </div>

        <div class="grid intermediate-section">
            <TilesCard />
        </div>

        <div class="grid intermediate-section">

            <!-- Save Recommendation -->
            <TransparentCard :infoText="card7.infoText">
                <RecommendationSaveButton />
            </TransparentCard>

            <!-- Retry Anchor Button -->
            <TransparentCard :infoText="card8.infoText">
                <RetryButton @click="scrollToSection('fourth-section')" />
            </TransparentCard>
        </div>

        <div class="footer">
        </div>

    </div>
</template>

<script>
import InfoCard from '~/components/Cards/InfoCard.vue';
import ButtonCard from '~/components/Cards/ButtonCard.vue';
import TransparentCard from '~/components/Cards/TransparentCard.vue';
import TilesCard from '~/components/Cards/TilesCard.vue';
import LeafletMap from '~/components/LeafletMap.vue';
import RetryButton from '~/components/RetryButton.vue';
import DeleteButton from '~/components/DeleteButton.vue';
import RecommendationSaveButton from '~/components/RecommendationSaveButton.vue';
import { useTileInfoStore } from '@/stores/TilesViabilityStore';
import { getCookie } from '@/utils/cookieHandler';
import { createTile } from '@/utils/tileLogic';

export default {
    components: {
        InfoCard,
        ButtonCard,
        TransparentCard,
        TilesCard,
        LeafletMap,
        RetryButton,
        DeleteButton,
        RecommendationSaveButton,
    },
    setup() {
        const tilesViabilityStore = useTileInfoStore();
        var tiles = ref([]);
        var tileInfoList = ref([]);

        onMounted(async () => {
            const savedTiles = getCookie('tiles');
            const savedTileInfo = getCookie('tileInfo');
            if (savedTiles.length !== 0) {

                tilesViabilityStore.setTilesFromCookie(savedTiles);
                tiles = tilesViabilityStore.getTiles();

                tilesViabilityStore.setTileInfoListFromCookie(savedTileInfo);
                tileInfoList = tilesViabilityStore.getTileInfoList();
            }
        });

        return {
            tiles,
            tileInfoList,
        };
    },

    data() {
        return {
            // Data to be displayed in the info cards is assigned here.
            // For the images, Vue components are used as SVGs.

            //Info Cards
            card1: {
                infoText: 'RegionText',
            },
            card2: {
                infoText: 'Text for Image 2',
            },
            card3: {
                infoText: 'Text for Image 3',
            },
            card4: {
                infoText: 'Text for Image 4',
            },
            card5: {
                infoText: 'Text for Image 5',
            },
            card6: {
                infoText: 'Text for Image 6',
            },

            // Buttons

            card7: {
                infoText: 'Is this the one?',
            },
            card8: {
                infoText: 'Not quite it?',
            },
            card9: {
                infoText: 'Learn more',
            },
            card10: {
                infoText: 'Get started',
            },
        };
    },
    methods: {
        // async tileViability() {
        //     var viability = false;
        //     const coordinateBounds = await tilesViabilityStore.handleCoordinateBoundsRequest();
        //     const north = coordinateBounds.bounds[0];
        //     const west = coordinateBounds.bounds[1];
        //     const south = coordinateBounds.bounds[2];
        //     const east = coordinateBounds.bounds[3];

        //     const stepSize = Math.sqrt(50 * 1000 * 1000) / 2; // 50 km² in square meters
        //     const stepSizeLat = stepSize / 111320;
        //     const stepSizeLng = stepSize / (40075000 * Math.cos(Math.PI * north / 180) / 360);

        //     for (let lat = north; lat > south; lat -= (stepSizeLat)) {
        //         for (let lng = west; lng < east; lng += (stepSizeLng)) {
        //             const coordinates = createTile({lat, lng});
        //             console.log(coordinates);
        //             viability = await tilesViabilityStore.handleViabilityRequest(coordinates);
        //             // console.log("Coordinates:", coordinates, "Viability:", viability);

        //             if (viability) {
        //                 this.tiles.push(coordinates);
        //                 setCookie('tiles', this.tiles);
        //             }
        //         }
        //     }
        //     console.log(this.tiles);
        // },

        formatCoordinates(tile) {
            return tile.map(point => {
                const lat = point.lat?.toFixed(4) ?? 'Unknown';
                const lng = point.lng?.toFixed(4) ?? 'Unknown';
                return `(${lat}, ${lng})`;
            }).join(', ');
        },

        scrollToSection(sectionId) {
            // Scroll to the element with the specified id
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        },

        selectRegion(region) {
            useTileInfoStore().setSelectedRegion(region);
        },

        setType(type) {
            useTileInfoStore().setType(type);
        },
    },
};
</script>

