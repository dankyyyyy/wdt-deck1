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
        <div class="generic-section section-color-1">
            <h2 class="section-header-black">How does it work?</h2>
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
        </div>

        <!-- Third Section -->
        <div class="generic-section section-color-2">
            <h2 class="section-header-white">Powered by:</h2>
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

        <div class="intermediate-container">
            <h2 class="section-header-black">Select installation region:</h2>
        </div>

        <div class="option-section">
            <!-- North Sea -->
            <div class="options-section-left">
                <div class="option-text right">
                    North Sea
                </div>
            </div>
            <!-- Baltic Sea -->
            <div class="options-section-right">
                <div class="option-text left">
                    Baltic Sea
                </div>
            </div>
        </div>

        <div class="intermediate-container">
            <h2 class="section-header-black">Select installation type:</h2>
        </div>

        <div class="option-section">
            <!-- Monopile -->
            <div class="options-section-2-first">
                <div class="option-text center">
                    Monopile
                </div>
            </div>
            <!-- Jacket -->
            <div class="options-section-2-second">
                <div class="option-text center">
                    Jacket
                </div>
            </div>
            <!-- Floating -->
            <div class="options-section-2-third">
                <div class="option-text center">
                    Floating
                </div>
            </div>
        </div>

        <!-- Fourth Section -->

        <div class="intermediate-container">
            <h2 class="section-header-black">Our recommendation</h2>
        </div>

        <div class="map-section">
                <LeafletMap />
        </div>
    </div>

    <div class="intermediate-container">

    </div>

    <div class="footer">

    </div>
</template>

<script>
import InfoCard from '~/components/Cards/InfoCard.vue';
import LeafletMap from '~/components/LeafletMap.vue';

export default {
    components: {
        InfoCard,
        LeafletMap,
    },
    data() {
        return {
            // Data to be displayed in the info cards is assigned here.
            // For the images, Vue components are used as SVGs.
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
        };
    },
};
</script>

