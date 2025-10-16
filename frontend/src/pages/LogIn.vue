<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="left-side">
        <img :src="loginImage" alt="Login image" />
      </div>

      <div class="right-side">
        <div class="form-box">
          <h2>Log In</h2>

          <form @submit.prevent="handleLogin">
            <label>Email:</label>
            <input v-model="email" type="email" required />

            <label>Password:</label>
            <input v-model="password" type="password" required />

            <button type="submit">LOG IN</button>
          </form>

          <p class="signup-link">
            Don’t have an account?
            <router-link to="/signup">Sign up</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import loginImage from "@/assets/loginimg.png";

const router = useRouter();
const email = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    // 🔹 Call your backend (user collection = "info")
    const res = await axios.post("http://localhost:3000/api/users/login", {
      email: email.value,
      password: password.value,
    });

    let user = res.data.user;
    const token = res.data.token;

    // ✅ Guarantee we have a valid MongoDB ID (_id)
    if (!user._id && user.id) {
      user._id = user.id;
    }

    // ✅ Save both user and token in localStorage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    alert(`Welcome back, ${user.username || user.firstname || "User"}!`);

    // ✅ Redirect based on role
    if (user.role === "admin") {
      router.push("/admin/home");
    } else {
      router.push("/profile");
    }
  } catch (err) {
    console.error("❌ Login error:", err);
    alert(err.response?.data?.message || "Login failed. Please check your credentials.");
  }
};
</script>

<style scoped>
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
  color: #73858f;
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
  color: #a8b9c3;
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
  background-color: #a8b9c3;
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
  background-color: #6c808c;
}

.signup-link {
  margin-top: 18px;
  font-size: 0.9rem;
  font-family: 'Outfit', sans-serif;
  color: #6c808c;
  text-align: left;
}

.signup-link a {
  color: #5b6239;
  font-weight: 600;
  text-decoration: underline;
}
</style>
