<template>
    <div class="home">
        <div class="background-image"></div>
        <div class="content-wrapper">
            <div class="section-1">
                <h2 class="heading">Generate your customised travel itinerary...</h2>
                <button class="get-iternary-button button" v-on:click="getIternary">Get Itinerary</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const getIternary = () => {
        router.push("/get-iternary");
    };

</script>


<style scoped>

    .home{
        position: relative;
        height: 90vh;
    }

    .section-1{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 3em;
    }

    .heading{
        font-family: "Noto Serif", serif;
        font-size: 2em;
        text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
    }

    .get-iternary-button{
        font-size: 1.5em;
        border-radius: 15px;
        cursor: pointer;
        margin-top: 1em;
        padding: 0.5em;
        background-color: #9ACBD0;
        font-family: "Mulish", sans-serif;
        border: 1px solid #48a6a7;
        color: #000000;
        width: 7em;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
    }

    .get-iternary-button:hover{
        background-color: #48a6a7;
        cursor: pointer;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); /* Shadow effect */
        transform: translateY(-2px);
    }

    .background-image {
        position: absolute; /* Take it out of the normal flow */
        top: 0;
        left: 0;
        background-image: url('../assets/bg_image1.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        width: 100%;
        height: 100%; /* Fill the home container */
        opacity: 0.3;
        border-radius: 10px;
        z-index: 1; /* Lower z-index to be behind the content */
    }   

    .content-wrapper {
        position: relative;
        z-index: 2; /* Higher z-index to be on top of the background */
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 0.5em;
    }
</style>