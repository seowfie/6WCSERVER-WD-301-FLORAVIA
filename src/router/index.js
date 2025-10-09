import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/HomePage.vue'
import Garden from '../pages/GardenPage.vue'
import Login from '../pages/LogIn.vue'
import Signup from '../pages/SignUp.vue'
import Profile from '../pages/ProfileUser.vue'
import SingleProduct from '../pages/SingleProduct.vue'
import CheckOut from '../pages/CheckOut.vue'
import Basket from '../pages/BasketPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/garden', component: Garden },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/profile', component: Profile },
    { path: '/singleproduct', component: SingleProduct },
    { path: '/checkout', component: CheckOut },
    { path: '/basket', component: Basket },
  ],
})

export default router
