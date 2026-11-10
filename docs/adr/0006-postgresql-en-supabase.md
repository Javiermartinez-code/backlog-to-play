# ADR-6: Base de datos PostgreSQL alojada en Supabase

- **Estado:** Aceptada
- **Fecha:** 2026-10-28
- **Categoría:** Base de datos
- **Impacto:** Alto

## Contexto

Hace falta una base de datos relacional gratuita y alojada en la nube (no puede depender de un equipo personal encendido) que guarde los datos de usuario y la caché de RAWG.

## Decisión

Usar **PostgreSQL en Supabase** (capa gratuita) en producción y **PostgreSQL en Docker** en desarrollo local. Supabase se usa solo como base de datos: la autenticación la gestiona la API propia ([ADR-8](0008-autenticacion-jwt.md)).

## Alternativas consideradas

| Opción | A favor | En contra |
| --- | --- | --- |
| Supabase Postgres | Gratuito, PostgreSQL estándar, panel web | El proyecto gratuito se pausa por inactividad |
| Neon | Gratuito, serverless | Menos conocido |
| SQLite | Sin configuración | Mal encaje con un despliegue serverless |

## Consecuencias

- **Positivas:** el mismo motor en local y en producción; valor de portfolio.
- **Negativas:** conexiones limitadas; en serverless hay que usar el *pooler* de conexiones.
- **Revisar si:** la pausa por inactividad afecta a la demo pública.
