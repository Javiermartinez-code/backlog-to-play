# Backlog to Play · Backend

API REST de Backlog to Play, construida con **FastAPI**.

## Stack

|                            |                                                                |
| -------------------------- | -------------------------------------------------------------- |
| Lenguaje                   | Python 3.12                                                    |
| Framework                  | FastAPI, servido con Uvicorn                                   |
| Validación y configuración | Pydantic 2, pydantic-settings                                  |
| Base de datos              | PostgreSQL 17 (Docker en local)                                |
| Planificado                | SQLAlchemy, Alembic, JWT, cliente HTTP para RAWG, pytest, ruff |

## Puesta en marcha

```bash
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env               # rellena los valores
docker compose up -d               # PostgreSQL
uvicorn app.main:app --reload      # http://localhost:8000
```

Todos los comandos se ejecutan **desde esta carpeta**: los imports parten de aquí (`from app...`) y la configuración lee el `.env` del directorio actual.

La guía completa, con las variables de entorno y los problemas frecuentes, está en [docs/desarrollo.md](../docs/desarrollo.md).

## Estructura

```
backend/
├── app/
│   ├── main.py              Crea la app, CORS, GET /health y monta /api/v1
│   ├── core/config.py       Settings: configuración desde variables de entorno
│   └── api/v1/router.py     api_router: agrupa los routers de cada recurso
├── docker-compose.yml       PostgreSQL local
├── requirements.txt         Dependencias fijadas (pip freeze)
└── .env.example             Variables necesarias, sin valores
```

## Configuración

`app/core/config.py` define `Settings`, que lee cada atributo de la variable de entorno con el mismo nombre (sin distinguir mayúsculas) o del `.env`. Se usa a través de la instancia única `settings`:

```python
from app.core.config import settings

settings.cors_origins  # ["http://localhost:5173"]
```

- Las variables que dependen del entorno **no tienen valor por defecto**: si faltan, la API no arranca.
- Las listas se escriben en JSON: `CORS_ORIGINS=["http://localhost:5173"]`.
- `extra="ignore"` permite que el `.env` contenga las variables `POSTGRES_*` que usa Docker Compose.

## Añadir un recurso

Cada recurso tiene su propio router en `app/api/v1/`:

```python
# app/api/v1/games.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/search")
def search_games(q: str) -> list[dict]:
    ...
```

Y se registra en `app/api/v1/router.py`:

```python
from app.api.v1 import games

api_router.include_router(games.router, prefix="/games", tags=["games"])
```

El endpoint queda disponible en `/api/v1/games/search` y aparece automáticamente en `/docs`.

## Documentación de la API

- Interactiva, generada por FastAPI: http://localhost:8000/docs
- Convenciones y endpoints planificados: [docs/api.md](../docs/api.md)
