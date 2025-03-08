<template>
    <h1>Hotels in {{ route.params.location }}</h1>
</template>


<script setup>
    import { useRoute } from "vue-router";

    const route = useRoute();


</script>


<style scoped>

</style>