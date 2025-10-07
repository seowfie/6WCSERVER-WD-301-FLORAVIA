<template>
  <div class="product-view">
    <!-- Background -->
    <img src="@/assets/single-product-bg.png" alt="Product Background" class="product-bg" />

    <!-- Product Card -->
    <div class="product-card">
      <!-- Back Button Box -->
      <div class="back-box" @click="goBack">
        <span
          ><img src="@/assets/back-button.png" alt="back button" class="back-button-img"
        /></span>
      </div>

      <div class="card-content">
        <!-- Left Section -->
        <div class="left-section">
          <img :src="product.image" :alt="product.name" class="product-image" />
          <p class="price">₱{{ product.price }}</p>
          <p class="stock">Stocks: {{ product.stock }} Left</p>
        </div>

        <!-- Right Section -->
        <div class="right-section">
          <h2 class="product-name">{{ product.name }}</h2>
          <p class="description">{{ product.description }}</p>
          <div class="includes">
            <p><strong>Includes:</strong></p>
            <ul>
              <li v-for="(item, index) in product.includes" :key="index">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="bottom-section">
        <div class="quantity">
          <button @click="decreaseQty">−</button>
          <input type="text" v-model="quantity" readonly />
          <button @click="increaseQty">+</button>
        </div>

        <div class="buttons">
          <button class="buy">BUY</button>
          <button class="add">ADD TO CART</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const product = ref({
  name: route.params.name || 'Red Tulips',
  image: route.query.image || '/src/assets/red-tulips.png',
  price: route.query.price || '1800',
  stock: 7,
  description:
    'Elegant and timeless, red tulips embody love in its purest form. Their simple yet striking beauty makes them a perfect way to say “I love you” — naturally and sincerely.',
  includes: ['12 premium long-stem red roses', 'Optional personalized message card'],
})

const quantity = ref(1)

function increaseQty() {
  quantity.value++
}
function decreaseQty() {
  if (quantity.value > 1) quantity.value--
}
function goBack() {
  router.back()
}
</script>

<style scoped>
.product-view {
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Outfit', sans-serif;
  overflow: hidden;
}

/* --- Background Image --- */
.product-bg {
  position: absolute;
  inset: 0; /* top: 0; right: 0; bottom: 0; left: 0 */
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.85; /* slightly faded for readability */
  filter: blur(3px) brightness(0.9);
}

/* --- Card stays above background --- */
.product-card {
  position: relative;
  background: white;
  width: 600px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  z-index: 1;
  padding: 2rem;
}

.back-box {
  position: absolute;
  top: 0px;
  left: -50px;
  background: white;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.2s;
}

.back-box img {
  height: 35px;
  align-items: center;
}

.back-box:hover {
  transform: scale(1.1);
}

.card-content {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.left-section {
  flex: 1;
  text-align: center;
}
.product-image {
  width: 200px;
  height: auto;
}
.price {
  font-weight: bold;
  font-size: 1.4rem;
  color: #9a9d68;
  margin: 1rem 0 0.3rem;
}
.stock {
  color: #957bbe;
}

.right-section {
  flex: 1;
}
.product-name {
  font-size: 1.5rem;
  color: #9a9d68;
  margin-bottom: 1rem;
}
.description {
  color: #5b6239;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}
.includes {
  font-size: 0.9rem;
  color: #5b6239;
}

.bottom-section {
  display: flex;
  flex-direction: column; /* Stack quantity on top, buttons below */
  align-items: center; /* Center horizontally */
  justify-content: center; /* Center vertically within the section */
  gap: 1rem; /* Space between quantity and buttons */
  margin-top: 2rem;
  padding-top: 1rem;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 0;
}

.quantity button {
  font-family: 'Outfit', sans-serif;
  font-weight: bold;
  font-size: 16px;
  color: #5b6239;
  width: 60px;
  height: 30px;
  border: 2px solid #5b6239;
  background: white;
  cursor: pointer;
}
.quantity input {
  font-family: 'Outfit', sans-serif;
  font-weight: bold;
  font-size: 16px;
  color: #5b6239;
  height: 24px;
  width: 60px;
  text-align: center;
  border: 2px solid #5b6239;
}

.buttons {
  display: flex;
  gap: 1rem;
}

.buy {
  font-family: 'Outfit', sans-serif;
  font-weight: bold;
  background-color: #a5a172;
  color: white;
  border: none;
  padding: 0.6rem 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.buy:hover {
  transform: scale(1.15);
}

.add {
  font-family: 'Outfit', sans-serif;
  font-weight: bold;
  background-color: #cbb6d9;
  color: white;
  border: none;
  padding: 0.6rem 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.add:hover {
  transform: scale(1.15);
}
</style>
