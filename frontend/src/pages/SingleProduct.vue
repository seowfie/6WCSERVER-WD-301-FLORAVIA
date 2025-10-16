<template>
  <div class="product-view">
    <img src="@/assets/single-product-bg.png" alt="Product Background" class="product-bg" />

    <!-- ✅ Show card only if product loaded -->
    <div v-if="product" class="product-card">
      <div class="back-box" @click="goBack">
        <span><img src="@/assets/back-button.png" alt="back" class="back-button-img" /></span>
      </div>

      <div class="card-content">
        <div class="left-section">
          <!-- ✅ Protect against null -->
          <img
            v-if="product?.image"
            :src="product.image"
            :alt="product?.bouquet_name || 'Flower image'"
            class="product-image"
          />
          <p class="price">₱{{ product.price }}</p>
          <p class="stock">Stocks: {{ product.quantity }} Left</p>
        </div>

        <div class="right-section">
          <h2 class="product-name">{{ product.bouquet_name }}</h2>
          <p class="description">{{ product.description }}</p>
          <div class="includes" v-if="product.includes && product.includes.length">
            <p><strong>Includes:</strong></p>
            <ul>
              <li v-for="(item, index) in product.includes" :key="index">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="bottom-section">
        <div class="quantity">
          <button @click="decreaseQty">−</button>
          <input type="text" v-model="quantity" readonly />
          <button @click="increaseQty">+</button>
        </div>

        <div class="buttons">
          <button class="buy" @click="goToCheckout" :disabled="product.quantity === 0">BUY</button>
          <button class="add" @click="addToCart" :disabled="product.quantity === 0">ADD TO CART</button>
        </div>
      </div>
    </div>

    <!-- ✅ Loading fallback -->
    <div v-else class="loading">
      <p>Loading product details...</p>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBasketStore } from "@/stores/basket.js";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const basket = useBasketStore();

const product = ref(null);
const quantity = ref(1);

onMounted(async () => {
  basket._loadFromStorage?.();

  const name = route.query.name;
  if (!name) {
    alert("⚠️ No product name found.");
    router.push("/garden");
    return;
  }

  try {
    // ✅ Fetch from backend by bouquet_name
    const res = await axios.get("http://localhost:3000/api/products");
    const found = res.data.find(
      (p) => p.bouquet_name?.toLowerCase() === name.toLowerCase()
    );

    if (!found) {
      alert("Product not found in the database.");
      router.push("/garden");
      return;
    }

    product.value = {
      _id: found._id,
      bouquet_name: found.bouquet_name,
      price: found.price,
      image: `/src/assets/${found.product_image || "placeholder.jpg"}`,
      quantity: found.quantity || 5,
      description:
        found.description ||
        "A beautiful flower arrangement perfect for any occasion.",
      includes: ["12 premium long-stem flowers", "Optional message card"],
    };

    console.log("✅ Loaded product:", product.value);
  } catch (err) {
    console.error("❌ Error loading product:", err);
    alert("Failed to load product details.");
  }
});

function increaseQty() {
  if (quantity.value < product.value.quantity) quantity.value++;
  else alert(`Only ${product.value.quantity} stocks available.`);
}

function decreaseQty() {
  if (quantity.value > 1) quantity.value--;
}

function goBack() {
  router.back();
}

async function addToCart() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) {
      alert("Please log in first!");
      return;
    }

    await axios.post("http://localhost:3000/api/basket", {
      user_id: user._id,
      product_id: product.value._id,
      quantity: quantity.value,
    });

    basket.addToCart({
      _id: product.value._id,
      bouquet_name: product.value.bouquet_name,
      price: product.value.price,
      image: product.value.image,
      quantity: quantity.value,
      stock: product.value.quantity,
    });

    alert(`${product.value.bouquet_name} added to basket!`);
  } catch (err) {
    console.error("❌ Failed to add item to basket:", err);
    alert("Failed to add item to basket.");
  }
}

async function goToCheckout() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user._id) {
    alert("Please log in first!");
    router.push("/login");
    return;
  }

  try {
    // ✅ Add the selected single product into the basket first
    await axios.post("http://localhost:3000/api/basket", {
      user_id: user._id,
      product_id: product.value._id,
      quantity: quantity.value,
    });

    // ✅ Redirect to the existing checkout page (shows receipt)
    router.push("/checkout");
  } catch (err) {
    console.error("❌ Failed to proceed to checkout:", err);
    alert("❌ Failed to go to checkout. Please try again.");
  }
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
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.85;
  filter: blur(3px) brightness(0.9);
}

/* --- Product Card --- */
.product-card {
  position: relative;
  background: white;
  width: 1050px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 3.5rem;
  border-radius: 0;
}

.back-box {
  position: absolute;
  top: 10px;
  left: -65px;
  background: white;
  width: 65px;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.2s;
  border-radius: 0;
}
.back-box img {
  height: 45px;
}
.back-box:hover {
  transform: scale(1.1);
}

/* --- Card Layout --- */
.card-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 4rem;
}

/* Left Section */
.left-section {
  flex: 1;
  text-align: center;
}
.product-image {
  width: 370px;
  height: auto;
  border-radius: 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}
.price {
  font-weight: bold;
  font-size: 2.3rem;
  color: #9a9d68;
  margin: 1.8rem 0 0.4rem;
}
.stock {
  color: #957bbe;
  font-size: 1.2rem;
}

/* Right Section */
.right-section {
  flex: 1.5;
}
.product-name {
  font-size: 2.6rem;
  color: #9a9d68;
  margin-bottom: 1.5rem;
  font-weight: 800;
}
.description {
  color: #5b6239;
  font-size: 1.25rem;
  line-height: 1.8;
  margin-bottom: 1.2rem;
}
.includes {
  font-size: 1.1rem;
  color: #5b6239;
}
.includes p {
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.includes ul {
  padding-left: 1.2rem;
  text-align: left;
}

/* --- Bottom Section --- */
.bottom-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 3rem;
}

/* Quantity Controls */
.quantity {
  display: flex;
  align-items: center;
}
.quantity button {
  font-family: 'Outfit', sans-serif;
  font-weight: bold;
  font-size: 22px;
  color: #5b6239;
  width: 75px;
  height: 40px;
  border: 2px solid #5b6239;
  background: white;
  cursor: pointer;
  border-radius: 0;
}
.quantity input {
  font-family: 'Outfit', sans-serif;
  font-weight: bold;
  font-size: 22px;
  color: #5b6239;
  height: 36px;
  width: 75px;
  text-align: center;
  border: 2px solid #5b6239;
  border-radius: 0;
}

/* --- Buttons --- */
.buttons {
  display: flex;
  gap: 2rem;
}
.buy {
  font-family: 'Outfit', sans-serif;
  font-weight: bold;
  background-color: #a5a172;
  color: white;
  border: none;
  padding: 1rem 3rem;
  font-size: 1.3rem;
  cursor: pointer;
  border-radius: 0;
  transition: transform 0.3s ease;
}
.buy:hover {
  transform: scale(1.1);
}
.add {
  font-family: 'Outfit', sans-serif;
  font-weight: bold;
  background-color: #cbb6d9;
  color: white;
  border: none;
  padding: 1rem 3rem;
  font-size: 1.3rem;
  cursor: pointer;
  border-radius: 0;
  transition: transform 0.3s ease;
}
.add:hover {
  transform: scale(1.1);
}
</style>
