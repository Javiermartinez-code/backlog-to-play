# Backlog to Play · Frontend

Aplicación de una sola página (SPA) de Backlog to Play, construida con **Vue 3** y **TypeScript**.

## Stack

| | |
| --- | --- |
| Framework | Vue 3 con Composition API (`<script setup lang="ts">`) |
| Build | Vite |
| Navegación | Vue Router |
| Estado compartido | Pinia |
| Tests | Vitest, Vue Test Utils y jsdom |
| Formato | Prettier |
| Planificado | vue-i18n (español e inglés) |

## Puesta en marcha

Requiere Node.js `^22.18.0` o `>=24.12.0`.

```bash
npm install
npm run dev                        # http://localhost:5173
```

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga en caliente (no comprueba tipos) |
| `npm run test:unit -- --run` | Tests unitarios, una sola vez |
| `npm run type-check` | Comprobación de tipos con `vue-tsc` |
| `npm run build` | Comprobación de tipos y build de producción en `dist/` |
| `npm run format` | Formatea `src/` con Prettier |

La guía completa está en [docs/desarrollo.md](../docs/desarrollo.md).

## Estructura

```
src/
├── main.ts              Punto de entrada: crea la app y registra Pinia y el router
├── App.vue              Marco común: navegación y <RouterView />
├── router/index.ts      Tabla de rutas
├── views/               Páginas completas, una por ruta
├── components/          Piezas reutilizables dentro de las vistas
├── stores/              Stores de Pinia (estado compartido)
└── assets/main.css      Estilos globales
```

El alias `@` apunta a `src/`: `import HomeView from '@/views/HomeView.vue'`.

## Convenciones

- **Componentes** en `PascalCase`, con nombres de varias palabras: `GameCard.vue`, `BacklogList.vue`.
- **Vistas** con el sufijo `View`: `HomeView.vue`, `BacklogView.vue`.
- **Stores** con el patrón `useXxxStore` en un archivo por dominio: `stores/auth.ts` exporta `useAuthStore`.
- **Rutas** con nombre, y se navega por nombre y no por URL: `{ name: 'home' }`. Las vistas que no son la de inicio se cargan bajo demanda:

  ```ts
  { path: '/backlog', name: 'backlog', component: () => import('@/views/BacklogView.vue') }
  ```

- **Tests** en una carpeta `__tests__/` junto al código que prueban, con el nombre `Componente.spec.ts`.
- **Variables de entorno** con el prefijo `VITE_`, el único que Vite expone al navegador. No deben contener secretos.
