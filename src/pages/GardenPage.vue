<template>
  <div class="garden-page">
    <!-- Banner Section -->
    <section class="banner">
      <img src="@/assets/banner-flowers.png" alt="Banner Flowers" class="banner-img" />
      <div class="banner-text">
        <h1>Garden:</h1>
        <h2>Pick your Flowers</h2>
      </div>
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

      <!-- White Section for Featured Items -->
      <div class="featured-items">
        <div v-for="(flower, index) in featuredFlowers" :key="index" class="flower-card">
          <img :src="flower.image" :alt="flower.name" />
          <p class="name">{{ flower.name }}</p>
          <p class="price">₱{{ flower.price }}</p>
        </div>
      </div>
    </section>

    <!-- Category Section -->
    <section class="categories">
      <div class="category-buttons">
        <button
          v-for="(category, index) in categories"
          :key="index"
          :class="{ active: selectedCategory === category }"
          @click="selectCategory(category)"
        >
          {{ category }}
        </button>
      </div>

      <div class="category-items">
        <div v-for="(flower, index) in filteredFlowers" :key="index" class="flower-card">
          <img :src="flower.image" :alt="flower.name" />
          <p class="name">{{ flower.name }}</p>
          <p class="price">₱{{ flower.price }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// featured flowers
const featuredFlowers = ref([
  { name: 'Pink Carnations', price: 1800, image: '/src/assets/pink-carnations.png' },
  { name: 'Blue Hydrangeas', price: 1800, image: '/src/assets/blue-hydrangeas.png' },
  { name: 'Lysianthus', price: 1800, image: '/src/assets/lysianthus.png' },
])

// categories
const categories = ['Birthday', 'Romance', 'Congratulation', 'Sympathy']
const selectedCategory = ref('Romance')

// all flowers (placeholder)
const flowers = ref([
  { name: 'Red Roses', category: 'Romance', price: 1800, image: '/src/assets/red-roses.png' },
  {
    name: 'Red Carnations',
    category: 'Romance',
    price: 1800,
    image: '/src/assets/red-carnations.png',
  },
  { name: 'Red Tulips', category: 'Romance', price: 1800, image: '/src/assets/red-tulips.png' },
])

// filter logic
const filteredFlowers = computed(() =>
  flowers.value.filter((f) => f.category === selectedCategory.value),
)

function selectCategory(category) {
  selectedCategory.value = category
}
</script>

<style scoped>
.garden-page {
  background-color: #fdf7f4;
  text-align: center;
  font-family: 'Outfit', sans-serif;
  margin: 0;
  padding: 0;
}

/* Banner Section */
.banner {
  position: relative;
}
.banner-img {
  width: 100%;
  height: 700px;
  object-fit: cover;
  filter: brightness(85%);
}
.banner-text {
  width: 90%;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}
.banner-text h1 {
  font-size: 96px;
  margin: 0;
}
.banner-text h2 {
  font-size: 96px;
  margin: 0;
  font-weight: 700;
}

/* === FEATURED SECTION === */
.banner,
.floral-divider {
  margin: 0;
  padding: 0;
  display: block;
}

.banner-img,
.floral-divider img {
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
}

/* Floral divider image at the top */
.floral-divider {
  background-color: #9a9d68; /* greenish background behind floral line */
}
.floral-divider img {
  width: 100%;
  height: auto;
  display: block;
}

/* Green background with white oval center */
.featured-header {
  background-color: #9a9d68;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
  position: relative;
}

/* The oval shape */
.featured-oval {
  background-color: #ffffff;
  width: 1200px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.featured-oval h2 {
  color: #b8a0b8;
  font-family: 'Caprasimo', sans-serif;
  font-size: 64px;
  font-weight: 100;
  margin: 0;
}

/* White background area with cards */
.featured-items {
  background-color: #ffffff;
  padding: 3rem 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

/* Cards (white, no radius, with shadow) */
.flower-card {
  background-color: #ffffff;
  margin: 100px 15px;
  width: 200px;
  padding: 1rem 1rem 2rem 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.flower-card:hover {
  transform: scale(1.07);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.flower-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.name {
  color: #9a9d68;
  font-weight: 100;
  margin: 2rem 0 0.3rem;
  font-size: 18px;
}

.price {
  color: #9a9d68;
  font-weight: 700;
  font-size: 18px;
}

/* Category Section */
.categories {
  background-color: #f9efe6;
  padding: 3rem 0;
}
.category-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}
.category-buttons button {
  border: 5px solid #a8b9c3;
  background: A8B9C3;
  color: #9a9d68;
  font-weight: 100;
  font-size: 24px;
  font-family: 'Caprasimo';
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  transition: 0.3s ease;
}
.category-buttons button.active {
  border-color: #b8a0b8;
  color: #b8a0b8;
}
.category-buttons button:hover {
  transform: scale(1.05);
}
.category-items {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
}
</style>
