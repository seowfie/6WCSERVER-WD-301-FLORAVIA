<template>
  <div class="dashboard-container">
    <!-- Left Section -->
    <div class="dashboard-left">
      <img src="@/assets/admin-hero.png" alt="Admin Hero" class="hero-image" />
      <div class="welcome-text">
        <h1>Welcome<br />Admin</h1>
        <p>What do you want to do today?</p>
      </div>
    </div>

    <!-- Right Section -->
    <div class="dashboard-right">
      <router-link to="/admin/pending" class="action-btn">PENDING</router-link>
      <router-link to="/admin/create" class="action-btn">CREATE</router-link>
      <router-link to="/admin/modify" class="action-btn">MODIFY</router-link>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  display: flex;
  justify-content: center;
  align-items: stretch;
  height: calc(100vh - 100px); /* account for navbar height */
  background-color: #f7e9ec;
}

/* LEFT SECTION */
.dashboard-left {
  position: relative;
  flex: 1;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(2px) brightness(1);
}

.welcome-text {
  position: absolute;
  top: 50%;
  left: 15%;
  transform: translateY(-50%);
  color: white;
  font-family: 'Outfit', sans-serif;
}

.welcome-text h1 {
  font-size: 6rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.welcome-text p {
  font-size: 2rem;
  font-weight: 400;
}

/* RIGHT SECTION */
.dashboard-right {
  flex: 1;
  background-color: #f8d2bb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
}

.action-btn {
  background-color: #b8a0b8;
  color: white;
  text-decoration: none;
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: 3rem;
  width: 400px;
  text-align: center;
  padding: 1.5rem 0;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background-color: #9a9d68;
  transform: scale(1.05);
}

/* Responsive */
@media (max-width: 900px) {
  .dashboard-container {
    flex-direction: column;
  }

  .dashboard-left,
  .dashboard-right {
    flex: none;
    width: 100%;
    height: 50vh;
  }

  .welcome-text {
    left: 10%;
    text-align: left;
  }

  .welcome-text h1 {
    font-size: 2.5rem;
  }

  .welcome-text p {
    font-size: 1.2rem;
  }
}
</style>
