import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/HomePage.vue'
import Garden from '../pages/GardenPage.vue'
import Login from '@/pages/LogIn.vue'
import Signup from '@/pages/SignUp.vue'
import Profile from '@/pages/ProfileUser.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/garden', component: Garden },
    { path: '/profile', component: Profile },
  ],
})

export default router
