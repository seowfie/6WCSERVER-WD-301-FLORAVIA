<template>
  <div class="pending-admin-page">
    <!-- 🌿 Featured Oval Header -->
    <section class="featured-header">
      <div class="featured-oval">
        <h2>PENDING</h2>
      </div>
    </section>

    <!-- 💐 Order Status Buttons -->
    <section class="status-section">
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

      <!-- 🌸 Orders Table -->
      <table class="order-table">
        <thead>
          <tr>
            <th>PRODUCT</th>
            <th>ORDER ID</th>
            <th>CUSTOMER</th>
            <th>TOTAL</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in filteredOrders" :key="order.id">
            <td>{{ order.product }}</td>
            <td>{{ order.id }}</td>
            <td>{{ order.customer }}</td>
            <td>{{ order.total }}</td>
            <td>{{ order.status }}</td>
            <td>
              <div class="dropdown-wrapper">
                <select v-model="order.status" class="status-dropdown">
                  <option selected>PENDING</option>
                  <option>TO SHIP</option>
                  <option>TO RECEIVE</option>
                  <option>COMPLETED</option>
                  <option>CANCELLED</option>
                </select>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const statuses = ['PENDING', 'TO SHIP', 'TO RECEIVE', 'COMPLETED', 'CANCELLED']
const selectedStatus = ref('PENDING')

const orders = ref([
  {
    id: '1111111111',
    product: 'Boukey Aniv',
    customer: 'korlishell',
    total: '₱1300',
    status: 'Pending',
  },
  {
    id: '2222222222',
    product: 'Sweet Lily',
    customer: 'marie',
    total: '₱900',
    status: 'To Ship',
  },
  {
    id: '3333333333',
    product: 'Sunshine Mix',
    customer: 'hana',
    total: '₱1100',
    status: 'Completed',
  },
])

const filteredOrders = computed(() =>
  orders.value.filter((order) => order.status.toUpperCase() === selectedStatus.value),
)
</script>

<style scoped>
/* 🌿 Overall Layout */
.pending-admin-page {
  font-family: 'Outfit', sans-serif;
  background-color: #f5f0ec;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 🌼 Featured Oval Header */
.featured-header {
  background-color: #f8d2bb;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
  width: 100%;
}

.featured-oval {
  background-color: #ffffff;
  width: 80%;
  max-width: 1000px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid #9a9d68;
  display: flex;
  justify-content: center;
  align-items: center;
}

.featured-oval h2 {
  color: #9a9d68;
  font-family: 'Caprasimo', sans-serif;
  font-size: 42px;
  margin: 0;
}

/* 💐 Status Buttons Section */
.status-section {
  background-color: #f5f0ec;
  padding: 60px 20px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.status-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 40px;
}

.status-btn {
  background-color: #a8b9c3;
  color: white;
  border: none;
  padding: 16px 36px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Outfit', sans-serif;
  transition: background-color 0.3s;
}

.status-btn.active,
.status-btn:hover {
  background-color: #9a9d68;
}

/* 🪻 Table Styles */
.order-table {
  width: 100%;
  max-width: 1000px;
  border-collapse: collapse;
  text-align: center;
}

.order-table th {
  background-color: #9a9d68;
  color: white;
  font-weight: 700;
  padding: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.order-table td {
  background-color: white;
  color: #5b6239;
  padding: 16px;
  border-bottom: 1px solid #ddd;
}

/* 🪻 Dropdown container */
.dropdown-wrapper {
  position: relative;
  display: inline-block;
  width: 180px;
}

/* 🌷 Dropdown appearance */
.status-dropdown {
  text-align: center;
  width: 100%;
  background-color: #b8a0b8; /* purple */
  color: white;
  border: none;
  padding: 10px 16px;
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  appearance: none; /* hides native arrow */
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-transform: uppercase;
}

/* hover effect */
.status-dropdown:hover {
  background-color: #9a9d68; /* olive green */
}

/* 🩵 Dropdown arrow icon */
.dropdown-wrapper::after {
  content: '▼';
  font-size: 0.8rem;
  color: white;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

/* 🪶 Dropdown menu (options) */
.status-dropdown option {
  background-color: #f5f0ec; /* cream */
  color: #5b6239; /* dark olive */
  font-family: 'Outfit', sans-serif;
  text-transform: uppercase;
}

/* Responsive */
@media (max-width: 900px) {
  .order-table {
    font-size: 14px;
  }

  .status-dropdown {
    padding: 8px 14px;
  }

  .status-btn {
    padding: 12px 28px;
    font-size: 14px;
  }
}
</style>
