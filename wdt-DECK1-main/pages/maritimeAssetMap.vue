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
            <div class="options-section-left black">
                <div class="option-text right">
                    North Sea
                </div>
            </div>
            <!-- Baltic Sea -->
            <div class="options-section-right black">
                <div class="option-text left">
                    Baltic Sea
                </div>
            </div>
        </div>

        <div class="intermediate-section">
            <h2 class="section-header black">Select installation type:</h2>
        </div>

        <div class="option-section">
            <!-- Monopile -->
            <div class="options-section-2-first black">
                <div class="option-text center">
                    Monopile
                </div>
            </div>
            <!-- Jacket -->
            <div class="options-section-2-second black">
                <div class="option-text center">
                    Jacket
                </div>
            </div>
            <!-- Floating -->
            <div class="options-section-2-third black">
                <div class="option-text center">
                    Floating
                </div>
            </div>
        </div>

        <!-- Fifth Section -->

        <div class="intermediate-section">
            <h2 class="section-header black">Our recommendation</h2>
        </div>

        <div class="map-section">
            <LeafletMap ref="leafletMap" />
            <button @click="emitClearTilesEvent" class="delete-button bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:shadow-outline">
                Clear Tiles
            </button>
        </div>

        <div class="tiles-list bg-white shadow-md rounded-lg overflow-hidden mx-4 my-4 max-w-sm">
            <h3 class="text-lg font-semibold text-gray-700 p-4">Tiles List</h3>
            <ul>
                <li v-for="(tile, index) in tileInfoList" :key="index" class="border-b last:border-b-0">
                <div @click="tile.showDetails = !tile.showDetails" class="cursor-pointer p-4 hover:bg-gray-100 flex items-center justify-between transition">
                <span>Tile #{{ index + 1 }}</span>
                <span :class="{'transform rotate-180': tile.showDetails, 'transform rotate-0': !tile.showDetails}" class="transition-transform">
                    &#x25BC; <!-- Unicode down arrow, rotates when clicked -->
                </span>
                </div>
                <div v-if="tile.showDetails" class="p-4 bg-gray-50">
                <div class="text-gray-600">Coordinates: {{ formatCoordinates(tile.coordinates) }}</div>
                <div class="text-gray-600">Depth: {{ tile.info && tile.info.average_depth ? `${tile.info.average_depth}m` : 'Not available' }}</div>
                </div>
            </li>
            </ul>
        </div>
    </div>

    <div class="grid intermediate-section">

        <!-- Save Recommendation -->
        <TransparentCard :infoText="card7.infoText">
            <RecommendationSaveButton />
        </TransparentCard>

        <!-- Retry Anchor -->
        <TransparentCard :infoText="card8.infoText">
            <RetryButton @click="scrollToSection('fourth-section')" />
        </TransparentCard>
    </div>

    <div class="footer">

    </div>
</template>

<script>
import InfoCard from '~/components/Cards/InfoCard.vue';
import ButtonCard from '~/components/Cards/ButtonCard.vue';
import TransparentCard from '~/components/Cards/TransparentCard.vue';
import LeafletMap from '~/components/LeafletMap.vue';
import RetryButton from '~/components/RetryButton.vue';
import RecommendationSaveButton from '~/components/RecommendationSaveButton.vue';
import { useTileInfoStore } from '@/stores/TilesViabilityStore';
import { getCookie } from '@/utils/cookieHandler';

export default {
    components: {
        InfoCard,
        ButtonCard,
        TransparentCard,
        LeafletMap,
        RetryButton,
        RecommendationSaveButton,
    },
    setup() {
        const tilesViabilityStore = useTileInfoStore();
        const tiles = ref([]);
        const tileInfoList = ref([]);

        const fetchTileInfo = async (tile) => {
            await tilesViabilityStore.fetchTileInfo(tile.map(coord => ({
                latitude: coord.lat,
                longitude: coord.lng
            })));
            tileInfoList.value.push({
                coordinates: tile,
                info: tilesViabilityStore.tileInfo,
            });
        };

        const addAndFetchTileInfo = async (newTile) => {
            tiles.value.push(newTile);
            await fetchTileInfo(newTile);
            tileInfoList.value.push({
                coordinates: newTile,
                info: tilesViabilityStore.tileInfo,
            });
        };

        const formatCoordinates = (tile) => {
            return tile.map(point => {
                const lat = point.lat?.toFixed(4) ?? 'Unknown';
                const lng = point.lng?.toFixed(4) ?? 'Unknown';
                return `(${lat}, ${lng})`;
            }).join(', ');
        };


        onMounted(async () => {
            const savedTiles = getCookie('tiles');
            if (savedTiles) {
                tiles.value = savedTiles;
                for (const tile of savedTiles) {
                    await fetchTileInfo(tile);
                    tileInfoList.value.push({
                        coordinates: tile,
                        info: tilesViabilityStore.tileInfo,
                    });
                }
            }
        });

        return {
            tiles,
            tileInfoList,
            addAndFetchTileInfo,
            formatCoordinates,
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
            }

        };
    },
    methods: {
        scrollToSection(sectionId) {
            // Scroll to the element with the specified id
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        },
        emitClearTilesEvent() {
            if (this.$refs.leafletMap) {
                this.$refs.leafletMap.clearTiles();
                setCookie('tiles', []);
            } else {
                console.error("could not find child leaflet map")
            }
        },
    },
};
</script>

