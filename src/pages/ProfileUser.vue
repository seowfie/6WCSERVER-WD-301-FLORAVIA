<template>
  <div class="profile-page">
    <!-- 🌸 Profile Section -->
    <section class="profile-section">
      <div class="profile-container">
        <!-- Left -->
        <div class="left-side">
          <img :src="profileIcon" alt="Profile Icon" class="profile-icon" />
          <p class="username">/username/</p>
          <button class="logout-btn">LOG OUT</button>
        </div>

        <!-- Right -->
        <div class="right-side">
          <form @submit.prevent>
            <div class="name-row">
              <div class="name-field">
                <label>First Name</label>
                <p class="info-field">Jane</p>
              </div>
              <div class="name-field">
                <label>Last Name</label>
                <p class="info-field">Doe</p>
              </div>
            </div>

            <label>Email</label>
            <p class="info-field">janedoe@email.com</p>

            <label>Phone Number</label>
            <p class="info-field">+63 912 345 6789</p>

            <label>Address:</label>
            <input type="text" placeholder="Enter your address" />

            <button type="submit" class="save-btn">SAVE</button>
          </form>
        </div>
      </div>
    </section>

    <!-- 🌿 Featured Oval Section -->
    <section class="featured-header">
      <div class="featured-oval">
        <h2>ORDER STATUS</h2>
      </div>
    </section>

    <!-- 💐 Order Status Section -->
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

      <!-- 🪻 Orders Table -->
      <table class="order-table">
        <thead>
          <tr>
            <th>PRODUCT IMAGE</th>
            <th>ORDER ID</th>
            <th>TITLE</th>
            <th>TOTAL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in filteredOrders" :key="order.id">
            <td><img :src="order.image" alt="Product" class="order-img" /></td>
            <td>{{ order.id }}</td>
            <td>{{ order.product }}</td>
            <td>{{ order.total }}</td>
            <td>
              <button class="cancel-btn" v-if="order.status === 'PENDING'">CANCEL</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import profileIcon from '@/assets/profile.png'
import redRoses from '@/assets/red-roses.png'

const statuses = ['PENDING', 'TO SHIP', 'TO RECEIVE', 'COMPLETED', 'CANCELLED']
const selectedStatus = ref('PENDING')

const orders = ref([
  { id: '111111', product: 'Boukey Aniv', total: '₱1300', status: 'PENDING', image: redRoses },
  { id: '222222', product: 'Sweet Lily', total: '₱900', status: 'TO SHIP', image: redRoses },
  {
    id: '333333',
    product: 'Sunshine Mix',
    total: '₱1100',
    status: 'COMPLETED',
    image: redRoses,
  },
])

const filteredOrders = computed(() => orders.value.filter((o) => o.status === selectedStatus.value))
</script>

<style scoped>
/* 🌸 Entire Page */
.profile-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Outfit', sans-serif;
  overflow-x: hidden; /* ✅ Prevent horizontal scroll globally */
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
  overflow-x: hidden; /* ✅ Prevent bg overflow */
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

/* Larger SAVE Button */
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
  overflow-x: hidden; /* ✅ Prevent table overflow */
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
  width: 100%; /* ✅ Fixed overflow */
  max-width: 1000px;
  border-collapse: separate;
  border-spacing: 0 12px;
  background-color: transparent;
}

/* Table Header */
.order-table th {
  background-color: #f8d2bb;
  color: #5b6239;
  font-weight: 700;
  padding: 14px;
  text-align: center;
  border: none;
}

/* Table Rows */
.order-table td {
  background-color: #ffffff;
  padding: 16px;
  text-align: center;
  color: #5b6239;
  border: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

/* Product Image */
.order-img {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

/* Cancel Button */
.cancel-btn {
  background-color: #9a9d68;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
}

.cancel-btn:hover {
  background-color: #5b6239;
}

/* Responsive */
@media (max-width: 900px) {
  .profile-container {
    flex-direction: column;
  }

  .order-table {
    font-size: 14px;
  }
}
</style>
