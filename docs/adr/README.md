# Decisiones de arquitectura (ADR)

Un ADR (_Architecture Decision Record_) documenta una decisión técnica importante: el contexto en que se tomó, qué se decidió, qué alternativas se descartaron y qué consecuencias tiene. Sirve para que cualquiera entienda **por qué** el proyecto es como es.

## Registro

| ID                                          | Decisión                                                     | Categoría       | Estado    | Fecha      |
| ------------------------------------------- | ------------------------------------------------------------ | --------------- | --------- | ---------- |
| [ADR-5](0005-backend-fastapi-sqlalchemy.md) | Backend con FastAPI y SQLAlchemy                             | Framework       | Aceptada  | 2026-10-28 |
| [ADR-6](0006-postgresql-en-supabase.md)     | Base de datos PostgreSQL alojada en Supabase                 | Base de datos   | Aceptada  | 2026-10-28 |
| [ADR-7](0007-frontend-vue.md)               | Frontend con Vue 3, Vite, Pinia y vue-i18n                   | Framework       | Aceptada  | 2026-10-28 |
| [ADR-8](0008-autenticacion-jwt.md)          | Autenticación propia con JWT y hash de contraseñas           | Seguridad       | Aceptada  | 2026-10-28 |
| [ADR-9](0009-recomendaciones-sin-llm.md)    | Recomendaciones sin LLM con similitud de géneros y etiquetas | Arquitectura    | Aceptada  | 2026-10-28 |
| [ADR-10](0010-flujo-git.md)                 | Flujo Git: GitHub Flow, Conventional Commits y SemVer        | Proceso         | Aceptada  | 2026-10-28 |
| [ADR-11](0011-despliegue-en-vercel.md)      | Despliegue completo en Vercel                                | Infraestructura | Aceptada  | 2026-10-28 |
| [ADR-12](0012-identidad-visual-propia.md)   | Identidad visual propia                                      | UI/UX           | Propuesta | 2026-10-28 |
| [ADR-13](0013-repositorio-sin-licencia.md)  | Repositorio público sin licencia de código abierto           | Proceso         | Aceptada  | 2026-11-10 |

## Estados

| Estado        | Significado                                                    |
| ------------- | -------------------------------------------------------------- |
| **Propuesta** | En discusión; todavía no condiciona el desarrollo              |
| **Aceptada**  | En vigor                                                       |
| **Rechazada** | Se evaluó y se descartó                                        |
| **Obsoleta**  | Sustituida por un ADR posterior, que se indica en el documento |

## Cómo añadir un ADR

1. Copia [`plantilla.md`](plantilla.md) como `NNNN-titulo-corto.md`, con el siguiente número libre.
2. Rellena las secciones. El contexto y las alternativas importan tanto como la decisión.
3. Añade la fila a la tabla de este índice.
4. Una decisión aceptada **no se edita** para cambiarla: se crea un ADR nuevo que la sustituye y el anterior pasa a _Obsoleta_.
