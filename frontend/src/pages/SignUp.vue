<template>
  <div class="signup-wrapper">
    <div class="signup-container">
      <div class="left-side">
        <div class="form-box">
          <h2>Sign Up</h2>

          <form @submit.prevent="handleSignup">
            <label>Username:</label>
            <input v-model="username" type="text" required />

            <div class="name-row">
              <div class="name-field">
                <label>First Name:</label>
                <input v-model="firstname" type="text" required />
              </div>
              <div class="name-field">
                <label>Last Name:</label>
                <input v-model="lastname" type="text" required />
              </div>
            </div>

            <label>Email:</label>
            <input v-model="email" type="email" required />

            <label>Phone:</label>
            <input v-model="phone" type="text" required />

            <label>Password:</label>
            <input v-model="password" type="password" required />

            <button type="submit">SIGN UP</button>
          </form>

          <p class="login-link">
            Already have an account?
            <router-link to="/login">Log in</router-link>
          </p>
        </div>
      </div>

      <div class="right-side">
        <img :src="signupImage" alt="Signup image" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import signupImage from "@/assets/signupimg.png";

const router = useRouter();

const username = ref("");
const firstname = ref("");
const lastname = ref("");
const email = ref("");
const phone = ref("");
const password = ref("");

const handleSignup = async () => {
  try {
    const res = await axios.post("http://localhost:3000/api/users/register", {
      username: username.value,
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
    });

    alert("Registration successful! Please log in.");
    console.log(res.data);
    router.push("/login");
  } catch (err) {
    console.error("Signup error:", err);
    alert(err.response?.data?.message || "Signup failed.");
  }
};
</script>


<style scoped>
/* Background */
.signup-wrapper {
  background-image: url('@/assets/logsignbg.png');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
  padding: 30px 15px;
  box-sizing: border-box;
}

/* Main Container */
.signup-container {
  display: flex;
  flex-direction: row;
  background-color: #a8b9c3;
  border-radius: 10px;
  overflow: hidden;
  max-width: 850px;
  width: 100%;
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.12);
}

/* Left Side */
.left-side {
  flex: 1;
  background-color: #f5f0ec;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 35px;
  box-sizing: border-box;
}

.form-box {
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
}

/* Heading */
h2 {
  font-family: 'Caprasimo', cursive;
  font-size: 2.1rem;
  color: #5b6239;
  margin-bottom: 22px;
}

/* Form */
form {
  display: flex;
  flex-direction: column;
}

label {
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  color: #5b6239;
  margin-bottom: 5px;
  font-size: 1rem;
}

input {
  font-family: 'Outfit', sans-serif;
  padding: 10px;
  font-size: 1rem;
  margin-bottom: 16px;
  border: 1px solid #aaa;
  border-radius: 6px;
  background-color: white;
  width: 100%;
  box-sizing: border-box;
}

/* 👥 Name Fields */
.name-row {
  display: flex;
  gap: 10px;
  width: 100%;
}

.name-field {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Button */
button {
  font-family: 'Outfit', sans-serif;
  background-color: #9a9d68;
  color: #fff;
  font-weight: bold;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  margin-top: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #5b6239;
}

/* Right Side */
.right-side {
  flex: 1;
  background-color: #9a9d68;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

.right-side img {
  width: 100%;
  height: auto;
  object-fit: contain; /* prevents cropping */
  max-height: 100%;
}

/* Login Text */
.login-link {
  margin-top: 12px;
  font-size: 0.9rem;
  font-family: 'Outfit', sans-serif;
  color: #9a9d68;
}

.login-link a {
  color: #73858f;
  font-weight: 600;
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 900px) {
  .signup-container {
    flex-direction: column;
    max-width: 90%;
  }

  .left-side {
    padding: 30px 25px;
  }

  .right-side {
    width: 100%;
    padding: 20px;
  }

  .right-side img {
    max-height: 300px;
  }

  h2 {
    text-align: center;
  }
}
</style>
