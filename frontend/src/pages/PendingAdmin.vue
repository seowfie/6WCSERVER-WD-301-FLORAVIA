<template>
  <div class="pending-admin-page">
    <section class="featured-header">
      <div class="featured-oval">
        <h2>PENDING</h2>
      </div>
    </section>

    <section class="status-section">
      <div class="status-buttons">
        <button
          v-for="s in statuses"
          :key="s"
          class="status-btn"
          :class="{ active: selectedStatus === s }"
          @click="selectedStatus = s"
        >
          {{ s }}
        </button>
      </div>

      <table class="order-table">
        <thead>
          <tr>
            <th>ORDER ID</th>
            <th>CUSTOMER</th>
            <th>TOTAL</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="order in filteredOrders" :key="order._id">
            <td>{{ order._id }}</td>
            <td>{{ order.customer }}</td>
            <td>₱{{ order.totalPrice }}</td>
            <td>{{ order.status }}</td>
            <td>
              <select
                v-model="order.status"
                class="status-dropdown"
                @change="updateStatus(order)"
              >
                <option>PENDING</option>
                <option>TO SHIP</option>
                <option>TO RECEIVE</option>
                <option>COMPLETED</option>
                <option>CANCELLED</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const orders = ref([]);
const statuses = ["PENDING", "TO SHIP", "TO RECEIVE", "COMPLETED", "CANCELLED"];
const selectedStatus = ref("PENDING");

// ✅ Load all orders (joined with order_details, products, and info)
onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/orders/all");
    console.log("✅ Loaded raw orders:", res.data);

    orders.value = res.data.map((o) => ({
      _id: o._id,
      // 🩷 Use user_info (from info collection)
      customer: `${o.user_info?.firstname || "Unknown"} ${o.user_info?.lastname || ""}`.trim(),
      // 🌸 If you later want product name: o.product_info?.bouquet_name
      totalPrice: o.details?.total_price || 0,
      status: o.details?.status || "PENDING",
    }));
  } catch (err) {
    console.error("❌ Error loading orders:", err);
    alert("Failed to load orders. Please check backend connection.");
  }
});

// ✅ Filter by selected status
const filteredOrders = computed(() =>
  orders.value.filter(
    (o) => o.status.toUpperCase() === selectedStatus.value.toUpperCase()
  )
);

// ✅ Update order status in backend
async function updateStatus(order) {
  try {
    await axios.patch(`http://localhost:3000/api/orders/${order._id}/status`, {
      status: order.status,
    });
    alert(`✅ Order ${order._id} updated to ${order.status}`);
  } catch (err) {
    console.error("❌ Error updating status:", err);
    alert("Error updating order status.");
  }
}
</script>

<style scoped>
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

/* 💐 Status Buttons */
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

/* 🪻 Table */
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

/* 🌷 Dropdown */
.status-dropdown {
  text-align: center;
  width: 100%;
  background-color: #b8a0b8;
  color: white;
  border: none;
  padding: 10px 16px;
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  appearance: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-transform: uppercase;
}

.status-dropdown:hover {
  background-color: #9a9d68;
}

.status-dropdown option {
  background-color: #f5f0ec;
  color: #5b6239;
  font-family: 'Outfit', sans-serif;
  text-transform: uppercase;
}

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
