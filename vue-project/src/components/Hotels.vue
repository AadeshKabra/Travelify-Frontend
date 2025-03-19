<template>
    <!-- {{ hotelData }} -->
    <h1 class="hotel-name">{{ name }}</h1>

    <div class="hotel-info">
        <div class="description-container">
            <p v-html="hotelData.description" :class="{ 'clamped': !isExpanded }" id="hotel-description"></p>
            <button class="read-more" @click="isExpanded = !isExpanded"> 
                {{ isExpanded ? "Read Less": "Read More..." }}
            </button>
        </div>
        
        <div class="hotel-details">
            <p><strong>Address:</strong> {{ hotelData.address }}</p>
            <div class="hotel-details-timings">
                <p><strong>Checkin Time:</strong> {{ hotelData.check_in_time }} </p>
                <p><strong>Checkout Time:</strong> {{ hotelData.check_out_time }} </p>
                <p><strong>Phone:</strong> {{ hotelData.phone }} </p>
            </div>
        </div>

        <div class="hotel-location" @click="openGoogleMaps(hotelData.gps_coordinates.latitude, hotelData.gps_coordinates.longitude)">
            <img src="../assets/location.png" class="location-icon">
            Check on Google Maps
        </div>
    </div>


    <div class="hotel-info-2">
        <div class="hotel-info-left">
            <!-- Hotel Images -->
            <div class="hotel-images">
                <div v-if="hotelImages.length">
                    <div class="image-grid">
                        <div v-for="(image, index) in displayedImages" :key="index" class="image-container">
                        <img v-if="index < 15 || !hasMoreImages" :src="image.thumbnail" alt="hotel-image" class="hotel-image" @click="openFullScreen(image.thumbnail)"/>
                        <div v-else class="more-images" @click="showAllImages = true">
                            +{{ hotelImages.length - 15 }}
                        </div>
                        </div>
                    </div>
                </div>
                <p v-else>No images found</p>

                <!-- Modal for displaying all images -->
                <div v-if="showAllImages" class="modal-overlay" @click="showAllImages = false">
                    <div class="modal-content" @click.stop>
                        <button class="close-button" @click="showAllImages = false">X</button>
                        <div class="modal-images">
                        <img v-for="(image, index) in hotelImages" :key="'modal-' + index" :src="image.thumbnail" alt="hotel-image" class="modal-image" @click="openFullScreen(image.thumbnail)"/>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Hotel Reviews -->
            <h2 class="review-heading">Reviews</h2>
             <div class="hotel-reviews">
                <div v-for="(rating, index) in hotelData.ratings" :key="index" class="rating-stars">
                    <div v-for="n in rating.stars" :key="n" class="star-container">
                        <img src="../assets/star.png" class="star-icon">
                    </div>
                    <p class="rating-count">{{ rating.count }}</p>
                </div>
             </div>
            
             <!-- Hotel Nearby Places -->
             <h2 class="nearby-heading">Nearby Places</h2>
             <div class="hotel-nearby">
                <div class="nearby-place" v-for="(place, index) in visibleNearbyPlaces" :key="index" @click="openNearbyPlace(place.link)">
                    <img :src="place.thumbnail" class="nearby-place-image">
                    <p class="place-name">{{ place.name }}</p>
                    
                </div>

                <button v-if="hotelData.nearby_places.length > 6" class="show-more-btn" @click="showAll = !showAll">  {{ showAll ? "Show Less" : "Show All Nearby Places" }}"</button>
             </div>

        </div>

        <!-- {{ hotelData.prices }} -->
        <div class="hotel-info-right">
            <div class="hotel-prices">
                <div v-for="(item, index) in hotelData.prices" :key="index" class="hotel-price-item" @click="redirectToBooking(item.link)">
                    <img :src="item.logo" alt="logo" class="booking-logo">
                    <h2>{{ item.source }}</h2>
                    <p>Cost per day: {{ item.rate_per_night.lowest }}</p>
                    <p>Total Cost: {{ item.total_rate.lowest }}</p>
                </div>
            </div>
        </div>
    </div>
    
</template>


<script setup>
    import { useRoute, useRouter } from "vue-router";
    import { ref, computed, onMounted } from "vue";
    import axios from "axios"

    const route = useRoute();
    const router = useRouter();

    const payload = JSON.parse(decodeURIComponent(route.query.payload));
    const hotelInfo = JSON.parse(decodeURIComponent(route.query.hotelData));
    const hotelData = hotelInfo["hotel_information"]
    
    const hotelImages = ref(hotelInfo["hotel_images"] || []);
    const showAllImages = ref(false);

    const displayedImages = computed(() => hotelImages.value.slice(0, 16));
    const hasMoreImages = computed(() => hotelImages.value.length > 16);
    
    const name = route.query.name;
    
    const isExpanded = ref(false);
    const fullDescription = ref(hotelData.description);

    const hotelDescription = computed(() => fullDescription.value || "No Description available");

    const redirectToBooking = (url) => {
        if(url){
            window.open(url, "_blank");
        }else{
            console.log("No booking URL found");
        }
    };

    const openGoogleMaps = (lat, long) => {
        const googleMapsUrl = `https://www.google.com/maps?q=${lat},${long}`;
        window.open(googleMapsUrl, "_blank");
    }

    const openNearbyPlace = (link) => {
        window.open(link, "_blank");
    }

    const showAll = ref(false);

    const visibleNearbyPlaces = computed(() => {
        return showAll.value ? hotelData.nearby_places : hotelData.nearby_places.slice(0, 6)
    });

</script>


<style scoped>
    
    .hotel-name{
        text-align: center;
        font-family: "Noto Serif", serif;
    }

    .hotel-info{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1em;
        margin-top: 2em;
    }

    .description-container {
        max-width: 700px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    } 

    p {
        overflow: hidden;
        transition: max-height 0.3s ease;
    }

    .clamped {
        display: -webkit-box;
        -webkit-line-clamp: 3; /* Show only 3 lines */
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    #hotel-description{
        text-align: justify;
    }

    .read-more {
        color: blue;
        background: none;
        border: none;
        cursor: pointer;
        font-size: 14px;
        padding: 5px 0;
        text-decoration: underline;
    }

    .hotel-details-timings{
        display: flex;
        flex-direction: row;
        gap: 1em;
        justify-content: center;
        align-items: center;
    }

    .image-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 10px;
        width: 100%;
        max-width: 630px;
        margin: auto;
        border: 2px solid #48A6A7;
        padding: 5px;
        border-radius: 5px;
    }

    .image-container {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .hotel-image {
        width: 150px;
        height: 150px;
        border-radius: 5px;
        object-fit: cover;
    }

    /* '+' Button for more images */
    .more-images {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        width: 100%;
        height: 100%;
        border-radius: 5px;
        cursor: pointer;
    }

    /* Modal Overlay */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    /* Modal Content */
    .modal-content {
        background: white;
        padding: 20px;
        border-radius: 8px;
        max-width: 80%;
        max-height: 80%;
        overflow-y: auto;
        position: relative;
    }

    /* Close Button */
    .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        border: none;
        background: red;
        color: white;
        padding: 5px 10px;
        cursor: pointer;
        border-radius: 50%;
    }

    /* Modal Image Grid */
    .modal-images {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
    }

    .modal-image {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 5px;
    }

    .hotel-images{
        margin-top: 2em;
    }

    .fullscreen-image{
        max-width: 90vh;
        max-height: 90vh;
        object-fit: contain;
    }

    .hotel-prices{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .hotel-price-item{
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;
        gap: 2em;
        border: 2px solid #48A6A7;
        margin-top: 30px;
        padding: 15px;
        border-radius: 10px;  
        width: 35em;
        cursor: pointer;
    }

    .hotel-price-item:hover{
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); /* Shadow effect */
        transform: translateY(-2px); /* Slight upward movement */
        background-color: #F2EFE7; /* Darker blue */
        cursor: pointer;
    }

    .booking-logo{
        height: 35px;
        width: 35px;
    }

    .hotel-info-2{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: top;
        gap: 2em;
        padding: 1em;
    }

    .hotel-location{
        font-family: "Noto Serif", serif;
        font-size: 14px;
        padding: 5px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1em;
    }

    .hotel-location:hover {
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); /* Shadow effect */
        transform: translateY(-2px); /* Slight upward movement */
        background-color: #F2EFE7; /* Darker blue */
        cursor: pointer;
    }

    .location-icon{
        height: 15px;
        width: 15px;
    }

    .star-icon{
        height: 25px;
        width: 25px;
    }

    .rating-stars{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 1em;
    }

    .star-container {
        display: flex;
        align-items: center;
        gap: 5px; /* Space between stars */
    }

    .rating-count {
        margin-left: auto; /* Push count to the right */
        font-weight: bold;
        margin-right: 2em;
    }

    .review-heading{
        text-align: center;
    }

    .hotel-reviews{
        margin-top: 2em;
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items: flex-start;
        text-align: left;
        margin-left: 2em;
    }

    .hotel-nearby{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 16px;
    }

    .nearby-heading{
        text-align: center;
    }

    .nearby-place{
        display: flex;
        flex-direction: column;
        flex: 1 1 calc(33.33% - 16px);
        max-width: calc(33.33% - 16px);
        box-sizing: border-box;
        cursor: pointer;
        text-align: center;
        border: 2px solid #48A6A7;
        margin-top: 1em;
        border-radius: 10px;
    }

    .nearby-place:hover{
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); /* Shadow effect */
        transform: translateY(-2px); /* Slight upward movement */
        background-color: #F2EFE7; /* Darker blue */
        cursor: pointer;
    }

    .nearby-place-image{
        height: 150px;
        width: 100%;
        border-top-right-radius: 8px;
        border-top-left-radius: 8px;
    }

    .place-location{
        text-align: right;
        margin-left: auto;
    }

    .show-more-btn{
        width: 100%;
        border-radius: 5px;
        background-color: #9ACBD0;
        font-family: "Mulish", sans-serif;
        border: 1px solid #48a6a7;
        color: #000000;
        height: 4em;
        font-size: 16px;
        cursor: pointer;
    }

    .nearby-heading, .review-heading{
        font-family: "Noto Serif", serif;
    }

</style>