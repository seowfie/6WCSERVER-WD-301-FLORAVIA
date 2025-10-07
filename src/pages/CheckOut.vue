<template>
  <div class="checkout-page">
    <!-- Background Image -->
    <img src="@/assets/single-product-bg.png" alt="Checkout Background" class="checkout-bg" />

    <!-- Main Content -->
    <div class="receipt-card">
      <h2 class="receipt-title">Receipt</h2>

      <!-- Delivery Details -->
      <div class="section">
        <h3 class="section-title">Delivery Details</h3>
        <p class="detail-name">{{ deliveryDetails.name }}</p>
        <p class="detail-name">{{ deliveryDetails.address }}</p>
        <p class="detail-name">{{ deliveryDetails.phone }}</p>
      </div>

      <!-- Products Ordered -->
      <div class="section">
        <h3 class="section-title">Products Ordered</h3>

        <div v-for="(product, index) in orderedProducts" :key="index" class="product-line">
          <div class="product-info">
            <img :src="product.image" :alt="product.name" class="product-img" />
            <p class="product-name">{{ product.quantity }}x {{ product.name }}</p>
          </div>
          <p class="product-price">₱{{ product.price }}</p>
        </div>
      </div>

      <!-- Total -->
      <div class="section total">
        <p class="total-label">Total Price:</p>
        <p class="total-amount">₱{{ totalPrice }}</p>
      </div>

      <div class="buy-btn-container">
        <button class="buy-btn">BUY</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Delivery info (you can later bind this from user data)
const deliveryDetails = ref({
  name: 'Adrian D. Curley',
  address: 'General Luna St., Babo Sacan, Porac, Pampanga',
  phone: '09XX - XXX - XXXX',
})

// Ordered products (placeholder — can be replaced with store/cart data)
const orderedProducts = ref([
  {
    name: 'Red Tulips',
    quantity: 1,
    price: 1800,
    image: '/src/assets/red-tulips.png',
  },
  {
    name: 'Red Tulips',
    quantity: 1,
    price: 1800,
    image: '/src/assets/red-tulips.png',
  },
])

// Compute total
const totalPrice = computed(() =>
  orderedProducts.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
)
</script>

<style scoped>
.checkout-page {
  font-family: 'Outfit', sans-serif;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  overflow: hidden;
  padding: 4rem 1rem;
}

/* --- Background image --- */
.checkout-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.85;
  filter: blur(2px);
}

/* --- Receipt Card --- */
.receipt-card {
  position: relative; /* needed so it sits above the bg */
  z-index: 1;
  background: #fff;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.25);
  padding: 0.5rem 3rem 3rem 3rem;
  text-align: left;
}

.receipt-card {
  background: #fff;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  padding: 0.5rem 3rem 3rem 3rem;
  text-align: left;
}

.receipt-title {
  font-family: 'Caprasimo', sans-serif;
  text-align: center;
  color: #b499c2;
  font-size: 40px;
  font-weight: normal;
  margin-bottom: 2rem;
}

.section {
  margin: 0 1.5rem 2rem 1.5rem;
}

.section-title {
  color: #9a9d68;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.detail-name {
  color: #6b6b36;
  font-weight: bold;
  margin-left: 2rem;
}

/* Product display */
.product-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.product-info {
  color: #6b6b36;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: 2rem;
}

.product-img {
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: 0.5rem;
  background-color: #b8a0b8;
  padding: 0.25rem;
}

.product-name {
  font-weight: 600;
}

.product-price {
  color: #b8a0b8;
  font-weight: bold;
  margin-right: 2rem;
}

/* Total section */
.total {
  border-top: 1px solid #b8a0b8;
  padding-top: 1rem;
}

.total-label {
  color: #9a9d68;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 0.3rem;
}

.total-amount {
  color: #b8a0b8;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
}

/* Buy button */
.buy-btn-container {
  text-align: center;
  margin-top: 1rem;
}

.buy-btn {
  font-family: 'Outfit', sans-serif;
  background-color: #9a9d68;
  color: white;
  border: none;
  padding: 1.25rem 4rem;
  font-weight: 600;
  font-size: 1.25rem;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.25s ease;
}

.buy-btn:hover {
  background-color: #6b6b36;
  transform: scale(1.05); /* Slightly grows when hovered */
}
</style>
