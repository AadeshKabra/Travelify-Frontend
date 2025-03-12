<template>
    <div class="search-template">
        <h2 class="search-heading">Find your perfect stay!</h2>
        <div class="search-box">
            <div class="search-destination">
                <input type="text" class="destination" placeholder="Hotels in..." id="destination">
                <img src="../assets/search.png" class="search-icon">
            </div>

            <div class="search-dates">
                <div class="search-dates-checkin">
                    <label for="checkin-date">Checkin: </label>
                    <input type="date" class="checkin-date" name="checkin-date" id="checkin-date">
                </div>
                
                <div class="search-dates-checkout">
                    <label for="checkout-date">Checkout: </label>
                    <input type="date" class="checkout-date" name="checkout-date" id="checkout-date">
                </div>
            </div>

            <div class="search-people">
                <div class="search-people-adults">
                    <label for="adults">Adults: </label>
                    <input type="number" class="adults" name="adults" min="1" id="adults">
                </div>

                <div class="search-people-children">
                    <label for="children">Children: </label>
                    <input type="number" class="children" name="children" min="0" id="children">
                </div>
            </div>
        </div>

        <button type="submit" class="button hotels-button" id="hotels-button" v-on:click="searchHotels">Search Hotels</button>
    </div>
</template>


<script setup>

    import axiosRequest from '../../axios_api';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    async function searchHotels(){
        let destination = document.getElementById("destination");
        let checkinDate = document.getElementById("checkin-date");
        let checkoutDate = document.getElementById("checkout-date");
        let adults = document.getElementById("adults");
        let children = document.getElementById("children");

        let payload = {};
        if (destination.value != null){
            payload.destination = destination.value;
        }
        if (checkinDate.value != null){
            payload.checkinDate = checkinDate.value;
        }
        if (checkoutDate.value != null){
            payload.checkoutDate = checkoutDate.value;
        }
        if (adults.value != null){
            payload.adults = adults.value;
        }
        if (children.value != null){
            payload.children = children.value;
        }

        let response = await axiosRequest.post("/searchHotels", payload);
        console.log(response.data);
        // console.log(response.data.search_parameters.q);
        router.push({
            path: `/getHotels`,
            query: { data: encodeURIComponent(JSON.stringify(response.data)), payload: encodeURIComponent(JSON.stringify(payload))}
            });
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

    .search-box{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1em;
        border: 2px solid #48a6a7;
        padding: 2em;
        border-radius: 25px;
    }

    .search-destination{
        position: relative;
        display: inline-block;
    }

    .destination{
        padding: 0.5em;
        padding-right: 30px;
        font-size: 1.5em;
        border-radius: 25px;
    }

    .search-icon{
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        /* pointer-events: none; */
        cursor: pointer;
    }

    .search-dates, .search-people{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 1em;
        font-family: "Mulish", sans-serif;
    }

    .search-dates-checkin, .search-dates-checkout{
        margin-right: 1em;
        font-size: 1.25em;
    }

    .checkin-date, .checkout-date{
        font-size: 1em;
        border-radius: 5px;
        padding: 0.5em;
    }

    .search-people-adults, .search-people-children{
        margin-right: 1em;
        font-size: 1.25em;
    }

    .adults, .children{
        width: 3em;
        font-size: 1em;
    }

    .hotels-button{
        font-size: 1.5em;
        border-radius: 15px;
        cursor: pointer;
        margin-top: 1.5em;
        padding: 0.5em;
        background-color: #9ACBD0;
        font-family: "Mulish", sans-serif;
        border: 1px solid #48a6a7;
        color: #000000;
        width: max-content;
    }

    .hotels-button:hover{
        background-color: #9ACBD0;
        cursor: pointer;
    }
</style>