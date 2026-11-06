# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Backlog to Play

Aplicación web para gestionar el backlog de videojuegos: buscar juegos, organizar la lista de pendientes y recibir recomendaciones explicables sobre qué jugar a continuación. Proyecto de portfolio.

## Estructura (monorepo)

`backend/` (API REST con FastAPI) y `frontend/` (SPA con Vue 3 + TypeScript + Vite) son proyectos independientes, cada uno con sus dependencias y su `.env`. Solo se comunican por HTTP: nunca mezclar dependencias ni importar código entre ellos.

## Stack

- **Backend:** Python 3.12 (`backend/.venv`), FastAPI, Uvicorn, Pydantic 2, pydantic-settings. PostgreSQL 17 en Docker.
- **Frontend:** Vue 3, TypeScript, Vite, Vitest, Prettier. Node `^22.18.0 || >=24.12.0`.
- **Planificado (ADRs en Notion):** SQLAlchemy + Alembic, autenticación JWT, búsqueda de juegos en RAWG con caché, despliegue en Vercel.
- **Gestión del proyecto:** Notion (sprints, tareas, ADRs). Las tareas se identifican como `S.N` (p. ej. `0.4`) y tienen un bloque "Qué / Hecho cuando" con los criterios de aceptación. La tabla de endpoints está en la página "Documentación de API (endpoints)".

## Comandos

### Backend (desde `backend/`, con el venv activado)

```bash
source .venv/bin/activate          # comprobar con: which python
docker compose up -d               # PostgreSQL local (docker-compose.yml está en backend/)
uvicorn app.main:app --reload      # API en :8000, docs en /docs
pip freeze > requirements.txt      # tras instalar una dependencia
```

Uvicorn debe lanzarse **desde `backend/`**: los imports parten de ahí (`from app...`) y pydantic-settings busca `.env` en la carpeta actual.

`CONTRIBUTING.md` exige `ruff check .` y `pytest` antes de cada PR, pero aún no están en `requirements.txt`.

### Frontend (desde `frontend/`)

```bash
npm run dev                        # :5173
npm run test:unit -- --run         # todos los tests, sin modo watch
npx vitest run src/components/__tests__/HelloWorld.spec.ts   # un solo archivo
npx vitest run -t "nombre del test"                          # un solo test
npm run type-check                 # vue-tsc; Vite en dev NO comprueba tipos
npm run build                      # type-check + build
npm run format
```

## Arquitectura del backend

- `app/main.py`: crea la app, añade `CORSMiddleware`, define `GET /health` y monta `api_router` con el prefijo `/api/v1`.
- `/health` queda **fuera** de `/api/v1` a propósito: es infraestructura, no negocio.
- `app/api/v1/router.py`: `api_router` agrupa todas las rutas de negocio. Cada recurso nuevo tendrá su propio `APIRouter` en `app/api/v1/` y se incluirá aquí con `api_router.include_router(x.router, prefix="/recurso", tags=["recurso"])`.
- `app/core/config.py`: `Settings(BaseSettings)` con una instancia única `settings`.
  - Los valores que dependen del entorno (`environment`, `cors_origins`) **no tienen valor por defecto**, para que la app falle al arrancar si faltan. Por eso la instancia lleva `# pyright: ignore[reportCallIssue]`.
  - Usa `extra="ignore"` porque `backend/.env` comparte las variables `POSTGRES_*` con Docker Compose.
  - Las listas se escriben en el `.env` en JSON: `CORS_ORIGINS=["http://localhost:5173"]`.
- Los orígenes de CORS salen de `settings.cors_origins`. No usar `["*"]`.

`pyrightconfig.json` (raíz) apunta a `backend/.venv` y fija `backend/` como raíz de imports. En Cursor el servidor de tipos es Cursor Pyright: Pylance no funciona fuera de VS Code.

## Frontend

Sigue siendo el proyecto generado por `create-vue`, con el contenido de ejemplo (`HelloWorld`, `TheWelcome`). La tarea 0.5 lo convierte en un esqueleto con Vue Router y Pinia, que aún no están instalados. Alias `@` → `src/`. Usar `<script setup lang="ts">` (Composition API).

## Convenciones

- **Idioma:** documentación y comentarios en español; nombres de código (variables, funciones, endpoints) en inglés.
- **Ramas:** GitHub Flow con prefijos `feat/`, `fix/`, `chore/` o `docs/`. `main` solo recibe PR (Squash and merge), con la plantilla de `.github/pull_request_template.md`.
- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`, `test:`), con la descripción en minúscula.
- **Variables de entorno:** al añadir una, ponerla sin valor en el `.env.example` de su carpeta.
- **Python:** no actualizar pip en el Python global (Homebrew da `externally-managed-environment`); hacerlo dentro del venv. Cambiar de versión de Python obliga a recrear el venv.
