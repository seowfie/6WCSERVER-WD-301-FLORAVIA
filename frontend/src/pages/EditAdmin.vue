<template>
  <div class="edit-admin">
    <!-- 🌸 Oval Header -->
    <div class="featured-header">
      <div class="featured-oval">
        <h2>EDIT PRODUCT</h2>
      </div>
    </div>

    <!-- 🪴 Form Section -->
    <section class="edit-section" v-if="product">
      <form class="edit-form" @submit.prevent="updateProduct">
        <div class="form-group">
          <label for="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            v-model="product.name"
            placeholder="Enter product name"
          />
        </div>

        <div class="form-group">
          <label for="description">Description:</label>
          <textarea
            id="description"
            v-model="product.description"
            placeholder="Enter description"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="productImage">Product Image:</label>
          <label for="productImage" class="upload-box">
            <input type="file" id="productImage" accept="image/*" @change="handleFileUpload" />
            <p>{{ uploadedFileName || product.image || 'Upload your image here' }}</p>
          </label>
        </div>

        <div class="form-group">
          <label for="category">Category:</label>
          <select id="category" v-model="product.category">
            <option disabled value="">Select category</option>
            <option value="Romance">Romance</option>
            <option value="Birthday">Birthday</option>
            <option value="Congratulation">Congratulation</option>
            <option value="Sympathy">Sympathy</option>
          </select>
        </div>

        <div class="form-group">
          <label for="price">Price:</label>
          <input type="number" id="price" v-model.number="product.price" min="0" />
        </div>

        <div class="form-group">
          <label for="quantity">Quantity:</label>
          <input type="number" id="quantity" v-model.number="product.quantity" min="0" />
        </div>

        <div class="button-group">
          <button type="submit" class="save-btn">💾 SAVE CHANGES</button>
          <button type="button" class="back-btn" @click="goBack">⬅ BACK</button>
        </div>
      </form>
    </section>

    <div v-else class="loading">
      <p>Loading product details...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditAdmin",
  data() {
    return {
      product: null,
      uploadedFileName: "",
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    try {
      const res = await axios.get(`http://localhost:3000/api/products/${id}`);
      const data = res.data;

      // 🌿 Normalize field names and ensure proper case
      this.product = {
        _id: data._id,
        name: data.name || data.bouquet_name || "Untitled Product",
        description: data.description || "",
        image: data.image || data.product_image || "",
        category:
          data.category?.charAt(0).toUpperCase() + data.category?.slice(1) ||
          data.bouquet_category ||
          "Romance",
        price: data.price || 0,
        quantity: data.quantity || 0,
      };

      this.uploadedFileName = this.product.image;
    } catch (err) {
      console.error("❌ Failed to load product:", err);
      alert("Error loading product details.");
    }
  },

  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.uploadedFileName = file ? file.name : "";
    },

    async updateProduct() {
      try {
        const updatedProduct = {
          ...this.product,
          image: this.uploadedFileName || this.product.image,
        };

        await axios.put(
          `http://localhost:3000/api/products/${this.product._id}`,
          updatedProduct
        );

        alert("✅ Product updated successfully!");
        this.goBack();

        // 🔁 Trigger GardenPage refresh
        setTimeout(() => {
          localStorage.setItem("productUpdated", "true");
        }, 300);
      } catch (err) {
        console.error("❌ Error updating product:", err);
        alert("Failed to update product.");
      }
    },

    goBack() {
      this.$router.push({ name: "ModifyAdmin" });
    },
  },
};
</script>


<style scoped>
.edit-admin {
  background-color: #a8b9c3;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Outfit", sans-serif;
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
  font-family: "Caprasimo", sans-serif;
  font-size: 42px;
}

/* Form */
.edit-section {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 4rem 0;
  background-color: #a8b9c3;
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
  font-family: "Outfit", sans-serif;
  font-size: 15px;
}

/* Upload Box */
.upload-box {
  border: 2px dashed #9a9d68;
  border-radius: 8px;
  background-color: #fff;
  padding: 2rem;
  text-align: center;
  color: #9a9d68;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-box:hover {
  background-color: #f8d2bb;
  color: #ffffff;
}

.upload-box input[type="file"] {
  display: none;
}

.upload-box p {
  margin: 0;
  font-size: 15px;
  font-style: italic;
  word-break: break-all;
}

/* Buttons */
.button-group {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.save-btn {
  flex: 1;
  background-color: #9a9d68;
  color: #f5f0ec;
  border: none;
  padding: 0.8rem 0;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  border-radius: 30px;
  transition: all 0.3s ease;
}

.save-btn:hover {
  background-color: #b8a0b8;
  transform: scale(1.05);
}

.back-btn {
  flex: 1;
  background-color: #f8d2bb;
  color: #5b6239;
  font-family: "Outfit", sans-serif;
  font-weight: 700;
  font-size: 18px;
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
</style>
