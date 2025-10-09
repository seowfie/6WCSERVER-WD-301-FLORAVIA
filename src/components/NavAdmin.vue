<template>
  <nav class="navbar">
    <!-- Left side -->
    <div class="nav-left">
      <router-link to="/admin/dashboard">HOME</router-link>
      <router-link to="/admin/pending">PENDING</router-link>
    </div>

    <!-- Center logo -->
    <div class="logo">
      <router-link to="/admin/dashboard">
        <img src="@/assets/floravia_logo.png" alt="Floravia logo" />
      </router-link>
    </div>

    <!-- Right side -->
    <div class="nav-right">
      <router-link to="/admin/create">CREATE</router-link>
      <router-link to="/admin/edit">MODIFY</router-link>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #9a9d68;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center; /* center everything */
  gap: 10rem; /* controls spacing between left, logo, right */
  font-size: 22px;
  font-weight: 700;
  font-family: 'Outfit', sans-serif;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  padding: 0 2rem;
}

/* Groups on both sides */
.nav-left,
.nav-right {
  display: flex;
  align-items: center;
  gap: 10rem; /* spacing between individual links */
}

/* Style all links */
/* Style all nav links except the logo one */
.nav-left a,
.nav-right a {
  text-decoration: none;
  color: white;
  transition:
    color 0.3s ease,
    transform 0.3s ease;
  display: inline-block;
}

/* Hover lift only for text links */
.nav-left a:hover,
.nav-right a:hover {
  color: #f8d2bb;
  transform: translateY(-5px);
}

/* Logo centered and static */
.logo a {
  text-decoration: none;
  color: inherit;
  transform: none;
  transition: none; /* prevents lift/color change */
}

.logo img {
  height: 90px;
  width: auto;
  display: block;
}

/* Responsive layout */
@media (max-width: 900px) {
  .navbar {
    flex-direction: column;
    gap: 1rem;
    height: auto;
    padding: 1rem;
  }

  .logo img {
    height: 80px;
  }

  .nav-left,
  .nav-right {
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
}
</style>
