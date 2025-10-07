import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Garden from '../pages/Garden.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/garden', component: Garden },
  ],
})

export default router
