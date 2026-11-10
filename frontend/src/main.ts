import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// app.use() registra un plugin en toda la aplicación.
// Pinia va antes que el router: en tareas futuras los guards del router
// (p. ej., "¿hay sesión iniciada?") consultarán stores de Pinia.
app.use(createPinia())
app.use(router)

app.mount('#app')
