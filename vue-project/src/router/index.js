import { createRouter, createWebHistory } from 'vue-router'
import AuthGoogle from '@/components/AuthGoogle.vue'
import SearchFlights from '@/components/SearchFlights.vue'
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
    }
  ],
})

export default router

// {
  // path: '/',
  // name: 'home',
  // component: () => import("../App.vue"),
// },