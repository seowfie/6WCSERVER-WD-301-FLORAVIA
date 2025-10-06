<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- Logo -->
      <div class="footer-logo">
        <a href="#Home">
          <img :src="logo" alt="Floravia logo" />
        </a>
      </div>

      <!-- Contact Info -->
      <div class="footer-contact">
        <h4>KEEP IN TOUCH</h4>
        <p>1092 General Aquino St., Angeles City</p>
        <p>0908-211-7575</p>
        <p>floravia.ph@gmail.com</p>
      </div>

      <!-- Quick Links -->
      <div class="footer-links">
        <h4>QUICK LINKS</h4>
        <a href="#Home">Home</a>
        <a href="#Garden">Garden</a>
        <a href="#">Support</a>
        <a href="#">Profile</a>
      </div>

      <!-- Social Links -->
      <div class="footer-social">
        <h4>CONNECT WITH US</h4>
        <!-- Replace with actual social icons later -->
        <p>Facebook | Instagram | TikTok | Email | Website</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import logo from '@/assets/floravia_logo.png';
</script>

<style>
.footer {
  background-color: #B8A0B8;
  color: #F9EFE6;
  padding: 2rem 3rem;
  font-family: "Outfit", sans-serif;
  font-size: 17px;
  font-weight: 600;
  line-height: normal;
}

h4 {
  color: #5B6239;
  font-size: 20px;
  font-weight: 600;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.footer-links a {
  display: block;
  color: white;
  text-decoration: none;
  margin: 0.5rem 0;
}

.footer-logo img {
  width: 251px;
  height: 100px;
  margin-left: 2rem;
}
</style>
