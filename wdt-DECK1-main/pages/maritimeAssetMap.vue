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
            <LeafletMap />
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

export default {
    components: {
        InfoCard,
        ButtonCard,
        TransparentCard,
        LeafletMap,
        RetryButton,
        RecommendationSaveButton,
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
    },
};
</script>

