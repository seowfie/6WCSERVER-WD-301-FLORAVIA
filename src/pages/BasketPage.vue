<template>
  <div class="basket-page">
    <!-- Banner -->
    <div class="featured-header">
      <div class="featured-oval">
        <h2>BASKET</h2>
      </div>
    </div>

    <!-- Cart Section -->
    <section class="cart-section">
      <table class="cart-table">
        <thead>
          <tr>
            <th>PRODUCT</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>ACTION</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(product, index) in cartItems" :key="index">
            <td class="product-cell">
              <!-- FIX: Wrap img and span in a div for flex centering inside the td (don't flex the td itself) -->
              <div class="product-info">
                <img :src="product.image" :alt="product.name" />
                <span>{{ product.name }}</span>
              </div>
            </td>
            <td>₱{{ product.price }}</td>

            <td class="quantity">
              <button @click="decreaseQty(index)">−</button>
              <input type="text" :value="product.quantity" readonly />
              <button @click="increaseQty(index)">+</button>
            </td>

            <td>
              <button class="delete-btn" @click="removeItem(index)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Checkout Button -->
      <div class="checkout-container">
        <button class="checkout-btn">CHECK OUT</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Cart items (using your Red Tulips data)
const cartItems = ref([
  {
    name: 'Red Tulips',
    price: 1800,
    quantity: 1,
    image: '/src/assets/red-tulips.png',
  },
  {
    name: 'Red Tulips',
    price: 1800,
    quantity: 1,
    image: '/src/assets/red-tulips.png',
  },
])

// Increase / decrease logic
const increaseQty = (index) => {
  cartItems.value[index].quantity++
}

const decreaseQty = (index) => {
  if (cartItems.value[index].quantity > 1) {
    cartItems.value[index].quantity--
  }
}

// Remove item
const removeItem = (index) => {
  cartItems.value.splice(index, 1)
}
</script>

<style scoped>
.basket-page {
  font-family: 'Outfit', sans-serif;
}

/* ===== Banner Section ===== */
.featured-header {
  background-color: #f8d2bb;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
  margin-top: -1px;
}

.featured-oval {
  background-color: #ffffff;
  width: 1000px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid #9a9d68;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.featured-oval h2 {
  color: #9a9d68;
  font-family: 'Caprasimo', sans-serif;
  font-size: 42px;
  font-weight: 100;
  margin: 0;
}

/* ===== Cart Section ===== */
.cart-section {
  background-color: #ffffff;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Main Table */
.cart-table {
  width: 60%;
  border-collapse: collapse;
  background-color: #fdf7f4;
  margin-bottom: 2rem;
  transition: width 0.3s ease;
}

.cart-table th {
  background-color: #9a9d68;
  color: white;
  font-weight: 600;
  text-align: center;
  padding: 1rem;
}

.cart-table td {
  padding: 1.5rem 1rem;
  color: #5b6239;
  font-weight: 500;
  text-align: center;
  /* FIX: Add vertical-align: middle to ALL td for consistent row alignment */
  vertical-align: middle;
}

/* Make product name and price bold */
.product-cell span,
.cart-table td:nth-child(2) {
  font-weight: bold;
}

/* Fix uneven spacing: push product away from the left border */
.cart-table th:first-child,
.cart-table td:first-child {
  padding-left: 3.5rem;
  text-align: left;
}

.cart-table th:nth-child(1),
.cart-table td:nth-child(1) {
  width: 20%; /* Product column */
}

.cart-table th:nth-child(2),
.cart-table td:nth-child(2) {
  width: 15%; /* Price */
}

.cart-table th:nth-child(3),
.cart-table td:nth-child(3) {
  width: 20%; /* Quantity */
}

.cart-table th:nth-child(4),
.cart-table td:nth-child(4) {
  width: 20%; /* Action */
}

/* Product cell content */
/* FIX: Remove display: flex from .product-cell (the td itself). Now it's just for other styling. */
.product-cell {
  font-weight: 700;
  /* No display: flex here anymore */
}

/* FIX: New class for the inner wrapper - flex centers img + name vertically within the td */
.product-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.product-cell img {
  width: 90px;
  height: 90px;
  object-fit: cover;
}

/* Quantity controls */

.quantity {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  margin: 0 auto;
  transform: translateY(32px); /* Control the horizontal alignment of quantity picker */
}

.quantity button {
  font-family: 'Outfit', sans-serif;
  font-weight: bold;
  color: #5b6239;
  border: 2px solid #5b6239;
  background: #fdf7f4;
  width: 28px;
  height: 28px;
  font-size: 1rem;
  cursor: pointer;
}

.quantity input {
  font-family: 'Outfit', sans-serif;
  font-weight: bold;
  color: #5b6239;
  height: 22px;
  width: 30px;
  text-align: center;
  border: 2px solid #5b6239;
  background-color: #fdf7f4;
}

/* Delete button */
.delete-btn {
  font-family: 'Outfit', sans-serif;
  background: none;
  border: none;
  color: #5b6239;
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
  transition: 0.3s ease;
}

.delete-btn:hover {
  color: #b8a0b8;
}

/* Checkout button */
.checkout-container {
  display: flex;
  justify-content: center;
  width: 80%;
}

.checkout-btn {
  font-family: 'Outfit', sans-serif;
  background-color: #b8a0b8;
  color: white;
  font-weight: 600;
  border: none;
  padding: 1rem 2.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.3s ease;
}

.checkout-btn:hover {
  background-color: #a78aa8;
  transform: scale(1.05);
}

/* ===== Responsive ===== */
@media (max-width: 1024px) {
  .cart-table,
  .checkout-container {
    width: 90%;
  }
}

@media (max-width: 768px) {
  .cart-table,
  .checkout-container {
    width: 95%;
  }

  .product-cell img {
    width: 70px;
    height: 70px;
  }
}
</style>
