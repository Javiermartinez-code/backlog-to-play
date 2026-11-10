# ADR-5: Backend con FastAPI y SQLAlchemy

- **Estado:** Aceptada
- **Fecha:** 2026-10-28
- **Categoría:** Framework
- **Impacto:** Alto

## Contexto

El proyecto necesita una API REST con validación de datos, documentación automática y buen encaje con el ecosistema de Python, en el que se implementará la lógica de recomendación.

## Decisión

Usar **FastAPI** con **SQLAlchemy** como ORM y **Alembic** para las migraciones.

## Alternativas consideradas

| Opción | A favor | En contra |
| --- | --- | --- |
| FastAPI | Tipado, documentación OpenAPI automática, soporte asíncrono | Ecosistema más joven |
| Flask | Muy sencillo | Menos estructura de serie |
| Spring Boot | Conocido previamente | Más pesado; el recomendador es más natural en Python |

## Consecuencias

- **Positivas:** documentación interactiva sin esfuerzo y validación con Pydantic.
- **Negativas:** curva de aprendizaje de la asincronía y del ecosistema de Python.
- **Revisar si:** el proyecto necesita dividirse en varios servicios.
