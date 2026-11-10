# ADR-8: Autenticación propia con JWT y hash de contraseñas

- **Estado:** Aceptada
- **Fecha:** 2026-10-28
- **Categoría:** Seguridad
- **Impacto:** Alto

## Contexto

Como proyecto de portfolio, debe demostrar una autenticación implementada de principio a fin, no delegada en un servicio externo.

## Decisión

- Token de acceso **JWT de corta duración** y token de **refresco**.
- Contraseñas guardadas con **hash argon2 o bcrypt**, nunca en claro.
- Secretos de firma en **variables de entorno**.

## Alternativas consideradas

| Opción | A favor | En contra |
| --- | --- | --- |
| JWT propio | Se aprende el flujo completo | Hay que cuidar la seguridad |
| Supabase Auth | Menos código | Se aprende menos |

## Consecuencias

- **Positivas:** control total y valor didáctico.
- **Negativas:** más superficie de error; requiere tests de los casos de seguridad.
- **Revisar si:** se añade inicio de sesión con proveedores externos (Google, Steam…).
