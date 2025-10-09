<template>
  <div class="modify-admin">
    <!-- Oval Header -->
    <div class="featured-header">
      <div class="featured-oval">
        <h2>MODIFY</h2>
      </div>
    </div>

    <!-- Table Section -->
    <section class="modify-section">
      <div class="table-container">
        <table class="modify-table">
          <thead>
            <tr>
              <th>PRODUCT ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.id }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.quantity }}</td>
              <td>
                <img
                  src="@/assets/vectors/edit-icon.png"
                  alt="Edit"
                  class="icon edit-icon"
                  @click="editProduct(product.id)"
                />
              </td>
              <td>
                <img
                  src="@/assets/vectors/delete-icon.png"
                  alt="Delete"
                  class="icon delete-icon"
                  @click="deleteProduct(product.id)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ModifyAdmin',
  data() {
    return {
      products: [
        { id: 123, name: 'Red Tulips', price: '₱1800', quantity: 5 },
        { id: 124, name: 'Blue Hydrangea', price: '₱1800', quantity: 4 },
        { id: 125, name: 'Pink Carnations', price: '₱1800', quantity: 3 },
      ],
    }
  },
  methods: {
    editProduct(id) {
      console.log('Edit product:', id)
    },
    deleteProduct(id) {
      console.log('Delete product:', id)
    },
  },
}
</script>

<style scoped>
/* Page Layout */
.modify-admin {
  background-color: #a8b9c3;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Outfit', sans-serif;
}

/* Oval Header (same as Create page) */
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

/* Table Section */
.modify-section {
  width: 100%;
  background-color: #a8b9c3;
  display: flex;
  justify-content: center;
  padding: 4rem 0;
}

.table-container {
  color: #5b6239;
  width: 90%;
  max-width: 1100px;
  background-color: #f5f0ec;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

.modify-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  font-size: 18px;
  table-layout: fixed;
}

.modify-table th {
  height: 60px;
  background-color: #9a9d68;
  color: white;
  font-weight: 700;
  vertical-align: middle;
}

.modify-table td {
  height: 80px;
  vertical-align: middle;
}

.modify-table th,
.modify-table td {
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

/* 🛠️ Icons */
.icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.icon:hover {
  transform: scale(1.1);
  opacity: 0.8;
}

.modify-table th:nth-child(4),
.modify-table td:nth-child(4) {
  width: 150px;
}

.modify-table th:nth-child(5),
.modify-table td:nth-child(5),
.modify-table th:nth-child(6),
.modify-table td:nth-child(6) {
  width: 100px;
  padding: 0.5rem;
}

/* 📱 Responsive */
@media (max-width: 768px) {
  .featured-oval {
    width: 90%;
    height: 120px;
  }

  .table-container {
    width: 95%;
  }

  .modify-table th,
  .modify-table td {
    padding: 0.8rem;
    font-size: 14px;
  }
}
</style>
