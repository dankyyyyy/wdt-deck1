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
                <div class="option-text center"
                    @click="setType('shallow'), tileViability(), scrollToSection('sixth-section')">
                    Shallow
                </div>
            </div>
            <!-- Transitional -->
            <div class="options-section-2-second black">
                <div class="option-text center"
                    @click="setType('transitional'), tileViability(), scrollToSection('sixth-section')">
                    Transitional
                </div>
            </div>
            <!-- Deepwater -->
            <div class="options-section-2-third black">
                <div class="option-text center"
                    @click="setType('deepwater'), tileViability(), scrollToSection('sixth-section')">
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
            <!-- <button @click="clearTiles(), $emit('clear-tiles')"
                class="delete-button bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:shadow-outline">
                Clear Tiles
            </button> -->
        </div>

        <!-- <div class="tiles-list">
            <h3 class="text-lg font-semibold text-gray-700 p-4">Tiles List</h3>
            <ul>
                <li v-for="(tile, index) in tileInfoList" :key="index" class="border-b last:border-b-0">
                    <div @click="tile.showDetails = !tile.showDetails"
                        class="cursor-pointer p-4 hover:bg-gray-100 flex items-center justify-between transition">
                        <span>Tile #{{ index + 1 }}</span>
                        <span :class="{ 'transform rotate-180': tile.showDetails, 'transform rotate-0': !tile.showDetails }"
                            class="transition-transform">
                            &#x25BC;
                        </span>
                    </div>
                    <div v-if="tile.showDetails" class="p-4 bg-gray-50">
                        <div class="text-gray-600">Coordinates: {{ formatCoordinates(tile.coordinates) }}</div>
                        <div class="text-gray-600">Depth: {{ tile.info && tile.info.average_depth ?
                            `${tile.info.average_depth.average_depth}m` : 'Not available' }}</div>
                        <div class="text-gray-600">Wind Speed: {{ tile.info && tile.info.average_wind_speed ?
                            `${tile.info.average_wind_speed.average_wind_speed}m/s` : 'Not available' }}</div>
                    </div>
                </li>
            </ul>
        </div> -->

        <div class="grid intermediate-section">

            <!-- Save Recommendation -->
            <TransparentCard :infoText="card7.infoText">
                <RecommendationSaveButton />
            </TransparentCard>

            <!-- Retry Anchor Button -->
            <TransparentCard :infoText="card8.infoText">
                <RetryButton @click="scrollToSection('fourth-section'), clearTiles(), selectRegion(null), setType(null)" />
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

    mounted() {
        const tilesViabilityStore = useTileInfoStore();

        const savedTiles = getCookie('tiles') || [];
        const savedTileInfo = getCookie('tileInfo') || [];

        if (savedTiles.length !== 0) {
            tilesViabilityStore.setTilesFromCookie(savedTiles);
            this.tiles = tilesViabilityStore.getTiles();

            tilesViabilityStore.setTileInfoListFromCookie(savedTileInfo);
            this.tileInfoList = tilesViabilityStore.getTileInfoList();
        } else {
            console.log("No tiles saved in cookie.");
        }

        const savedType = getCookie('type');
        if (savedType !== null) {
            tilesViabilityStore.setTypeFromCookie(savedType);
        } else {
            console.log("No type saved in cookie.");
        }
    },
    data() {
        return {
            tileInfoList: [],
            // Data to be displayed in the info cards is assigned here.
            // For the images, Vue components are used as SVGs.

            //Info Cards
            card1: {
                infoText: "Select a specific area for which you desire a suggestion. Currently, there are only two regions available, namely the North Sea and Baltic Sea, with additional regions anticipated to be included in the future.",
            },
            card2: {
                infoText: "Select both the mounting type and turbine model. The three mounting options—Monopile, Jacket, and Floating—enable us to specify the depth range for the recommendation. Choose a turbine model from the provided list, aiding us in evaluating the optimal location based on the wind limits of the turbines.",
            },
            card3: {
                infoText: "Get a personalized recommendation! Our algorithm analyzes the parameters you provide, utilizing barometric data and historical weather information to generate the most suitable offshore windfarm location suggestion in your chosen region.",
            },
            card4: {
                infoText: "When evaluating the viability of a specific location, historical weather data, including wind speeds and wave height, is employed. This information is sourced from the European Union's Copernicus database.",
            },
            card5: {
                infoText: "Depth information is employed to identify the appropriate location according to the chosen mounting type. This data is retrieved from the GEBCO Barometric database.",
            },
            card6: {
                infoText: "Our algorithm.",
            },

            // Buttons

            card7: {
                infoText: "Is this the one?",
            },
            card8: {
                infoText: "Not quite it?",
            },
            card9: {
                infoText: "Learn more",
            },
            card10: {
                infoText: "Get started",
            }
        };
    },
    methods: {
        async tileViability() {
            const coordinateBounds = await useTileInfoStore().handleCoordinateBoundsRequest();
            const north = coordinateBounds.bounds[0];
            const west = coordinateBounds.bounds[1];
            const south = coordinateBounds.bounds[2];
            const east = coordinateBounds.bounds[3];

            const stepSize = Math.sqrt(200 * 1000 * 1000); // 20000km (one side of the tile)
            const stepSizeLat = stepSize / 111320; // step size divided by the length of one degree of latitude in meters
            const stepSizeLng = stepSize / (40075000 * Math.cos(Math.PI * north / 180) / 360); // step size divided by the length of one degree of longitude in meters

            for (let lat = north; lat > south; lat -= (stepSizeLat)) {
                for (let lng = west; lng < east; lng += (stepSizeLng)) {
                    const coordinates = createTile({ lat, lng });
                    const viability = await useTileInfoStore().handleViabilityRequest(coordinates);

                    if (viability) {
                        console.log(viability, "viability true condition entered");
                        useTileInfoStore().addTile(coordinates);
                        await useTileInfoStore().fetchTileInfo(coordinates);
                    }
                }
            }
            this.tileInfoList = useTileInfoStore().getTileInfoList();
        },

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
            setCookie('region', region);
        },

        setType(type) {
            useTileInfoStore().setType(type);
            setCookie('type', type);
        },

        clearTiles() {
            useTileInfoStore().clearTiles();
            this.tiles = useTileInfoStore().getTiles();
            this.tileInfoList = useTileInfoStore().getTileInfoList();
        }
    },
};
</script>

