# ADR-11: Despliegue completo en Vercel

- **Estado:** Aceptada
- **Fecha:** 2026-10-28
- **Categoría:** Infraestructura
- **Impacto:** Alto

## Contexto

Se quiere desplegar en Vercel. FastAPI puede ejecutarse allí como funciones serverless, pero con límites de tiempo de ejecución, arranques en frío y tareas programadas (*cron*) limitadas en el plan gratuito. La funcionalidad de notificaciones y avisos de lanzamientos dependía de esas tareas programadas.

## Decisión

Desplegar **frontend y API en Vercel** y **eliminar la funcionalidad de notificaciones**: añade limitaciones de infraestructura y no es una funcionalidad central ni determinista para el proyecto.

## Alternativas consideradas

| Opción | A favor | En contra |
| --- | --- | --- |
| Todo en Vercel | Un solo proveedor | Serverless y cron limitado |
| Vercel (frontend) + Render (API) | Servidor convencional y cron | Dos servicios; arranques en frío en el plan gratuito |

## Consecuencias

- **Positivas:** un único proveedor para desplegar y monitorizar.
- **Negativas:** la API debe ser compatible con serverless: sin estado en memoria entre peticiones y con conexiones a la base de datos a través de un *pooler* ([ADR-6](0006-postgresql-en-supabase.md)).
- **Revisar:** antes del Sprint 6, con una prueba de despliegue real.
