<template>
  <div id="app">
    <AppNav />
    <RouterView />
    <AppFooter />
  </div>
</template>

<script>
import AppNav from './components/NavUser.vue'
import AppFooter from './components/FooterUser.vue'

export default {
  components: { AppNav, AppFooter },
}
</script>

<style>
body {
  padding-top: 100px;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  background-color: #f7e9ec;
}
</style>
