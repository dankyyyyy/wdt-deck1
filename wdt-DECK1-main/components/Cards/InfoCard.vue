<template>
    <div class="grid-container">
        <div class="grid">
            <div class="generic-box info-image-box">
                <div class="box-content">
                    <slot class="info-card-image inline-block align-middle w-full" />
                </div>
            </div>
        </div>
        <div class="grid">
            <div class="generic-box info-text-box">
                <div class="box-content">
                    <p class="info-text">
                        {{ infoText }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        infoText: {
            type: String,
            required: true,
        },
    },
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