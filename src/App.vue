<template>
  <div id="app">
    <Nav />
    <!-- <Home /> -->
    <Footer />
  </div>
</template>

<script>
import Nav from './components/Nav.vue'
// import Home from './components/Home.vue'
import Footer from './components/Footer.vue'

export default {
  components: { Nav, Footer }
}
</script>

<style>
body {
  margin: 0;
  font-family: "Poppins", sans-serif;
  background-color: #f7e9ec;
}
</style>
