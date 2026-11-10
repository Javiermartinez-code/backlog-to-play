<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <!-- RouterLink: <a>, pero navega sin recargar la página -->
      <RouterLink :to="{ name: 'home' }">Inicio</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>
