<template>
  <div class="admin-dashboard">
    <h1>Welcome to the Admin Dashboard</h1>
    <p>
      This is the main admin page. You can manage content, view pending requests, and access system
      settings here.
    </p>

    <div class="admin-sections">
      <div class="section-card">
        <h2>Pending</h2>
        <p>Review pending user submissions and approvals.</p>
      </div>

      <div class="section-card">
        <h2>Create</h2>
        <p>Add new items, categories, or announcements.</p>
      </div>

      <div class="section-card">
        <h2>Modify</h2>
        <p>Edit or remove existing content from the system.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-dashboard {
  padding: 3rem;
  text-align: center;
  font-family: 'Outfit', sans-serif;
  color: #5b6239;
  background-color: #fdf7f4;
  min-height: 80vh;
}

.admin-dashboard h1 {
  font-size: 2.5rem;
  color: #9a9d68;
  margin-bottom: 1rem;
}

.admin-dashboard p {
  font-size: 1.1rem;
  color: #6c6c6c;
  margin-bottom: 3rem;
}

/* Dashboard Cards */
.admin-sections {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.section-card {
  background-color: white;
  border: 2px solid #9a9d68;
  border-radius: 16px;
  padding: 2rem;
  width: 280px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.section-card:hover {
  transform: translateY(-5px);
}

.section-card h2 {
  color: #9a9d68;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}
</style>
