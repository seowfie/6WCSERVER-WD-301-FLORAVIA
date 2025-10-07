<template>
  <div class="login-wrapper">
    <div class="login-container">
      <!-- Left Image Section -->
      <div class="left-side">
        <img :src="loginImage" alt="Login side decoration" />
      </div>

      <!-- Right Login Form -->
      <div class="right-side">
        <div class="form-box">
          <h2>Log In</h2>

          <form @submit.prevent>
            <label for="email">Email:</label>
            <input type="email" id="email" placeholder="Enter your email" required />

            <label for="password">Password:</label>
            <input type="password" id="password" placeholder="Enter your password" required />

            <button type="submit">LOG IN</button>
          </form>

          <p class="signup-link">
            Don’t have an account? <router-link to="/signup">Sign up</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import loginImage from '@/assets/loginimg.png'
</script>

<style scoped>
/* Background + centering */
.login-wrapper {
  background-image: url('@/assets/logsignbg.png');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  padding: 30px 20px;
  box-sizing: border-box;
}

/* Moderate size */
.login-container {
  display: flex;
  background-color: #a8b9c3;
  border-radius: 8px;
  overflow: hidden;
  max-width: 800px;
  width: 100%;
  height: 450px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

/* Left image section */
.left-side {
  flex: 1;
  background-color: #a8b9c3;
  display: flex;
  align-items: center;
  justify-content: center;
}

.left-side img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 10px;
}

/* Right form */
.right-side {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 35px;
  background-color: #f5f0ec;
}

.form-box {
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
}

h2 {
  font-family: 'Caprasimo', cursive;
  font-size: 2.3rem;
  color: #5b6239;
  margin-bottom: 28px;
  text-align: left;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  color: #5b6239;
  margin-bottom: 6px;
}

input {
  font-family: 'Outfit', sans-serif;
  padding: 10px;
  font-size: 1rem;
  margin-bottom: 18px;
  border: 1px solid #aaa;
  border-radius: 4px;
  background-color: white;
}

button {
  font-family: 'Outfit', sans-serif;
  background-color: #9a9d68;
  color: white;
  font-weight: bold;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #5b6239;
}

.signup-link {
  margin-top: 18px;
  font-size: 0.9rem;
  font-family: 'Outfit', sans-serif;
  color: #5b6239;
  text-align: left;
}

.signup-link a {
  color: #5b6239;
  font-weight: 600;
  text-decoration: underline;
}
</style>
