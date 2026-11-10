# ADR-10: Flujo Git: GitHub Flow, Conventional Commits y SemVer

- **Estado:** Aceptada
- **Fecha:** 2026-10-28
- **Categoría:** Proceso
- **Impacto:** Medio

## Contexto

El desarrollo es en solitario, pero se busca un historial limpio y versiones claras, como en un equipo profesional.

## Decisión

- `main` protegida; el trabajo se hace en ramas `feat/`, `fix/`, `chore/` y `docs/` que se integran por Pull Request.
- Mensajes de commit en **Conventional Commits**.
- Etiquetas **SemVer**: `v0.1.0` (MVP), `v0.2.0` (recomendaciones) y `v1.0.0` (publicación estable).

El detalle operativo está en la [guía de contribución](../../CONTRIBUTING.md).

## Alternativas consideradas

| Opción | A favor | En contra |
| --- | --- | --- |
| GitHub Flow | Sencillo | Sin rama de integración |
| Git Flow | Muy estructurado | Excesivo para una sola persona |

## Consecuencias

- **Positivas:** permite generar el CHANGELOG a partir de los commits.
- **Negativas:** exige disciplina al escribir los commits.
- **Revisar si:** se incorporan más colaboradores.
