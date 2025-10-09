<template>
  <nav class="navbar">
    <div class="nav-left">
      <router-link to="/">HOME</router-link>
      <router-link to="/pending">PENDING</router-link>
      <router-link to="/create">CREATE</router-link>
      <router-link to="/modify">MODIFY</router-link>
    </div>

    <div class="logo">
      <router-link to="/">
        <img src="@/assets/floravia_logo.png" alt="Floravia logo" />
      </router-link>
    </div>

    <div class="nav-right">
      <router-link to="/profile">
        <img src="@/assets/profile.png" alt="Profile" />
      </router-link>
    </div>
  </nav>
</template>

<style>
.navbar {
  background-color: #9a9d68;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;
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
}

/* Nav links */
.nav-left a {
  text-decoration: none;
  color: white;
  margin: 0 3rem;
  transition:
    color 0.3s ease,
    transform 0.3s ease;
  display: inline-block;
}

.nav-left a:hover {
  color: #f8d2bb;
  transform: translateY(-5px);
}

/* Logo */
.logo img {
  height: 100px;
  width: auto;
  display: block;
}

/* Profile icon */
.nav-right a[href='/profile'] img {
  width: 70px;
  height: 70px;
}

.nav-right img {
  vertical-align: middle;
  transform: translateY(3px);
}

/* Add spacing for page content below fixed navbar */
body {
  padding-top: 120px;
}

/* Responsive layout */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    height: auto;
    padding: 1rem;
  }

  .logo img {
    height: 90px;
    margin: 1rem 0;
  }

  .nav-left,
  .nav-right {
    display: flex;
    gap: 1rem;
  }
}
</style>
