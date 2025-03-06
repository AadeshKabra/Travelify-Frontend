<template>
    <h3>Authenticating...</h3>

</template>

<script setup>
    import axiosRequest from '../../axios_api';
    import { useRoute, useRouter } from 'vue-router';
    import { useStore } from '@/stores/index';
    const store = useStore();
    const router = useRouter();
    
    
</script>

<style>

</style>