# Backlog to Play

Aplicación web para gestionar el backlog de videojuegos que responde a una pregunta concreta: **¿qué juego me pongo hoy?**

Quien juega acumula decenas de títulos que nunca empieza o deja a medias. Las aplicaciones existentes sirven para apuntar y puntuar, pero ayudan poco a decidir. Backlog to Play combina el backlog del usuario, el tiempo que tiene disponible y lo que le apetece para proponer un juego, y siempre **explica por qué** lo propone.

> **Estado:** en desarrollo, Sprint 0 (cimientos). Todavía no hay ninguna versión publicada. Consulta la [hoja de ruta](docs/roadmap.md).

## Funcionalidades

| Funcionalidad                                                                                 | Versión        |
| --------------------------------------------------------------------------------------------- | -------------- |
| Registro e inicio de sesión con JWT                                                           | MVP · `v0.1.0` |
| Búsqueda de juegos en RAWG con caché en base de datos propia                                  | MVP · `v0.1.0` |
| Backlog personal con estados: pendiente, jugando, terminado, abandonado                       | MVP · `v0.1.0` |
| **«Elígeme uno»:** propone un juego según los minutos disponibles y el ánimo, con los motivos | MVP · `v0.1.0` |
| Interfaz en español e inglés                                                                  | MVP · `v0.1.0` |
| Demo sin registro: cada visitante entra con un clic en su propia cuenta de ejemplo            | MVP · `v0.1.0` |
| Recomendaciones por similitud de géneros y etiquetas, sin LLM                                 | `v0.2.0`       |

## Stack

| Capa          | Tecnología                                                              |
| ------------- | ----------------------------------------------------------------------- |
| Frontend      | Vue 3 (Composition API), TypeScript, Vite, Vue Router, Pinia, Vitest    |
| Backend       | Python 3.12, FastAPI, Pydantic 2, Uvicorn                               |
| Base de datos | PostgreSQL 17 (Docker en local, Supabase en producción)                 |
| Planificado   | SQLAlchemy y Alembic, autenticación JWT, vue-i18n, despliegue en Vercel |

El motivo de cada elección está en las [decisiones de arquitectura (ADR)](docs/adr/README.md).

## Inicio rápido

Requisitos: Python 3.12, Node.js `^22.18.0 || >=24.12.0` y Docker con Compose v2.

```bash
# Backend: API en http://localhost:8000 (documentación en /docs)
cd backend
python3.12 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env              # rellena los valores
docker compose up -d              # PostgreSQL
uvicorn app.main:app --reload

# Frontend, en otra terminal: http://localhost:5173
cd frontend
npm install
npm run dev
```

La guía completa, con las variables de entorno, la base de datos y los problemas frecuentes, está en [docs/desarrollo.md](docs/desarrollo.md).

## Estructura del repositorio

Monorepo con dos proyectos independientes que **solo se comunican por HTTP**:

```
backlog-to-play/
├── backend/        API REST con FastAPI      → backend/README.md
├── frontend/       SPA con Vue 3 + Vite      → frontend/README.md
├── docs/           Documentación del proyecto
├── CONTRIBUTING.md Flujo de trabajo y convenciones
└── CHANGELOG.md    Cambios por versión
```

## Documentación

| Documento                                                     | Contenido                                                                               |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [Guía de desarrollo](docs/desarrollo.md)                      | Instalación, variables de entorno, base de datos local, comandos y problemas frecuentes |
| [Arquitectura](docs/arquitectura.md)                          | Visión general, componentes, flujo de una petición y modelo de datos                    |
| [API](docs/api.md)                                            | Convenciones y endpoints implementados y planificados                                   |
| [Decisiones de arquitectura](docs/adr/README.md)              | Registro de ADR: qué se decidió, por qué y qué alternativas se descartaron              |
| [Hoja de ruta](docs/roadmap.md)                               | Hitos, versiones y requisitos funcionales                                               |
| [Backend](backend/README.md) · [Frontend](frontend/README.md) | Detalle de cada proyecto                                                                |
| [Guía de contribución](CONTRIBUTING.md)                       | Ramas, commits, Pull Requests y versiones                                               |

## Atribución

Los datos de los juegos procederán de la [API de RAWG](https://rawg.io/apidocs). Backlog to Play no está afiliado a RAWG.

## Licencia

Copyright © 2026 Javier Martínez Vilaplana. Todos los derechos reservados.

El código se publica únicamente para que pueda consultarse. No se concede permiso para copiarlo, modificarlo, distribuirlo ni usarlo, total o parcialmente, sin autorización expresa del autor. Las contribuciones son bienvenidas en las condiciones de la [guía de contribución](CONTRIBUTING.md). El motivo de esta decisión está en el [ADR-13](docs/adr/0013-repositorio-sin-licencia.md).
