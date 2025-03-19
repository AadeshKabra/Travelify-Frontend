<template>
    <h2>Your Customised Travel Itinerary...</h2>
    <p class="itinerary" id="itinerary">{{ itinerary }}</p>
</template>


<script setup>
    import { useRoute } from "vue-router";

    const route = useRoute();

    let payload = route.query.payload;
    let itinerary = JSON.parse(decodeURIComponent(route.query.itinerary));

</script>


<style scoped>
    
</style>