import { createRouter, createWebHistory } from 'vue-router'
import AuthGoogle from '@/components/AuthGoogle.vue'
import SearchFlights from '@/components/SearchFlights.vue'
import SearchHotels from '@/components/SearchHotels.vue'
import GetIternary from '@/components/GetIternary.vue'
import Hotels from '@/components/Hotels.vue'
import Home from '@/components/Home.vue'

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
      path: "/hotels/:location",
      name: "hotels",
      component: Hotels
    },
    {
      path: "/get-iternary",
      name: "getIternary",
      component: GetIternary
    }
  ],
})

export default router

// {
  // path: '/',
  // name: 'home',
  // component: () => import("../App.vue"),
// },