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

    <!-- Featured Section -->
    <section class="featured">
      <!-- Top Floral Divider -->
      <div class="floral-divider">
        <img src="@/assets/flower-divider.png" alt="Flower Divider" />
      </div>

      <!-- Green Background + White Oval with Text -->
      <div class="featured-header">
        <div class="featured-oval">
          <h2>FEATURED</h2>
        </div>
      </div>
    </section>
    <!-- White Section for Featured Items -->
    <!-- <div class="featured-items">
        <div v-for="(flower, index) in featuredFlowers" :key="index" class="flower-card">
          <img :src="flower.image" :alt="flower.name" />
          <p class="name">{{ flower.name }}</p>
          <p class="price">₱{{ flower.price }}</p>
        </div>
      </div>
    </section> -->

    <!-- Gallery Section -->
    <!-- <section class="gallery" id="gallery">
      <h2>Gallery</h2>
      <div class="carousel">
        <button @click="prevImage">‹</button>
        <img :src="images[current]" alt="Bouquet" />
        <button @click="nextImage">›</button>
      </div>
    </section> -->
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import heroLeft from '@/assets/heroleft.png'
import heroRight from '@/assets/heroright.png'

// Router for CTA button
const router = useRouter()
const goToGarden = () => {
  router.push('/garden') // links to GardenPage.vue
}

// // Featured flowers example
// const featuredFlowers = [
//   { name: 'Rose Bouquet', price: 500, image: require('@/assets/featured1.jpg') },
//   { name: 'Tulip Mix', price: 350, image: require('@/assets/featured2.jpg') },
//   { name: 'Sunflower Bundle', price: 400, image: require('@/assets/featured3.jpg') }
// ]

// // Gallery images
// const images = [
//   require('@/assets/gallery1.jpg'),
//   require('@/assets/gallery2.jpg'),
//   require('@/assets/gallery3.jpg')
// ]
// let current = 0

// const nextImage = () => {
//   current = (current + 1) % images.length
// }
// const prevImage = () => {
//   current = (current - 1 + images.length) % images.length
// }
</script>

<style>
/* Hero */
.hero {
  display: flex;
  min-height: 92vh;
}

.hero-left {
  flex: 1;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15rem;
  color: white;
}

.hero-left h1 {
  color: #f5f0ec;
  margin-top: -10px;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  font-family: Outfit;
  font-size: 72px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.hero-left button {
  background-color: #f5f0ec;
  font-family: 'Cou';
  color: #4c3a3a;
  font-size: 1.2rem;
  border: none;
  padding: 1.5rem 1rem;
  cursor: pointer;
  box-shadow: 12px 13px 4px 0 rgba(0, 0, 0, 0.25);
  color: #9a9d68;
  text-align: center;
  font-family: Caprasimo;
  font-size: 48px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.hero-right {
  flex: 1;
  background-size: cover;
  background-position: center;
  padding: 5rem;
}

/* Story */
.story {
  display: flex;
  background-color: #d3bed6;
}
.story-left {
  flex: 1;
  background: url('../assets/story.jpg') center/cover no-repeat;
}
.story-right {
  flex: 1;
  padding: 4rem;
  color: white;
}
.story-right h2 {
  font-size: 2.2rem;
  margin-bottom: 1rem;
}
.story-right p {
  font-size: 1rem;
  line-height: 1.5;
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
  font-size: 2.2rem;
  margin-bottom: 1rem;
}

/* Featured */
.featured {
  background-color: #fff;
  padding: 3rem 0;
  text-align: center;
}
.featured-header .featured-oval {
  display: inline-block;
  background-color: white;
  border-radius: 50%;
  padding: 2rem 3rem;
  margin-bottom: 2rem;
}
.featured-items {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}
.flower-card img {
  width: 200px;
  border-radius: 12px;
}
.flower-card .name {
  font-weight: bold;
  margin-top: 0.5rem;
}
.flower-card .price {
  color: #5b6239;
}

/* Gallery */
.gallery {
  text-align: center;
  background-color: #a7b4b8;
  padding: 3rem 0;
}
.gallery h2 {
  font-size: 2rem;
  color: white;
  margin-bottom: 2rem;
}
.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.carousel img {
  width: 400px;
  height: auto;
  border-radius: 12px;
}
.carousel button {
  background: none;
  border: none;
  font-size: 2rem;
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
  .hero-left,
  .hero-right,
  .story-left,
  .story-right,
  .service-left,
  .service-right {
    width: 100%;
  }
  .carousel img {
    width: 300px;
  }
  .flower-card img {
    width: 150px;
  }
}
</style>
