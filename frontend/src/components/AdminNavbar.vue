<template>
  <nav class="navbar">
    <!-- Left side -->
    <div class="nav-left">
      <router-link to="/admin/home">HOME</router-link>
      <router-link to="/admin/pending">PENDING</router-link>
    </div>

    <!-- Center logo -->
    <div class="logo">
      <router-link to="/admin/home">
        <img src="@/assets/floravia_logo.png" alt="Floravia logo" />
      </router-link>
    </div>

    <!-- Right side -->
    <div class="nav-right">
      <router-link to="/admin/create">CREATE</router-link>
      <router-link to="/admin/modify">MODIFY</router-link>
      <button class="logout-btn" @click="logout">LOGOUT</button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function logout() {
  localStorage.removeItem('user')
  alert('👋 You have logged out.')
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  background-color: #9a9d68;
  color: white;
  display: grid;
  grid-template-columns: 1fr auto 1fr; /* ✅ Perfect symmetry */
  align-items: center;
  font-size: 22px;
  font-weight: 700;
  font-family: 'Outfit', sans-serif;
  width: 100%;
  height: 100px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  padding: 0 3rem;
  box-sizing: border-box;
}

/* Left and right areas spaced evenly */
.nav-left,
.nav-right {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem; /* ✅ Balanced spacing both sides */
}

/* Nav links */
.nav-left a,
.nav-right a {
  text-decoration: none;
  color: white;
  transition:
    color 0.3s ease,
    transform 0.3s ease;
}

.nav-left a:hover,
.nav-right a:hover,
.logout-btn:hover {
  color: #f8d2bb;
  transform: translateY(-5px);
}

/* Center logo */
.logo {
  display: flex;
  justify-content: center;
}

.logo img {
  height: 90px;
  width: auto;
  display: block;
}

/* Logout button */
.logout-btn {
  background: none;
  border: 2px solid white;
  border-radius: 30px;
  padding: 0.4rem 1.4rem;
  color: white;
  font-weight: 700;
  font-size: 20px;
  cursor: pointer;
  font-family: 'Outfit', sans-serif;
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    transform 0.3s ease;
}

.logout-btn:hover {
  background-color: #f8d2bb;
  color: #9a9d68;
  transform: scale(1.05);
}

/* Responsive */
@media (max-width: 900px) {
  .navbar {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    gap: 1rem;
    height: auto;
    padding: 1rem;
  }

  .nav-left,
  .nav-right {
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .logo img {
    height: 80px;
  }
}
</style>
