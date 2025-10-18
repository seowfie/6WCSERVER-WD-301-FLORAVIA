import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia()) // ✅ must come before router
app.use(router)

app.mount('#app')
