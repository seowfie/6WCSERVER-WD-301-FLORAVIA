<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-logo">
        <router-link to="/admin/home">
          <img src="@/assets/floravia_logo.png" alt="Floravia logo" />
        </router-link>
      </div>

      <div class="footer-links">
        <h4>ADMIN LINKS</h4>
        <router-link to="/admin/home">Home</router-link>
        <router-link to="/admin/pending">Pending</router-link>
        <router-link to="/admin/create">Create</router-link>
        <router-link to="/admin/modify">Modify</router-link>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #9a9d68;
  color: #f9efe6;
  padding: 2rem 3rem;
  font-family: 'Outfit', sans-serif;
  font-size: 17px;
  font-weight: 600;
}
.footer-links a {
  display: block;
  color: #f9efe6;
  text-decoration: none;
  margin: 0.5rem 0;
  transition: color 0.3s ease;
}
.footer-links a:hover {
  color: #f8d2bb;
}
.footer-logo img {
  width: 180px;
  height: auto;
  margin-bottom: 1rem;
}
</style>
