<template>
    <div class="grid-container">
        <div class="grid">
            <div class="button-box pointer secondary-button">
                <div class="box-content">
                    <p class="info-text bold prompt">
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