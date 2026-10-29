# Backlog to Play

Aplicación web para gestionar el backlog de videojuegos: buscar juegos, organizar la lista de pendientes y recibir recomendaciones explicables sobre qué jugar a continuación. Proyecto de portfolio.

## Estructura (monorepo)

```
backlog-to-play/
├── backend/     # API REST con FastAPI (Python)
├── frontend/    # SPA con Vue 3 + TypeScript + Vite
├── .gitignore
├── CLAUDE.md
└── README.md
```

Cada carpeta es un proyecto independiente con sus propias dependencias. Solo se comunican por HTTP (Vue llama a la API de FastAPI). Nunca mezclar dependencias ni importar código entre `backend/` y `frontend/`.

## Stack

- **Backend:** Python 3.12 (el `.venv` actual usa 3.12), FastAPI, Uvicorn, Pydantic 2.
- **Frontend:** Vue 3, TypeScript, Vite, Vitest, Prettier. Node `^22.18.0 || >=24.12.0`.
- **Gestión del proyecto:** Notion (sprints, tareas, ADRs, ideas). Las decisiones de arquitectura están en la base de datos de ADRs de Notion.

## Comandos de desarrollo

Se necesitan dos terminales a la vez.

### Backend (`:8000`)

```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload
```

- Docs interactivas: http://localhost:8000/docs
- Instalar dependencias: `pip install -r requirements.txt`
- Tras añadir una dependencia: `pip freeze > requirements.txt`

### Frontend (`:5173`)

```bash
cd frontend
npm install
npm run dev
```

- Tests: `npm run test:unit`
- Comprobar tipos: `npm run type-check`
- Build: `npm run build`
- Formatear: `npm run format`

## Convenciones

- **Idioma:** documentación y comentarios en español. Nombres de código (variables, funciones, endpoints) en inglés.
- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`, `test:`).
- **Ramas:** GitHub Flow. `main` siempre estable; el trabajo va en ramas cortas con PR.
- **Entorno virtual:** el `.venv` vive dentro de `backend/` y no se sube a git. Activarlo siempre antes de ejecutar o instalar nada de Python; comprobar con `which python`.
- **Variables de entorno:** cada carpeta tiene su `.env` (ignorado por git) y un `.env.example` versionado con las claves sin valores. Al añadir una variable nueva, actualizar el `.env.example`.
- **Versión de Python:** no actualizar pip en el Python global (en macOS con Homebrew da `externally-managed-environment`). Hacerlo dentro del venv con `python -m pip install --upgrade pip`. Cambiar de versión de Python obliga a recrear el venv.

## CORS

Vue (`http://localhost:5173`) y FastAPI (`http://localhost:8000`) son orígenes distintos porque cambia el puerto, así que el navegador bloquea las peticiones salvo que la API lo permita. Se configura con `CORSMiddleware` en `backend/app/main.py`:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

- CORS es una protección del **navegador**: curl, Postman y `/docs` no la aplican, así que la API puede funcionar ahí y fallar desde Vue.
- No usar `allow_origins=["*"]` en producción; poner solo el dominio real del frontend.
- Alternativa en desarrollo: proxy de Vite hacia `localhost:8000` para no necesitar CORS en local.

## Estado actual

- `backend/`: solo tiene el venv, `requirements.txt` y `.env.example`. Falta crear `app/main.py` (esqueleto FastAPI con CORS).
- `frontend/`: proyecto Vue generado con `create-vue`, aún con el contenido de ejemplo (`HelloWorld`, `TheWelcome`).
- API planificada: REST con unos 15 endpoints (autenticación, búsqueda de juegos, gestión del backlog, recomendaciones).
