<template>
    <div class="search-template">
        <h1 class="search-heading">Hotels in {{ route.params.location }}</h1>
        <div class="search-results-section">
            <div class="filter-results">

            </div>

            <div class="search-results">
                <div class="hotel-card" v-for="(hotel, index) in properties" :key="index">
                    <!-- {{ hotel }} -->
                    <!-- ======================= -->
                    <div class="hotel" :id="hotel.property_token" @click="getHotelInformation(hotel.property_token, hotel.name)">
                        <div class="hotel-image">
                            <img :src="hotel.images[0].thumbnail" class="hotel-thumbnail-image">
                        </div>
                        <div class="hotel-information">
                            <h2 class="hotel-name">
                                <a :href="hotel.link" target="_blank">{{ hotel.name }}</a>
                            </h2>
                            <p>{{ hotel.description }}</p>
                            <div class="hotel-prices">
                                <p v-if="hotel.rate_per_night" class="price">Min. Rate / Night: {{ hotel.rate_per_night.lowest }}</p>
                                <p v-if="hotel.total_rate" class="price">Min. Total Price: {{ hotel.total_rate.lowest }}</p>
                            </div>
                            <div class="hotel-rating" v-if="hotel.extracted_hotel_class">
                                <div v-for="n in hotel.extracted_hotel_class" :key="n" class="hotel-star">
                                    <img src="../assets/star.png" class="star-icon">
                                </div>
                            </div>
                        </div>
                        
                    </div>
                     
                </div>
            </div>
        </div>
    </div>
    
</template>


<script setup>
    import { useRoute, useRouter } from "vue-router";
    import axiosRequest from "../../axios_api";

    const route = useRoute();
    const router = useRouter();
    
    let data = route.query.data;
    data = JSON.parse(decodeURIComponent(data));

    let payload = route.query.payload;
    payload = JSON.parse(decodeURIComponent(payload));

    let search_metadata = data["search_metadata"];
    let search_parameters = data["search_parameters"];
    let search_information = data["search_information"];
    let brands = data["brands"];
    let properties = data["properties"];

    // console.log("Search Information", search_information)
    // console.log("Properties", properties);

    async function getHotelInformation(property_token, name){
        console.log("Payload: ", payload);
        console.log("Property Token: ", property_token);
        try{
            let response = await axiosRequest.post("/getHotelInformation", {payload: payload, property_token: property_token, name: name});
            console.log(response.data);

            router.push({
                path: `/hotels/${property_token}`,
                query: {payload: encodeURIComponent(JSON.stringify(payload)), hotelData: encodeURIComponent(JSON.stringify(response.data)), name: name}
            });

        } catch (error){
            console.error(error);
        }

    }

</script>


<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Playwrite+IN:wght@100..400&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');

    .search-template{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .search-heading{
        font-family: "Noto Serif", serif;
        font-size: 2em;
    }

    .search-results-section{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .search-results{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .hotel{
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;
        margin-top: 30px;
        border: 2px solid #48A6A7;
        border-radius: 15px;
        width: 50em;
        padding: 1em;
        gap: 2em;
        cursor: pointer;
    }

    .hotel-name{
        font-family: "Noto Serif", serif;
    }

    .hotel-name a{
        text-decoration: none;
        color: #000000;
    }

    .hotel-thumbnail-image{
        border-radius: 15px;
        justify-content: left;
        align-items: left;
    }

    .hotel-prices{
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: left;
        gap: 1em;
    }

    .price{
        font-size: 16px;
    }

    .hotel-rating{
        display: flex;
        flex-direction: row;
    }

    .star-icon{
        height: 25px;
        width: 25px;
    }

</style>