// Tabla de rutas
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  // createWebHistory: limpieza de urls (/backlog) en lugar de /#/backlog.
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home', // nombre para navegar sin poner la url
      component: HomeView,
    },
  ],
})

export default router
