<template>
    <div class="nav">
        <h2 class="title">Travelify</h2>
        <div class="search-flights">
            <router-link to="/search-flights" class="search-route">Flights</router-link>
        </div>
        <div class="search-hotels">
            <router-link to="/search-hotels" class="search-route">Hotels</router-link>
        </div>
        <div class="search-place">
            <router-link to="/search-place" class="search-route">Pic2Place</router-link>
        </div>
        <!-- <div class="search-flights">Search Flights</div> -->
        <div v-if="store.name" class="name">
            <img src="../assets/user.png" class="img-user">
            <p>Hello, {{ store.name }}</p>
        </div>
        <div class="signin" v-else>
            <button id="sign-up" class="signin-button" @click="signup">Sign Up</button>
            <button id="log-in" class="signin-button">Login</button>
        </div>
        
    </div>
</template>

<script setup>
import axiosRequest from '../../axios_api';
import { useStore } from '@/stores/index'; 
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get("name");
const email = urlParams.get("email");
const store = useStore();

store.setName(name);
store.setEmail(email);
// console.log("Name: ", store.name);
// console.log("Email: ", store.email);
// console.log("From Navbar.vue");
async function signup(){
    const response = await axiosRequest.get("/login/google");
    console.log(response.data.url);
    window.location.href = response.data.url
    // window.location.href = "/"
    console.log("Authentication completed")
    this.$router.push("/");
}


</script>

<style scoped>
    /* @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Pacifico&family=Playwrite+IN:wght@100..400&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap'); */

    @import url('https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&family=Playwrite+IN:wght@100..400&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');
    
    .nav{
        display: flex;
        align-items: center;
        flex-direction: row;
        height: 4em;
        background-color: #EEEEEE;
        border-radius: 20px;
        background-image: linear-gradient(to right, #48A6A7, #EEEEEE);
    }

    .title{
        display: flex;
        flex-direction: row;
        /* margin-right: auto; */
        margin-left: 1em;
        justify-content: center;
        align-items: center;
        font-family: "Playwrite IN", cursive;
        font-optical-sizing: auto;
    }

    .search-route{
        text-decoration: none;
        color: #000000;
        font-family: "Mulish", sans-serif;
    }

    .search-flights, .search-hotels, .search-place{
        margin-left: 1em;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: "Mulish", sans-serif;
        font-size: 1.5em;
        height: 100%;
        width: max-content;
        padding-left: 0.5em;
        padding-right: 0.5em;
    }

    .search-hotels{
        margin-left: 0.5em;
    }

    .search-place{
        margin-left: 0.5em;
        width: max-content;
        padding-left: 0.5em;
        padding-right: 0.5em;
    }

    .search-flights:hover, .search-hotels:hover, .search-place:hover{
        background-color: #9ACBD0;
        cursor: pointer;
    }

    .signin{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        margin-left: auto;
        margin-right: 1em;
        height: 100%;
    }

    .img-user{
        height: 2em;
        width: 2em;
        display: flex;
        margin-left: auto;
        margin-right: 1em;
    }

    .name{
        display: flex;
        flex-direction: row;
        margin-left: auto;
        margin-right: 1em;
        justify-content: center;
        align-items: center;
    }

    .signin-button{
        background-color: #9ACBD0;
        color: #201E43;
        font-size: 1em;
        font-family: "Mulish", sans-serif;
        border: 1px solid #201E43;
        height: 2em;
        width: max-content;
        margin-left: 1em;
        padding: 0 1em;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border-radius: 15px;
    }

    .signin-button:hover{
        background-color: #48A6A7;
        cursor: pointer;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
    }
</style>