<template>
  <div class="profile-page">
    <!-- Profile -->
    <section class="profile-section">
      <div class="profile-container">
        <div class="left-side">
          <img :src="profileIcon" alt="Profile Icon" class="profile-icon" />
          <p class="username">/{{ user?.username }}/</p>
          <button class="logout-btn" @click="logout">LOG OUT</button>
        </div>

        <div class="right-side">
          <form @submit.prevent="saveAddress">
            <div class="name-row">
              <div class="name-field">
                <label>First Name</label>
                <p class="info-field">{{ user?.firstname }}</p>
              </div>
              <div class="name-field">
                <label>Last Name</label>
                <p class="info-field">{{ user?.lastname }}</p>
              </div>
            </div>

            <label>Email</label>
            <p class="info-field">{{ user?.email }}</p>

            <label>Phone Number</label>
            <p class="info-field">{{ user?.phone }}</p>

            <label>Address:</label>
            <input v-model="address" type="text" placeholder="Enter your address" />

            <button type="submit" class="save-btn">SAVE</button>
          </form>
        </div>
      </div>
    </section>

    <!-- Orders -->
    <section class="featured-header">
      <div class="featured-oval">
        <h2>ORDER STATUS</h2>
      </div>
    </section>

    <section class="order-status-section">
      <div class="status-buttons">
        <button
          v-for="status in statuses"
          :key="status"
          class="status-btn"
          :class="{ active: selectedStatus === status }"
          @click="selectedStatus = status"
        >
          {{ status }}
        </button>
      </div>

      <table class="order-table">
        <thead>
          <tr>
            <th>PRODUCT</th>
            <th>ORDER ID</th>
            <th>TOTAL</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in filteredOrders" :key="order._id">
            <td>
              <div v-for="item in order.items" :key="item.product._id">
                <img
                  :src="getImageUrl(item.product?.product_image)"
                  class="order-img"
                  :alt="item.product?.bouquet_name"
                />

                <p>{{ item.product.bouquet_name }}</p>
              </div>
            </td>
            <td>{{ order._id }}</td>
            <td>₱{{ order.totalPrice }}</td>
            <td>{{ order.status }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import profileIcon from "@/assets/profile.png";

const router = useRouter();
const user = ref(null);
const address = ref("");
const orders = ref([]);
const statuses = ["PENDING", "TO SHIP", "TO RECEIVE", "COMPLETED", "CANCELLED"];
const selectedStatus = ref("PENDING");

function getImageUrl(path) {
  if (!path) return new URL("@/assets/placeholder.jpg", import.meta.url).href;
  const clean = path.replace(/^\/+/, ""); // remove leading slashes if any
  return new URL(`/src/assets/${clean}`, import.meta.url).href;
}


onMounted(async () => {
  // ✅ Automatically detect the stored user key
  const possibleKeys = ["user", "userInfo", "info", "customer"];
  for (const key of possibleKeys) {
    const stored = localStorage.getItem(key);
    if (stored) {
      user.value = JSON.parse(stored);
      console.log("✅ Loaded user:", user.value);
      break;
    }
  }

  if (!user.value) {
    alert("⚠️ Please log in first.");
    return router.push("/login");
  }

  address.value = user.value.address || "";

  try {
    // ✅ Determine the correct userId field
    const userId = user.value._id || user.value.id || user.value.userId;
    console.log("🧾 Using userId:", userId);

    if (!userId) {
      console.error("❌ No valid user ID found in:", user.value);
      alert("Cannot load orders — missing user ID.");
      return;
    }

    // ✅ Fetch orders with correct ID
    const res = await axios.get(`http://localhost:3000/api/orders/my?userId=${userId}`);
    orders.value = res.data;
    console.log("✅ Orders fetched:", orders.value);
  } catch (err) {
    console.error("❌ Error loading orders:", err.response?.data || err);
  }
});

const saveAddress = () => {
  if (!address.value.trim()) return alert("Please enter your address.");
  user.value.address = address.value;
  localStorage.setItem("user", JSON.stringify(user.value));
  alert("✅ Address saved!");
};

const logout = () => {
  localStorage.removeItem("user");
  router.push("/login");
};

const filteredOrders = computed(() =>
  orders.value.filter((o) => o.status === selectedStatus.value)
);
</script>

<style scoped>
/* 🌸 Entire Page */
.profile-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Outfit', sans-serif;
  overflow-x: hidden;
}

/* 🌼 Profile Section */
.profile-section {
  width: 100%;
  background-image: url('@/assets/profilebg.png');
  background-size: cover;
  background-position: center;
  padding: 60px 20px;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
}

.profile-container {
  display: flex;
  background-color: #f5f0ec;
  max-width: 900px;
  width: 100%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.left-side {
  flex: 1;
  background-color: #f8d2bb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.profile-icon {
  width: 130px;
  height: 130px;
  object-fit: contain;
  margin-bottom: 12px;
}

.username {
  color: #5b6239;
  font-weight: 600;
  margin-bottom: 16px;
}

.logout-btn {
  font-family: 'Outfit', sans-serif;
  background-color: #9a9d68;
  color: white;
  border: none;
  padding: 12px 28px;
  cursor: pointer;
  font-weight: 800;
}

.logout-btn:hover {
  background-color: #5b6239;
}

/* Right Side */
.right-side {
  flex: 2;
  background-color: #f5f0ec;
  padding: 40px;
}

.name-row {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
}

.name-field {
  flex: 1;
}

label {
  font-weight: 600;
  color: #5b6239;
  display: block;
  margin-bottom: 4px;
}

.info-field {
  background-color: #ffffff;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 16px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 16px;
  box-sizing: border-box;
}

.save-btn {
  font-family: 'Outfit', sans-serif;
  background-color: #f8d2bb;
  color: #5b6239;
  border: none;
  padding: 12px 32px;
  font-weight: 800;
  cursor: pointer;
  font-size: 1rem;
}

.save-btn:hover {
  background-color: #9a9d68;
  color: #fff;
}

/* 🌿 Featured Oval Section */
.featured-header {
  background-color: #a8b9c3;
  width: 100%;
  padding: 80px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.featured-oval {
  background-color: #f5f0ec;
  width: 100%;
  max-width: 1200px;
  height: 160px;
  border: 4px solid #f8d2bb;
  display: flex;
  justify-content: center;
  align-items: center;
}

.featured-oval h2 {
  color: #f8d2bb;
  font-family: 'Caprasimo', sans-serif;
  font-size: 48px;
  font-weight: 100;
  margin: 0;
}

/* 💐 Order Status Section */
.order-status-section {
  background-color: #f9efe6;
  width: 100%;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
}

/* Dynamic Buttons */
.status-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-bottom: 30px;
}

.status-btn {
  background-color: #9a9d68;
  border: none;
  padding: 30px 50px;
  cursor: pointer;
  color: #f5f0ec;
  font-family: 'Outfit', sans-serif;
  font-size: 20px;
  font-weight: 400;
}

.status-btn.active,
.status-btn:hover {
  background-color: #5b6239;
}

/* Table Layout */
.order-table {
  width: 100%;
  max-width: 1000px;
  border-collapse: separate;
  border-spacing: 0 12px;
  background-color: transparent;
}

.order-table th {
  background-color: #f8d2bb;
  color: #5b6239;
  font-weight: 700;
  padding: 14px;
  text-align: center;
  border: none;
}

.order-table td {
  background-color: #ffffff;
  padding: 16px;
  text-align: center;
  color: #5b6239;
  border: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.order-img {
  width: 100px;
  height: 100px;
  object-fit: contain;
}
</style>
