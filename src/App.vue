<template>
  <div id="app">
    <!-- Conditionally show nav/footer -->
    <component :is="isAdmin ? 'AdminNav' : 'AppNav'" />
    <RouterView />
    <component :is="isAdmin ? 'AdminFooter' : 'AppFooter'" />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// User components
import AppNav from './components/NavUser.vue'
import AppFooter from './components/FooterUser.vue'

// Admin components
import AdminNav from './components/NavAdmin.vue'
import AdminFooter from './components/FooterAdmin.vue'

export default {
  components: { AppNav, AppFooter, AdminNav, AdminFooter },
  setup() {
    const route = useRoute()

    // Check if current route path starts with /admin
    const isAdmin = computed(() => route.path.startsWith('/admin'))

    return { isAdmin }
  },
}
</script>

<style>
body {
  padding-top: 100px;
  margin: 0;
  font-family: 'Outfit', sans-serif;
  background-color: #f7e9ec;
}
</style>
