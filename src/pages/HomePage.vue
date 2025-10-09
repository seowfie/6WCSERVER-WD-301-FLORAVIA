<!-- Home.vue -->
<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero" id="home">
      <div class="hero-left" :style="{ backgroundImage: `url(${heroLeft})` }">
        <h1>Bringing Nature’s Elegance to Your Doorstep.</h1>
        <button @click="goToGarden">Shop Now</button>
      </div>
      <div class="hero-right" :style="{ backgroundImage: `url(${heroRight})` }"></div>
    </section>

    <!-- Floral Divider -->
    <div class="floral-divider">
      <img src="@/assets/flower-divider.png" alt="Flower Divider" />
    </div>

    <!-- Story Section -->
    <section class="story">
      <div class="story-left"></div>
      <div class="story-right">
        <h2>Our Blooming Story</h2>
        <p>
          Welcome to Floravia, your go-to online flower shop for every occasion. We believe flowers
          have the power to brighten any moment, from heartfelt celebrations to simple everyday
          gestures. Our goal is to make it easy for anyone to browse, customize, and order blooms
          with just a few clicks.
        </p>
      </div>
    </section>

    <!-- Featured Oval -->
    <div class="featured-header">
      <div class="featured-oval">
        <p>
          Whether you’re sending a surprise bouquet or decorating your space, Floravia helps you
          share love and color, one petal at a time.
        </p>
      </div>
    </div>

    <!-- Service Section -->
    <section class="service" id="garden">
      <div class="service-left">
        <h2>Service</h2>
        <p>
          Welcome to Floravia, your go-to online flower shop for every occasion. We believe flowers
          have the power to brighten any moment, from heartfelt celebrations to simple everyday
          gestures. Our goal is to make it easy for anyone to browse, customize, and order blooms
          with just a few clicks.
        </p>
      </div>
      <div class="service-right"></div>
    </section>

    <!-- Gallery Section -->
    <section class="gallery" id="gallery">
      <h2>Gallery</h2>
      <div class="carousel">
        <button @click="prevImage">‹</button>
        <img :src="images[current]" alt="Bouquet" class="carousel-img" />
        <button @click="nextImage">›</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import heroLeft from '@/assets/heroleft.png'
import heroRight from '@/assets/heroright.png'

// Gallery images
const images = [
  new URL('@/assets/gallery1.jpg', import.meta.url).href,
  new URL('@/assets/gallery2.jpg', import.meta.url).href,
  new URL('@/assets/gallery3.jpg', import.meta.url).href,
  new URL('@/assets/gallery4.jpg', import.meta.url).href,
]

const current = ref(0)
const nextImage = () => (current.value = (current.value + 1) % images.length)
const prevImage = () => (current.value = (current.value - 1 + images.length) % images.length)

const router = useRouter()
const goToGarden = () => router.push('/garden')
</script>

<style>
/* Hero */
.hero {
  display: flex;
  min-height: 92vh;
}

.hero-left,
.hero-right {
  flex: 1;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero-left {
  color: white;
  padding: 2%;
}

.hero-left h1 {
  font-family: Outfit;
  font-size: 55px;
  font-weight: 700;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 20px;
}

.hero-left button {
  font-family: Caprasimo;
  font-size: 35px;
  color: #9a9d68;
  background-color: #f5f0ec;
  border: none;
  padding: 20px 10px;
  cursor: pointer;
  box-shadow: 12px 13px 4px rgba(0, 0, 0, 0.25);
}

/* Story */
.floral-divider img {
  width: 100%;
  height: auto;
  display: block;
}

.story {
  display: flex;
  background-color: #b8a0b8;
}

.story-left {
  flex: 1;
  background: url('../assets/aboutus.png') center/cover no-repeat;
}

.story-right {
  flex: 1;
  padding: 4rem;
  color: white;
}

.story-right h2 {
  font-family: Caprasimo;
  font-size: 64px;
  text-align: center;
}

.story-right p {
  font-family: Outfit;
  font-size: 24px;
  padding: 50px;
  text-align: justify;
}

/* Featured Oval */
.featured-header {
  display: flex;
  justify-content: center;
  padding: 3rem 0;
}

.featured-oval {
  background-color: #f5f0ec;
  width: 1000px;
  height: 220px;
  border-radius: 50%;
  border: 4px solid #9a9d68;
  display: flex;
  justify-content: center;
  align-items: center;
}

.featured-oval p {
  font-family: Outfit;
  font-size: 25px;
  text-align: center;
  color: #9a9d68;
  padding: 20px 100px;
}

/* Service */
.service {
  display: flex;
  background-color: #a9ac8c;
  color: white;
}

.service-left {
  flex: 1;
  padding: 4rem;
}

.service-left h2 {
  font-family: Caprasimo;
  font-size: 64px;
  text-align: center;
}

.service-left p {
  font-family: Outfit;
  font-size: 24px;
  padding: 50px;
  text-align: justify;
}

.service-right {
  flex: 1;
  background: url('../assets/service.png') center/cover no-repeat;
}

/* Gallery */
.gallery {
  text-align: center;
  padding: 3rem 1rem;
  background-image: url('@/assets/gallerybg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
}

.gallery h2 {
  font-family: Caprasimo;
  font-size: 64px;
}

.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.carousel img {
  width: 350px;
  max-width: 80vw;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.carousel button {
  background: none;
  border: none;
  font-size: 6rem;
  color: white;
  cursor: pointer;
  padding: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .hero,
  .story,
  .service {
    flex-direction: column;
  }
  .carousel img {
    width: 250px;
  }
}
</style>

