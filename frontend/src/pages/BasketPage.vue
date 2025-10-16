<template>
  <div class="basket-page">
    <div class="featured-header">
      <div class="featured-oval">
        <h2>BASKET</h2>
      </div>
    </div>

    <section class="cart-section">
      <div v-if="basket.length === 0" class="empty">
        <p>Your basket is empty.</p>
      </div>

      <div v-else>
        <table class="cart-table">
          <thead>
            <tr>
              <th>PRODUCT</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>SUBTOTAL</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in basket" :key="index">
              <td class="product-cell">
                <div class="product-info">
                  <img
                    :src="getImageUrl(item.product_id?.product_image)"
                    :alt="item.product_id?.bouquet_name"
                  />
                  <span>{{ item.product_id?.bouquet_name }}</span>
                </div>
              </td>
              <td>₱{{ item.product_id?.price || 0 }}</td>

              <td class="quantity">
                <button @click="decreaseQty(item)">−</button>
                <input type="text" :value="item.quantity" readonly />
                <button @click="increaseQty(item)">+</button>
              </td>

              <td>₱{{ (item.product_id?.price || 0) * item.quantity }}</td>

              <td>
                <button class="delete-btn" @click="removeItem(item._id)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="checkout-container">
          <p class="total">Total: ₱{{ totalPrice }}</p>
          <button class="checkout-btn" @click="goToCheckout">CHECK OUT</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const basket = ref([]);

// 🖼️ Fix local asset paths
function getImageUrl(path) {
  if (!path) return new URL("@/assets/placeholder.jpg", import.meta.url).href;
  const file = path.replace(/^\/+/, "");
  return new URL(`/src/assets/${file}`, import.meta.url).href;
}

const totalPrice = computed(() =>
  basket.value.reduce(
    (sum, item) => sum + (item.product_id?.price || 0) * item.quantity,
    0
  )
);

onMounted(async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) {
      alert("Please log in first!");
      router.push("/login");
      return;
    }

    const res = await axios.get(`http://localhost:3000/api/basket/${user._id}`);
    basket.value = res.data;
    console.log("✅ Basket loaded:", basket.value);
  } catch (err) {
    console.error("❌ Error fetching basket:", err);
  }
});

async function increaseQty(item) {
  item.quantity += 1;
  await updateQuantity(item);
}

async function decreaseQty(item) {
  if (item.quantity > 1) {
    item.quantity -= 1;
    await updateQuantity(item);
  }
}

async function updateQuantity(item) {
  try {
    await axios.post("http://localhost:3000/api/basket", {
      user_id: item.user_id,
      product_id: item.product_id._id,
      quantity: item.quantity,
    });
  } catch (err) {
    console.error("❌ Failed to update quantity:", err);
  }
}

async function removeItem(id) {
  try {
    await axios.delete(`http://localhost:3000/api/basket/${id}`);
    basket.value = basket.value.filter((i) => i._id !== id);
  } catch (err) {
    console.error("❌ Failed to remove item:", err);
  }
}

function goToCheckout() {
  if (!basket.value.length) {
    alert("🛒 Your basket is empty.");
    return;
  }
  router.push("/checkout");
}
</script>

<style scoped>
.basket-page {
  font-family: "Outfit", sans-serif;
}

/* Banner */
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
  font-family: "Caprasimo", sans-serif;
  font-size: 42px;
  font-weight: 100;
  margin: 0;
}

/* Cart */
.cart-section {
  background-color: #ffffff;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.empty {
  font-size: 1.2rem;
  color: #5b6239;
  margin-top: 2rem;
}

.cart-table {
  width: 70%;
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
  vertical-align: middle;
}

/* Product column */
.product-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
}

.product-cell img {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid #ddd;
}

/* Quantity buttons */
.quantity {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.quantity button {
  font-family: "Outfit", sans-serif;
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
  font-family: "Outfit", sans-serif;
  font-weight: bold;
  color: #5b6239;
  width: 36px;
  height: 28px;
  text-align: center;
  border: 2px solid #5b6239;
  background-color: #fdf7f4;
}

/* Delete button */
.delete-btn {
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

/* Checkout Section */
.checkout-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  margin-top: 1rem;
}

.total {
  font-weight: 700;
  font-size: 1.2rem;
  color: #5b6239;
}

.checkout-btn {
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
</style>
