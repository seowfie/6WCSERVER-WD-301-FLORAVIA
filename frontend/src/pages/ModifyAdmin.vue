<template>
  <div class="modify-admin">
    <!-- 🌼 Oval Header -->
    <div class="featured-header">
      <div class="featured-oval">
        <h2 v-if="!isEditing">MODIFY</h2>
        <h2 v-else>EDIT PRODUCT</h2>
      </div>
    </div>

    <!-- 📋 Product Table -->
    <section v-if="!isEditing" class="modify-section">
      <div class="table-container">
        <table class="modify-table">
          <thead>
            <tr>
              <th>PRODUCT ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="product in products" :key="product._id">
              <td>{{ product._id }}</td>
              <td>{{ product.bouquet_name || product.name }}</td>
              <td>₱{{ product.price }}</td>
              <td>{{ product.quantity }}</td>
              <td>
                <!-- 🖋 FIXED ICON DISPLAY -->
                <img
                  src="@/assets/vectors/edit-icon.png"
                  alt="Edit"
                  class="icon edit-icon"
                  @click="$router.push(`/editadmin/${product._id}`)"
                />

              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ✏️ Edit Form -->
    <section v-else class="edit-section">
      <form class="edit-form" @submit.prevent="updateProduct">
        <div class="form-group">
          <label>Product Name:</label>
          <input type="text" v-model="selectedProduct.name" required />
        </div>

        <div class="form-group">
          <label>Description:</label>
          <textarea v-model="selectedProduct.description"></textarea>
        </div>

        <div class="form-group">
          <label>Category:</label>
          <select v-model="selectedProduct.category">
            <option value="birthday">Birthday</option>
            <option value="romance">Romance</option>
            <option value="congratulation">Congratulation</option>
            <option value="sympathy">Sympathy</option>
          </select>
        </div>

        <div class="form-group">
          <label>Price:</label>
          <input type="number" v-model.number="selectedProduct.price" min="0" required />
        </div>

        <div class="form-group">
          <label>Quantity:</label>
          <input type="number" v-model.number="selectedProduct.quantity" min="0" required />
        </div>

        <div class="button-group">
          <button type="submit" class="save-btn">SAVE CHANGES</button>
          <button type="button" class="back-btn" @click="cancelEdit">⬅ BACK</button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import editIcon from "@/assets/vectors/edit-icon.png"; // ✅ imported correctly

export default {
  name: "ModifyAdmin",
  data() {
    return {
      products: [],
      isEditing: false,
      selectedProduct: null,
      editIcon, // ✅ makes it usable inside template
    };
  },
  async mounted() {
    await this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const res = await axios.get("http://localhost:3000/api/products");
        this.products = res.data;
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        alert("Failed to load products.");
      }
    },

    startEdit(product) {
      this.isEditing = true;
      this.selectedProduct = {
        ...product,
        name: product.name || product.bouquet_name || "",  // ✅ fallback
        category: product.category || "",                  // ✅ ensure category shows
      };
    },

    async updateProduct() {
      try {
        await axios.put(
          `http://localhost:3000/api/products/${this.selectedProduct._id}`,
          this.selectedProduct
        );
        alert("✅ Product updated successfully!");
        this.isEditing = false;
        await this.fetchProducts(); // refresh both admin & customer
      } catch (err) {
        console.error("❌ Error updating product:", err);
        alert("Failed to update product.");
      }
    },

    cancelEdit() {
      this.isEditing = false;
      this.selectedProduct = null;
    },
  },
};
</script>

<style scoped>
.modify-admin {
  background-color: #a8b9c3;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Outfit', sans-serif;
}

/* 🌸 Header */
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

/* 🌼 Table Section */
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
  border-radius: 4px;
  overflow-x: hidden;
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
  text-transform: uppercase;
}

.modify-table td {
  height: 80px;
  vertical-align: middle;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #ddd;
}

.modify-table th:nth-child(1),
.modify-table td:nth-child(1) {
  width: 340px;
  word-break: break-all;
}

.modify-table th:nth-child(2),
.modify-table td:nth-child(2) {
  width: 260px;
}

.modify-table th:nth-child(3),
.modify-table td:nth-child(3) {
  width: 150px;
}

.modify-table th:nth-child(4),
.modify-table td:nth-child(4) {
  width: 120px;
}

.modify-table th:nth-child(5),
.modify-table td:nth-child(5) {
  width: 80px;
  text-align: center;
}

/* 🩷 Row Styling */
.modify-table tbody tr:nth-child(odd) {
  background-color: #fdf8f4;
}
.modify-table tbody tr:nth-child(even) {
  background-color: #ffffff;
}
.modify-table tbody tr:hover {
  background-color: #f8e6d7;
  transition: background-color 0.3s ease;
}

/* ✏️ Edit Icon */
.icon {
  width: 26px;
  height: 26px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.icon:hover {
  transform: scale(1.15);
  opacity: 0.9;
}

/* ✏️ Edit Form */
.edit-section {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 4rem 0;
}

.edit-form {
  background-color: #f5f0ec;
  border: 2px solid #e2e2e2;
  width: 600px;
  padding: 3rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.edit-form label {
  font-weight: 600;
  color: #9a9d68;
  font-size: 16px;
}

.edit-form input,
.edit-form textarea,
.edit-form select {
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #9a9d68;
  border-radius: 6px;
  background-color: #fff;
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
}

.edit-form textarea {
  min-height: 100px;
  resize: none;
}

/* 💾 Buttons */
.button-group {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.save-btn {
  flex: 1;
  background-color: #9a9d68;
  color: white;
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: 16px;
  padding: 0.8rem 0;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.save-btn:hover {
  background-color: #b8a0b8;
  transform: scale(1.05);
}

/* Back Button */
.back-btn {
  flex: 1;
  background-color: #f8d2bb;
  color: #5b6239;
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: 16px;
  padding: 0.8rem 0;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background-color: #9a9d68;
  color: #fff;
  transform: scale(1.05);
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

  .edit-form {
    width: 90%;
    padding: 2rem;
  }
}
</style>
