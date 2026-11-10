# Guía de desarrollo

Cómo poner en marcha Backlog to Play en local, configurarlo y resolver los problemas más habituales.

## Índice

- [Requisitos](#requisitos)
- [Backend](#backend)
- [Frontend](#frontend)
- [Base de datos local](#base-de-datos-local)
- [Variables de entorno](#variables-de-entorno)
- [Comprobaciones antes de un Pull Request](#comprobaciones-antes-de-un-pull-request)
- [Editor](#editor)
- [Problemas frecuentes](#problemas-frecuentes)

## Requisitos

| Herramienta | Versión | Comprobación |
| --- | --- | --- |
| Python | 3.12 (3.13 también sirve; 3.14 puede fallar con librerías que compilan extensiones) | `python3.12 --version` |
| Node.js | `^22.18.0` o `>=24.12.0` | `node --version` |
| Docker | Con Docker Compose v2 | `docker compose version` |
| Git | Cualquier versión reciente | `git --version` |

> En macOS el `python3` del sistema puede ser antiguo (3.9). Instala una versión moderna con `brew install python@3.12` y usa `python3.12` en los comandos.

Para desarrollar hacen falta **dos terminales**, una para la API y otra para el frontend.

## Backend

Todos los comandos se ejecutan desde `backend/`.

```bash
cd backend

# 1. Entorno virtual (solo la primera vez)
python3.12 -m venv .venv

# 2. Activarlo (en cada terminal nueva)
source .venv/bin/activate
which python                       # debe apuntar a .../backend/.venv/bin/python

# 3. Dependencias
python -m pip install --upgrade pip
pip install -r requirements.txt

# 4. Variables de entorno
cp .env.example .env               # rellena los valores (ver "Variables de entorno")

# 5. Base de datos
docker compose up -d

# 6. API con recarga automática
uvicorn app.main:app --reload
```

| URL | Qué es |
| --- | --- |
| http://localhost:8000/health | Comprobación de vida: `{"status": "ok"}` |
| http://localhost:8000/docs | Documentación interactiva (Swagger UI) |
| http://localhost:8000/redoc | Documentación de referencia (ReDoc) |

Lanza siempre `uvicorn` **desde `backend/`**: los imports parten de esa carpeta (`from app...`) y la configuración busca el `.env` en el directorio actual.

Para añadir una dependencia:

```bash
pip install <paquete>
pip freeze > requirements.txt
```

## Frontend

Todos los comandos se ejecutan desde `frontend/`.

```bash
cd frontend
npm install                        # primera vez o cuando cambie package.json
npm run dev                        # http://localhost:5173
```

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run test:unit` | Tests unitarios con Vitest en modo *watch* |
| `npm run test:unit -- --run` | Tests unitarios una sola vez (el que se usa antes de un PR) |
| `npx vitest run <ruta>` | Tests de un solo archivo |
| `npx vitest run -t "<nombre>"` | Un solo test por su nombre |
| `npm run type-check` | Comprobación de tipos con `vue-tsc` |
| `npm run build` | Comprobación de tipos y build de producción en `dist/` |
| `npm run preview` | Sirve el build de producción en local |
| `npm run format` | Formatea `src/` con Prettier |

> `npm run dev` **no comprueba los tipos**. Un error de TypeScript puede pasar desapercibido en el navegador y aparecer después en `npm run build`.

## Base de datos local

El backend usa **PostgreSQL 17** en un contenedor definido en [`backend/docker-compose.yml`](../backend/docker-compose.yml). Los datos viven en el volumen de Docker `pgdata`, así que sobreviven a parar o recrear el contenedor.

El puerto se publica solo en `127.0.0.1`: la base de datos no es accesible desde otros equipos de la red.

### Comandos

Desde `backend/`:

| Acción | Comando |
| --- | --- |
| Arrancar | `docker compose up -d` |
| Comprobar el estado | `docker compose ps` (espera a que aparezca `healthy`) |
| Ver los logs | `docker compose logs -f db` |
| Parar (conserva los datos) | `docker compose stop` |
| Reiniciar | `docker compose restart db` |
| Eliminar el contenedor (conserva los datos) | `docker compose down` |
| Empezar de cero | `docker compose down -v` (**borra el volumen y todos los datos**) |

### Conectarse

```bash
# psql dentro del contenedor (no hace falta tenerlo instalado)
docker compose exec db psql -U <POSTGRES_USER> -d <POSTGRES_DB>

# psql instalado en tu máquina
psql -h localhost -p <POSTGRES_PORT> -U <POSTGRES_USER> -d <POSTGRES_DB>
```

Cadena de conexión:

```
postgresql://<POSTGRES_USER>:<POSTGRES_PASSWORD>@localhost:<POSTGRES_PORT>/<POSTGRES_DB>
```

## Variables de entorno

Cada proyecto tiene su propio `.env`, que **nunca se sube a Git**. Lo que sí se versiona es el `.env.example`, con las claves y sin valores. Al añadir una variable nueva hay que ponerla, sin valor, en el `.env.example` de su carpeta.

### `backend/.env`

Todas las variables son **obligatorias**: si falta alguna, la API no arranca y muestra `Field required`. Así un error de configuración se detecta al arrancar y no en mitad de una petición.

| Variable | Descripción | Ejemplo |
| --- | --- | --- |
| `ENVIRONMENT` | Entorno de ejecución | `development` |
| `CORS_ORIGINS` | Orígenes que pueden llamar a la API desde el navegador, en formato JSON | `["http://localhost:5173"]` |
| `POSTGRES_USER` | Usuario de la base de datos | `backlog` |
| `POSTGRES_PASSWORD` | Contraseña (elige una para tu entorno) | |
| `POSTGRES_DB` | Nombre de la base de datos | `backlog_to_play` |
| `POSTGRES_PORT` | Puerto publicado en tu máquina (por defecto `5432`) | `5432` |

Las variables `POSTGRES_*` las comparten Docker Compose y la API. Por eso `Settings` ignora las variables que no declara (`extra="ignore"`).

`CORS_ORIGINS` es una lista: va entre corchetes y con comillas dobles. En producción debe contener únicamente el dominio real del frontend, nunca `*`.

### `frontend/.env`

Por ahora el frontend no usa ninguna variable. Cuando las use, irán con el prefijo `VITE_`: Vite solo expone al navegador las variables con ese prefijo. Todo lo que lleva `VITE_` acaba en el JavaScript que se descarga el usuario, así que **nunca debe contener secretos**.

## Comprobaciones antes de un Pull Request

| Parte tocada | Comandos |
| --- | --- |
| `backend/` | `ruff check .` y `pytest` |
| `frontend/` | `npm run test:unit -- --run` y `npm run build` |

> `ruff` y `pytest` todavía no están en `backend/requirements.txt`. Se añadirán junto con los primeros tests del backend.

El flujo completo está en la [guía de contribución](../CONTRIBUTING.md).

## Editor

`pyrightconfig.json`, en la raíz del repositorio, indica al analizador de tipos dónde está el entorno virtual (`backend/.venv`) y que los imports parten de `backend/`. Así funcionan el autocompletado y la documentación al pasar el ratón.

| Editor | Python | Vue |
| --- | --- | --- |
| VS Code | Extensión Python con Pylance | Vue (Official) |
| Cursor | **Cursor Pyright** (`anysphere.cursorpyright`); Pylance no funciona fuera de VS Code | Vue (Official) |

## Problemas frecuentes

### Backend

| Síntoma | Causa y solución |
| --- | --- |
| `externally-managed-environment` al usar pip | Estás instalando en el Python global. Activa el venv: `source .venv/bin/activate` |
| `command not found: uvicorn` | El venv no está activado o falta `pip install -r requirements.txt` |
| `ModuleNotFoundError: No module named 'app'` | Lanza `uvicorn` desde `backend/` |
| `Field required` al arrancar | Falta una variable obligatoria en `backend/.env`. Compáralo con `.env.example` |
| `error parsing value for field "cors_origins"` | `CORS_ORIGINS` no está en JSON. Usa `["http://localhost:5173"]` |
| Has cambiado de versión de Python | Borra `backend/.venv` y vuelve a crearlo |

### Base de datos

| Síntoma | Causa y solución |
| --- | --- |
| `Cannot connect to the Docker daemon` | Docker Desktop no está arrancado. Ábrelo y espera a que termine de iniciar |
| `port is already allocated` (5432) | Otro PostgreSQL usa el puerto. Cambia `POSTGRES_PORT` en `backend/.env` |
| Un cambio en `POSTGRES_PASSWORD` no tiene efecto | PostgreSQL solo lee las credenciales al crear el volumen. `docker compose down -v` (borra los datos) y vuelve a arrancar |

### Frontend y comunicación

| Síntoma | Causa y solución |
| --- | --- |
| Error de CORS en la consola del navegador | `CORS_ORIGINS` debe incluir la URL exacta del frontend, con protocolo y puerto. Reinicia la API después de cambiarlo |
| `No test files found` al ejecutar los tests | Vitest no encuentra ningún `*.spec.ts`. Los tests van en carpetas `__tests__/` junto al código que prueban |
| La app funciona en `dev` y falla en `build` | Hay un error de tipos. Ejecuta `npm run type-check` para verlo |
