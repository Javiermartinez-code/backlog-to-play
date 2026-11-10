# ADR-14: Demo sin registro con una cuenta temporal por visitante

- **Estado:** Aceptada
- **Fecha:** 2026-11-10
- **Categoría:** Arquitectura
- **Impacto:** Alto

## Contexto

El proyecto es un portfolio: quien lo evalúa, sobre todo reclutadores, dedica muy poco tiempo a cada candidato. Tiene que poder probar la aplicación con datos al momento, sin registrarse. A la vez, la web debe servir a usuarios reales con su propia cuenta.

## Decisión

- **Una sola web.** La demo no es otro despliegue, sino otra forma de entrar: un botón «Probar la demo» junto al registro y el inicio de sesión.
- **Una cuenta temporal por visitante.** `POST /api/v1/auth/demo` crea un usuario marcado con `is_demo`, le copia el backlog de la plantilla de datos de ejemplo y devuelve un JWT. Cada visitante parte de los mismos datos y nunca ve lo que otros han cambiado o borrado.
- **Caducidad de 24 horas.** El usuario guarda `expires_at`, y la tarea diaria de Vercel borra las cuentas demo caducadas. Es la misma tarea que evita que Supabase se pause por inactividad.
- **Límites:** un máximo de cuentas demo por IP y hora, y de búsquedas en RAWG por cuenta demo, para proteger la base de datos y la cuota de RAWG. Los valores se leen de la configuración.

## Alternativas consideradas

| Opción                                       | A favor                                                           | En contra                                                                 |
| -------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Cuenta temporal por visitante                | Cada visitante tiene datos limpios; nadie estropea la demo a otro | Más trabajo: endpoint, caducidad, límites y limpieza                      |
| Cuenta demo compartida restaurada cada noche | Muy sencilla                                                      | Los visitantes del mismo día ven los cambios de los demás                 |
| Web de demo separada                         | Aísla del todo los datos                                          | Doble despliegue y configuración; puede desincronizarse del producto real |

## Consecuencias

- **Positivas:** experiencia de un clic para reclutadores; la demo es el producto real; detalle técnico que se nota en el portfolio.
- **Negativas:** dos columnas nuevas en `users`, un endpoint con límites y una limpieza diaria. El Sprint 6 pasa de una a dos semanas.
- **Revisar si:** el número de cuentas demo crece tanto que afecta a los límites del plan gratuito de Supabase.
