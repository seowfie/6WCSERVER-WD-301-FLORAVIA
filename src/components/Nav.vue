<template>
  <nav class="navbar">
    <div class="nav-left">
      <a href="#home">HOME</a>
      <a href="#garden">GARDEN</a>
    </div>

    <div class="logo">
    <a href="#Home">
        <img src="@/assets/floravia_logo.png" alt="Floravia logo" />
    </a>
    </div>


    <div class="nav-right">
      <a href="#support">SUPPORT</a>
      <a href="#basket">
        <img src="@/assets/basket.png" alt="Basket" />
      </a>
      <a href="#profile">
        <img src="@/assets/profile.png" alt="Profile" />
      </a>
    </div>
  </nav>
</template>

<style>
.navbar {
  background-color: #B8A0B8;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;
  font-size: 22px;
  font-weight: 700;
  font-family: "Outfit", sans-serif;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
}

/* Wide spacing for HOME and GARDEN only */
.nav-left a {
  text-decoration: none;
  color: white;
  margin: 0 5rem;
  transition: color 0.3s ease, transform 0.3s ease;
  display: inline-block; /* Needed for transform to work properly */
}

/* Slightly smaller spacing for SUPPORT (since icons follow) */
.nav-right a[href="#support"] {
  text-decoration: none;
  color: white;
  margin-right: 8rem;
  transition: opacity 0.2s ease;
  transition: color 0.3s ease, transform 0.3s ease;
  display: inline-block; /* Needed for transform to work properly */
}

/* Tight spacing for basket & profile icons */
.nav-right a[href="#basket"],
.nav-right a[href="#profile"] {
  margin: 0 0.5rem;
}

/* Shared hover effect */
.navbar a:hover {
  color: #F8D2BB;
  transform: translateY(-5px);

}


.nav-left a:hover,
.nav-right a:hover {
  opacity: 0.8;
}

/* Logo sizing */
.logo img {
  height: 100px;
  width: auto;
  display: block;
  margin-left: -1em;
}

.nav-right a[href="#basket"] img {
  width: 55px;
  height: 53px;
  margin-left: -4rem;
  margin-right: 4em;
}

.nav-right a[href="#profile"] img {
  width: 77px;
  height: 77px;
}

.nav-right img {
  vertical-align: middle;
  transform: translateY(3px);
}



/* Optional: keep navbar fixed at top */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

/* Add spacing for page content below fixed navbar */
body {
  padding-top: 120px;
}

/* Responsive tweak */
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
