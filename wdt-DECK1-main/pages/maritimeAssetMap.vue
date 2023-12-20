<template>
    <div>

        <NuxtLink to="/">
            <IconsLogoInverted class="inline-block align-middle w-full" />
        </NuxtLink>

        <!-- First Section -->
        <div class="section">
            <div class="heading-container">
                <h1 class="page-header">Maritime Asset Map</h1>
            </div>
        </div>

        <!-- Second Section -->
        <div class="section section-color-1">
            <h2 class="section-header-black">How does it work?</h2>
            <div class="grid info-card-container">
                <!-- Info Cards with pictures and text -->

                <!-- Step 1 - Choose region -->
                <InfoCard :infoText="card1.infoText">
                    <IconsMapFilled class="inline-block align-middle w-full" />
                </InfoCard>

                <!-- Step 2 - Choose type and model of turbine -->
                <InfoCard :infoText="card2.infoText">
                    <IconsWindmillLarge class="inline-block align-middle w-full"/>
                </InfoCard>

                <!-- Step 3 - Get a recommendation -->
                <InfoCard :infoText="card3.infoText">
                    <IconsRecommendation class="inline-block align-middle w-full"/>
                </InfoCard>
            </div>
        </div>

        <!-- Third Section -->
        <div class="section section-color-2">
            <h2 class="section-header-white">Powered by:</h2>
            <div class="grid info-card-container">
                <!-- Info Cards for the third section -->

                <!-- CDS -->
                <InfoCard :infoText="card4.infoText">
                    <IconsCopernicusLogo class="inline-block align-middle w-full" />
                </InfoCard>

                <!-- Depth data site -->
                <InfoCard :infoText="card5.infoText">
                </InfoCard>

                <!-- Our algorithm -->
                <InfoCard :infoText="card6.infoText">
                </InfoCard>

            </div>
        </div>
    </div>
</template>

<script>
import InfoCard from '~/components/Cards/InfoCard.vue';

// Region Card
import MapFilled from '~/components/icons/MapFilled.vue';

// Turbine Card
import Windmill from '~/components/icons/WindmillLarge.vue';

// Recommendation Card
import Recommendation from '~/components/icons/Recommendation.vue';

// CDS Card
import CDS_Logo from '~/components/icons/CopernicusLogo.vue';


// Depth Data Site Card
import DepthSite_Logo from '~/assets/placeholder-info-image.jpg';


// Our Algorithm Card
import DECK1_Logo from '~/components/icons/LogoInverted.vue';

export default {
    components: {
        InfoCard,
        MapFilled,
        Windmill,
        Recommendation,
        DECK1_Logo,
    },
    data() {
        return {
            // Data to be displayed in the info cards is assigned here.
            // For the images, Vue components are used as SVGs.
            card1: {
                imageSrc: MapFilled,
                infoText: 'RegionText',
            },
            card2: {
                imageSrc: Windmill,
                infoText: 'Text for Image 2',
            },
            card3: {
                imageSrc: Recommendation,
                infoText: 'Text for Image 3',
            },
            card4: {
                imageSrc: CDS_Logo,
                infoText: 'Text for Image 4',
            },
            card5: {
                imageSrc: DepthSite_Logo,
                infoText: 'Text for Image 5',
            },
            card6: {
                imageSrc: DECK1_Logo,
                infoText: 'Text for Image 6',
            },
        };
    },
};
</script>

