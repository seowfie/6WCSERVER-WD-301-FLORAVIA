<template>
  <div class="checkout-page">
    <img src="@/assets/single-product-bg.png" alt="Checkout Background" class="checkout-bg" />

    <div class="receipt-card">
      <div class="back-box" @click="goBack">
        <img src="@/assets/back-button.png" alt="Back" class="back-button-img" />
      </div>

      <h2 class="receipt-title">Receipt</h2>

      <!-- Delivery Details -->
      <div class="section">
        <h3 class="section-title">Delivery Details</h3>
        <p class="detail-name">{{ user?.firstname }} {{ user?.lastname }}</p>
        <p class="detail-name">{{ user?.address || "No address provided" }}</p>
        <p class="detail-name">{{ user?.phone || "No phone provided" }}</p>
      </div>

      <!-- Products Ordered -->
      <div class="section">
        <h3 class="section-title">Products Ordered</h3>
        <div v-for="(item, index) in basket" :key="index" class="product-line">
          <div class="product-info">
            <img :src="getImageUrl(item.product_id?.product_image)" class="product-img" />
            <p class="product-name">
              {{ item.product_id?.bouquet_name }} (x{{ item.quantity }})
            </p>
          </div>
          <p class="product-price">₱{{ item.product_id?.price * item.quantity }}</p>
        </div>
      </div>

      <!-- Mode of Payment -->
      <div class="section">
        <h3 class="section-title">Mode of Payment</h3>

        <div class="payment-options">
          <label class="payment-option">
            <input type="radio" v-model="paymentMethod" value="Cash on Delivery" />
            <span>Cash on Delivery</span>
          </label>

          <label class="payment-option">
            <input type="radio" v-model="paymentMethod" value="GCash" />
            <span>GCash</span>
          </label>
        </div>
      </div>

      <!-- Total -->
      <div class="section total">
        <p class="total-label">Total Price:</p>
        <p class="total-amount">₱{{ totalPrice }}</p>
      </div>

      <div class="buy-btn-container">
        <button class="buy-btn" @click="buyNow">BUY</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const basket = ref([]);
const user = ref(null);
const paymentMethod = ref("Cash on Delivery"); // ✅ Default payment option

// 🖼️ Fix image display
function getImageUrl(path) {
  if (!path) return new URL("@/assets/placeholder.jpg", import.meta.url).href;
  const clean = path.replace(/^\/+/, "");
  return new URL(`/src/assets/${clean}`, import.meta.url).href;
}

// 💰 Compute total
const totalPrice = computed(() =>
  basket.value.reduce(
    (sum, item) => sum + (item.product_id?.price || 0) * item.quantity,
    0
  )
);

// 🧺 Load basket items on mount
onMounted(async () => {
  const stored = localStorage.getItem("user");
  if (stored) user.value = JSON.parse(stored);

  if (!user.value?._id) {
    alert("⚠️ Please log in first.");
    router.push("/login");
    return;
  }

  try {
    const res = await axios.get(`http://localhost:3000/api/basket/${user.value._id}`);
    basket.value = res.data;
    console.log("🧺 Basket loaded:", basket.value);
  } catch (err) {
    console.error("❌ Error loading basket:", err);
    alert("Failed to load basket items.");
  }
});

// 🛒 Buy Now handler
async function buyNow() {
  if (!basket.value.length) {
    alert("🛒 Your basket is empty.");
    return;
  }

  try {
    const formattedItems = basket.value.map((i) => ({
      product_id: i.product_id?._id,
      quantity: i.quantity,
    }));

    const orderData = {
      userId: user.value._id,
      items: formattedItems,
      delivery: {
        name: `${user.value.firstname} ${user.value.lastname}`,
        address: user.value.address || "N/A",
        phone: user.value.phone || "N/A",
      },
      payment: paymentMethod.value, // ✅ Include selected payment method
    };

    const res = await axios.post("http://localhost:3000/api/orders", orderData);
    console.log("✅ Order placed:", res.data);
    alert(`✅ Order placed successfully!\nPayment Method: ${paymentMethod.value}`);

    await axios.delete(`http://localhost:3000/api/basket/clear/${user.value._id}`);
    router.push("/profile");
  } catch (err) {
    console.error("❌ Error placing order:", err.response?.data || err.message);
    alert("❌ Failed to place order. Please try again.");
  }
}

function goBack() {
  router.back();
}
</script>

<style scoped>
.checkout-page {
  font-family: "Outfit", sans-serif;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  overflow: hidden;
  padding: 4rem 1rem;
}

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

.receipt-card {
  position: relative;
  z-index: 1;
  background: #fff;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  padding: 2rem 3rem 3rem 3rem;
  text-align: left;
}

/* 🔙 Back button */
.back-box {
  position: absolute;
  top: 15px;
  left: 15px;
  background: white;
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.2s ease;
  border-radius: 0;
}
.back-button-img {
  height: 28px;
}
.back-box:hover {
  transform: scale(1.1);
}

.receipt-title {
  font-family: "Caprasimo", sans-serif;
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

/* ✅ Payment Options */
.payment-options {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 0.5rem;
}

.payment-option {
  display: flex;
  align-items: center;
  font-family: 'Outfit', sans-serif;
  color: #5b6239;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s ease;
}

.payment-option input[type='radio'] {
  margin-right: 0.6rem;
  accent-color: #9a9d68;
  transform: scale(1.1);
}

.payment-option:hover span {
  color: #9a9d68;
}

.buy-btn-container {
  text-align: center;
  margin-top: 1rem;
}

.buy-btn {
  font-family: "Outfit", sans-serif;
  background-color: #9a9d68;
  color: white;
  border: none;
  padding: 1.25rem 4rem;
  font-weight: 600;
  font-size: 1.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.25s ease;
}

.buy-btn:hover {
  background-color: #6b6b36;
  transform: scale(1.05);
}
</style>
