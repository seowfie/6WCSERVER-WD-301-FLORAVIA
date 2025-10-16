import { createRouter, createWebHistory } from 'vue-router'

// 🌸 User pages
import Home from '../pages/HomePage.vue'
import Garden from '../pages/GardenPage.vue'
import Login from '../pages/LogIn.vue'
import Signup from '../pages/SignUp.vue'
import Profile from '../pages/ProfileUser.vue'
import SingleProduct from '../pages/SingleProduct.vue'
import CheckOut from '../pages/CheckOut.vue'
import BasketPage from '../pages/BasketPage.vue'

// 🌸 Admin pages
import HomeAdmin from '../pages/HomeAdmin.vue'
import CreateAdmin from '../pages/CreateAdmin.vue'
import ModifyAdmin from '../pages/ModifyAdmin.vue'
import PendingAdmin from '../pages/PendingAdmin.vue'

const routes = [
  // 🌷 User routes
  { path: '/', name: 'Home', component: Home },
  { path: '/garden', name: 'Garden', component: Garden },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/checkout', name: 'CheckOut', component: CheckOut },
  { path: '/basket', name: 'Basket', component: BasketPage },
  { path: '/cart', redirect: '/basket' },
  {
  path: '/support',
  name: 'SupportPage',
  component: () => import('@/pages/SupportPage.vue'),
  },

  // 🌹 Single Product (props via query)
  {
    path: '/singleproduct',
    name: 'SingleProduct',
    component: SingleProduct,
    props: route => ({
      name: route.query.name,
      image: route.query.image,
      price: route.query.price,
    }),
  },

  // 🌿 Admin routes (protected)
  {
    path: '/admin/home',
    name: 'HomeAdmin',
    component: HomeAdmin,
    meta: { requiresAdmin: true },
  },
  {
    path: '/admin/create',
    name: 'CreateAdmin',
    component: CreateAdmin,
    meta: { requiresAdmin: true },
  },
  {
    path: '/admin/modify',
    name: 'ModifyAdmin',
    component: ModifyAdmin,
    meta: { requiresAdmin: true },
  },
  {
    path: '/admin/pending',
    name: 'PendingAdmin',
    component: PendingAdmin,
    meta: { requiresAdmin: true },
  },
  {
    path: "/editadmin/:id",
    name: "EditAdmin",
    component: () => import("@/pages/EditAdmin.vue"),
  },


  // 🌸 Redirect any unknown route to home
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 🌼 Route Guard
router.beforeEach((to, from, next) => {
  const storedUser = localStorage.getItem('user')
  const user = storedUser ? JSON.parse(storedUser) : null

  // 👮 Protect admin pages
  if (to.meta.requiresAdmin) {
    if (!user) {
      alert('⚠️ Please log in first.')
      next('/login')
    } else if (user.role !== 'admin') {
      alert('🚫 Access denied. Admins only.')
      next('/garden')
    } else {
      next()
    }
  }

  // 🏡 Prevent logged-in users from going back to login/signup
  else if ((to.path === '/login' || to.path === '/signup') && user) {
    if (user.role === 'admin') {
      next('/admin/home')
    } else {
      next('/profile')
    }
  }

  else {
    next()
  }
})

export default router
