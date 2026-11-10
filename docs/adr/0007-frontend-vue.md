# ADR-7: Frontend con Vue 3, Vite, Pinia y vue-i18n

- **Estado:** Aceptada
- **Fecha:** 2026-10-28
- **Categoría:** Framework
- **Impacto:** Alto

## Contexto

La interfaz web debe estar en español y en inglés y compartir estado entre pantallas, como la sesión del usuario y su backlog.

## Decisión

**Vue 3** con Composition API, **Vite** como herramienta de build, **Vue Router** para la navegación, **Pinia** para el estado compartido y **vue-i18n** para la internacionalización.

## Alternativas consideradas

| Opción | A favor | En contra |
| --- | --- | --- |
| Vue 3 | Ya previsto en el stack, curva de aprendizaje suave | Menos ofertas de empleo que React |
| React | Mucho mercado | Cambia el stack previsto |

## Consecuencias

- **Positivas:** internacionalización desde el primer día.
- **Negativas:** ninguna relevante.
- **Revisar si:** hiciera falta renderizado en servidor o SEO (Nuxt).
