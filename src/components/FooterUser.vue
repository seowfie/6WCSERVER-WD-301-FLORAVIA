<!-- Footer.vue -->
<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- Logo -->
      <div class="footer-logo">
        <router-link to="/">
          <img :src="logo" alt="Floravia logo" />
        </router-link>
      </div>

      <!-- Contact Info -->
      <div class="footer-contact">
        <h4>KEEP IN TOUCH</h4>

        <div class="contact-item">
          <img :src="locationIcon" alt="Location icon" />
          <p>1092 General Aquino St., Angeles City</p>
        </div>

        <div class="contact-item">
          <img :src="phoneIcon" alt="Phone icon" />
          <p>0908-211-7575</p>
        </div>

        <div class="contact-item">
          <img :src="emailIcon" alt="Email icon" />
          <p>floravia.ph@gmail.com</p>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="footer-links">
        <h4>QUICK LINKS</h4>
        <router-link to="/">Home</router-link>
        <router-link to="/garden">Garden</router-link>
        <router-link to="/support">Support</router-link>
        <router-link to="/profile">Profile</router-link>
      </div>

      <!-- Social Links -->
      <div class="footer-social">
        <h4>CONNECT WITH US</h4>
        <div class="social-icons">
          <a href="https://www.facebook.com" target="_blank">
            <img :src="facebookIcon" alt="Facebook" />
          </a>
          <a href="https://www.instagram.com" target="_blank">
            <img :src="instagramIcon" alt="Instagram" />
          </a>
          <a href="https://www.tiktok.com" target="_blank">
            <img :src="tiktokIcon" alt="TikTok" />
          </a>
          <a href="mailto:floravia.ph@gmail.com">
            <img :src="emailconIcon" alt="Email" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import logo from '@/assets/floravia_logo.png'

// Contact vectors
import locationIcon from '@/assets/vectors/Location.png'
import phoneIcon from '@/assets/vectors/Phone.png'
import emailIcon from '@/assets/vectors/Email.png'

// Social vectors
import facebookIcon from '@/assets/vectors/facebook.png'
import instagramIcon from '@/assets/vectors/instagram.png'
import tiktokIcon from '@/assets/vectors/tiktok.png'
import emailconIcon from '@/assets/vectors/Email_Connect.png'
</script>

<style>
.footer {
  background-color: #b8a0b8;
  color: #f9efe6;
  padding: 2rem 3rem;
  font-family: 'Outfit', sans-serif;
  font-size: 17px;
  font-weight: 600;
  line-height: normal;
}

h4 {
  color: #5b6239;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 1rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
}

/* Logo */
.footer-logo img {
  width: 251px;
  height: 100px;
  margin-left: 2rem;
}

/* Contact Info */
.footer-contact .contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: -1px;
}

.footer-contact .contact-item img {
  width: 24px;
  height: 24px;
  object-fit: contain;
  transition: transform 0.2s ease;
}

.footer-contact .contact-item img:hover {
  transform: scale(1.1);
}

/* Quick Links */
.footer-links a {
  display: block;
  color: #f9efe6;
  text-decoration: none;
  margin: 0.5rem 0;
  transition:
    color 0.3s ease,
    transform 0.3s ease;
}

.footer-links a:hover {
  color: #f8d2bb;
  transform: translateX(5px);
}

/* Social Links */
.footer-social .social-icons {
  display: flex;
  gap: 15px;
  margin-top: 0.5rem;
}

.footer-social .social-icons img {
  width: 30px;
  height: 30px;
  padding-top: 20px;
  padding-right: 30px;
  object-fit: contain;
  transition: transform 0.2s ease;
}

.footer-social .social-icons img:hover {
  transform: scale(1.1);
}

/* Responsive */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-logo {
    margin-bottom: 1.5rem;
  }
}
</style>
