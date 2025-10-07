import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/HomePage.vue'
import Garden from '../pages/GardenPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/garden', component: Garden },
  ],
})

export default router
