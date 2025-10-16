<template>
  <div id="app">
    <!-- ✅ Show admin navbar/footer only on /admin routes -->
    <AdminNavbar v-if="$route.path.startsWith('/admin')" />
    <Navbar v-else />

    <!-- Page content -->
    <router-view />

    <AdminFooter v-if="$route.path.startsWith('/admin')" />
    <Footer v-else />
  </div>
</template>

<script setup>
// ✅ Correct imports — these must match files in src/components/
import Navbar from '@/components/NavUser.vue'
import Footer from '@/components/FooterUser.vue'
import AdminNavbar from '@/components/AdminNavbar.vue'
import AdminFooter from '@/components/AdminFooter.vue'
</script>

<style>
body {
  margin: 0;
  padding-top: 100px;
  font-family: 'Poppins', sans-serif;
  background-color: #f7e9ec;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

router-view {
  flex: 1;
}
</style>
