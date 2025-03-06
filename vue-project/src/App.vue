<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import Search from './components/Search.vue';
</script>

<template>
  <Navbar class="navbar-section"></Navbar>
  <router-view></router-view>
</template>

<style scoped>
  
</style>
