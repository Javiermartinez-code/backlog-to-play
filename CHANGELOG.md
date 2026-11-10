# Changelog

Todos los cambios relevantes del proyecto se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y el proyecto usa [versionado semántico](https://semver.org/lang/es/).

## [Sin publicar]

### Añadido

- Monorepo con un backend en FastAPI y un frontend en Vue 3 independientes.
- Guía de contribución y plantilla de Pull Request.
- PostgreSQL 17 en Docker Compose para el desarrollo local.
- Esqueleto de la API: configuración desde variables de entorno, CORS restringido, `GET /health` y router versionado en `/api/v1`.
- Esqueleto del frontend con Vue Router, Pinia y la vista de inicio, sin el contenido de ejemplo de `create-vue`.
- Documentación del proyecto: arquitectura, API, decisiones de arquitectura (ADR), hoja de ruta y guía de desarrollo.
- Política de contribuciones externas, con cesión de derechos al autor, y repositorio sin licencia de código abierto ([ADR-13](docs/adr/0013-repositorio-sin-licencia.md)).
