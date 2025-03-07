<template>
    <div class="home">
        <div class="section-1">
            <h2 class="heading">Generate your customised travel iternary...</h2>
            <button class="get-iternary-button button" v-on:click="getIternary">Get Iternary</button>
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
    }
</style>