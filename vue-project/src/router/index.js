import { createRouter, createWebHistory } from 'vue-router'
import AuthGoogle from '@/components/AuthGoogle.vue'
import SearchFlights from '@/components/SearchFlights.vue'
import SearchHotels from '@/components/SearchHotels.vue'
import GetIternary from '@/components/GetItinerary.vue'
import Hotels from '@/components/Hotels.vue'
import Home from '@/components/Home.vue'
import getHotels from '@/components/GetHotels.vue'
import Itinerary from '@/components/Itinerary.vue'
import Pic2Places from '@/components/Pic2Places.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: "/auth/google",
      name: "AuthGoogle",
      component: AuthGoogle
    },
    {
      path: "/search-flights",
      name: "searchFlights",
      component: SearchFlights
    },
    {
      path: "/search-hotels",
      name: "searchHotels",
      component: SearchHotels
    },
    {
      path: "/search-place",
      name: "searchPlace",
      component: Pic2Places
    },
    {
      path: "/getHotels",
      name: "getHotels",
      component: getHotels
    },
    {
      path: "/hotels/:id",
      name: "hotels",
      component: Hotels
    },
    {
      path: "/get-iternary",
      name: "getIternary",
      component: GetIternary
    },
    {
      path: "/itinerary",
      name: "itinerary",
      component: Itinerary
    }
  ],
})

export default router

// {
  // path: '/',
  // name: 'home',
  // component: () => import("../App.vue"),
// },