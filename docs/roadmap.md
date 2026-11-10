# Hoja de ruta

Planificación de Backlog to Play por hitos y versiones. El seguimiento diario (sprints, tareas y criterios de aceptación) se lleva en Notion; este documento recoge el plan de alto nivel.

## Objetivos

- MVP desplegado y accesible por URL pública (`v0.1.0`).
- «Elígeme uno» devuelve un juego del backlog, con su explicación.
- Caché de RAWG: un juego consultado dos veces solo genera **una** llamada a RAWG.
- Interfaz disponible en español e inglés.
- Recomendaciones por similitud de géneros y etiquetas, sin LLM (`v0.2.0`).

## Hitos

Cada hito cierra un sprint de dos semanas.

| Hito                      | Resultado                                                                   | Sprint | Fecha objetivo | Estado    |
| ------------------------- | --------------------------------------------------------------------------- | ------ | -------------- | --------- |
| 0 · Entorno listo         | Repositorio, Docker, PostgreSQL y esqueletos de API y web funcionando       | 0      | 2026-11-15     | En curso  |
| 1 · Acceso de usuarios    | Registro, inicio de sesión y rutas protegidas                               | 1      | 2026-11-29     | Pendiente |
| 2 · Catálogo con caché    | Búsqueda y ficha de juego servidas desde la base de datos propia            | 2      | 2026-12-13     | Pendiente |
| 3 · Backlog personal      | Añadir, filtrar, cambiar de estado y quitar juegos                          | 3      | 2026-12-27     | Pendiente |
| 4 · «Elígeme uno»         | Recomendación con motivos                                                   | 4      | 2027-01-10     | Pendiente |
| 5 · MVP completo en local | Bilingüe y con identidad visual propia                                      | 5      | 2027-01-17     | Pendiente |
| 6 · MVP publicado         | Desplegado, con demo sin registro y accesible por URL pública: **`v0.1.0`** | 6      | 2027-01-31     | Pendiente |

## Versiones

| Versión        | Contenido                                                                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `v0.1.0` · MVP | Registro e inicio de sesión, búsqueda en RAWG con ficha, backlog con estados, «Elígeme uno», demo sin registro, español e inglés, despliegue |
| `v0.2.0`       | Recomendaciones por similitud de géneros y etiquetas                                                                                         |
| `v1.0.0`       | Publicación estable                                                                                                                          |

**Fuera de alcance por ahora:** importar la biblioteca de Steam, funciones sociales, aplicación móvil nativa y LLM (posible fase 3).

**Descartado:** notificaciones y avisos de lanzamientos ([ADR-11](adr/0011-despliegue-en-vercel.md)), y la wishlist, que dependía de esos avisos.

## Requisitos funcionales

| ID    | Requisito                                   | Prioridad      | Criterio de aceptación                                                                           |
| ----- | ------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------ |
| RF-01 | Registro e inicio de sesión                 | Imprescindible | Se crea el usuario y se obtiene un JWT válido                                                    |
| RF-02 | Búsqueda de juegos en RAWG y ficha          | Imprescindible | La búsqueda devuelve resultados y la ficha muestra los datos básicos                             |
| RF-03 | Caché de juegos en la base de datos propia  | Imprescindible | La segunda consulta del mismo juego no llama a RAWG                                              |
| RF-04 | Añadir un juego al backlog con un estado    | Imprescindible | El juego aparece en la lista con el estado elegido                                               |
| RF-05 | Cambiar el estado o eliminar del backlog    | Imprescindible | `PATCH` y `DELETE` reflejan el cambio                                                            |
| RF-06 | «Elígeme uno» según tiempo y ánimo          | Imprescindible | Devuelve un juego del backlog con sus motivos                                                    |
| RF-07 | Idioma español e inglés                     | Imprescindible | Cambiar de idioma traduce toda la interfaz                                                       |
| RF-08 | Recomendaciones por similitud               | Importante     | Lista de juegos parecidos ordenada por puntuación                                                |
| RF-09 | Salud del backlog                           | Deseable       | Panel con horas pendientes y juegos olvidados                                                    |
| RF-10 | Demo sin registro, una cuenta por visitante | Imprescindible | Un clic crea una cuenta demo con datos de ejemplo; los cambios de un visitante no afectan a otro |

## Requisitos no funcionales

| Área           | Requisito                                                                                                      |
| -------------- | -------------------------------------------------------------------------------------------------------------- |
| Rendimiento    | Respuestas de la API en menos de 500 ms con datos en caché                                                     |
| Seguridad      | Contraseñas con hash (argon2 o bcrypt), JWT con caducidad, secretos en variables de entorno y CORS restringido |
| Accesibilidad  | Contraste suficiente y navegación completa por teclado                                                         |
| Mantenibilidad | Migraciones con Alembic, tests con pytest y Vitest, integración continua en GitHub Actions                     |

## Riesgos

| Riesgo                                                    | Probabilidad | Impacto | Plan                                                                                     |
| --------------------------------------------------------- | ------------ | ------- | ---------------------------------------------------------------------------------------- |
| Límites o términos de uso de RAWG                         | Media        | Alto    | Cachear en base de datos, mostrar la atribución y revisar los términos antes de publicar |
| FastAPI serverless en Vercel (arranques en frío, límites) | Media        | Medio   | Prueba de despliegue antes del Sprint 6; alternativa: Render                             |
| Parecido excesivo con aplicaciones existentes             | Alta         | Medio   | Funcionalidades diferenciadoras («Elígeme uno» explicable) y diseño propio               |
