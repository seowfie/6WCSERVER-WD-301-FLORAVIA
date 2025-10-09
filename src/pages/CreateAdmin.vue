<template>
  <div class="create-admin">
    <!-- 🌸 Oval Header -->
    <div class="featured-header">
      <div class="featured-oval">
        <h2>CREATE</h2>
      </div>
    </div>

    <!-- 🪴 Form Section -->
    <section class="create-section">
      <form class="create-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            placeholder="Enter product name"
            v-model="productName"
          />
        </div>

        <div class="form-group">
          <label for="description">Description:</label>
          <textarea
            id="description"
            placeholder="Enter description"
            v-model="description"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="productImage">Product Image:</label>
          <label for="productImage" class="upload-box">
            <input type="file" id="productImage" accept="image/*" @change="handleFileUpload" />
            <p>{{ uploadedFileName || 'Upload your image here' }}</p>
          </label>
        </div>

        <div class="form-group">
          <label for="category">Category:</label>
          <select id="category" v-model="category">
            <option value="" disabled selected>Select category</option>
            <option value="birthday">Birthday</option>
            <option value="romance">Romance</option>
            <option value="congratulation">Congratulation</option>
            <option value="sympathy">Sympathy</option>
          </select>
        </div>

        <div class="form-group">
          <label for="price">Price:</label>
          <input type="number" id="price" placeholder="Enter price" v-model="price" min="0" />
        </div>

        <div class="form-group">
          <label for="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            placeholder="Enter quantity"
            v-model.number="quantity"
            min="0"
            @input="preventNegative"
          />
        </div>

        <button type="submit" class="add-btn">ADD</button>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'CreateAdmin',
  data() {
    return {
      productName: '',
      description: '',
      uploadedFileName: '',
      category: '',
      price: '',
      quantity: 0,
    }
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0]
      this.uploadedFileName = file ? file.name : ''
    },
    preventNegative() {
      if (this.quantity < 0) this.quantity = 0
    },
    handleSubmit() {
      console.log('Form submitted:', {
        productName: this.productName,
        description: this.description,
        uploadedFileName: this.uploadedFileName,
        category: this.category,
        price: this.price,
        quantity: this.quantity,
      })
      alert('✅ Product created successfully!')
    },
  },
}
</script>

<style scoped>
/* 🌼 Page Layout */
.create-admin {
  background-color: #a8b9c3;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Outfit', sans-serif;
}

/* 🌸 Oval Header */
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

/* 🪴 Form Section */
.create-section {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 4rem 0;
  background-color: #a8b9c3;
}

.create-form {
  background-color: #f5f0ec;
  border: 2px solid #e2e2e2;
  width: 600px;
  padding: 3rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 🌷 Form Group (aligned layout) */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.create-form label {
  font-weight: 600;
  color: #9a9d68;
  font-size: 16px;
}

/* 📦 Input Alignment */
.create-form input,
.create-form textarea,
.create-form select {
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #9a9d68;
  border-radius: 6px;
  background-color: #fff;
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  box-sizing: border-box;
}

.create-form textarea {
  min-height: 120px;
  resize: none;
}

/* 📸 Upload Box */
.upload-box {
  border: 2px dashed #9a9d68;
  border-radius: 8px;
  background-color: #fff;
  padding: 2rem;
  text-align: center;
  color: #9a9d68;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  position: relative;
}

.upload-box:hover {
  background-color: #f8d2bb;
  color: #ffffff;
}

.upload-box input[type='file'] {
  display: none;
}

.upload-box p {
  margin: 0;
  font-size: 15px;
  font-style: italic;
  word-break: break-all;
}

/* 🌿 Add Button */
.add-btn {
  font-family: 'Outfit', sans-serif;
  margin-top: 1rem;
  background-color: #9a9d68;
  color: #f5f0ec;
  border: none;
  padding: 0.8rem 0;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-btn:hover {
  background-color: #b8a0b8;
  transform: scale(1.05);
}

/* 📱 Responsive */
@media (max-width: 768px) {
  .featured-oval {
    width: 90%;
    height: 120px;
  }

  .create-form {
    width: 90%;
    padding: 2rem;
  }
}
</style>
