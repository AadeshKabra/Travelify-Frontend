<template>
    <h1>{{ name }}</h1>
</template>


<script setup>
    import { useRoute, useRouter } from "vue-router";

    const route = useRoute();
    const router = useRouter();

    const payload = JSON.parse(decodeURIComponent(route.query.payload));
    console.log(payload);

    const propertyToken = route.query.propertyToken;
    console.log(propertyToken);

    const name = route.query.name;
    console.log(name);


</script>


<style>

</style>