# Backlog to Play

Aplicación web para gestionar tu backlog de videojuegos: busca juegos, organiza tu lista de pendientes y descubre qué jugar a continuación con recomendaciones explicables.

> Proyecto en desarrollo.

## Estructura del repositorio

Es un monorepo con dos proyectos independientes que solo se comunican por HTTP:

```
backlog-to-play/
├── backend/     # API REST con FastAPI (Python)
├── frontend/    # SPA con Vue 3 + TypeScript + Vite
└── README.md
```

| Parte       | Tecnología               | Puerto en desarrollo |
| ----------- | ------------------------ | -------------------- |
| `backend/`  | Python, FastAPI, Uvicorn | `8000`               |
| `frontend/` | Vue 3, TypeScript, Vite  | `5173`               |

## Requisitos

- **Python 3.12 o superior** (se recomienda 3.12 o 3.13; 3.14 puede dar problemas con librerías que compilan extensiones)
- **Node.js** `^22.18.0` o `>=24.12.0`
- **Docker** con Docker Compose v2 (para la base de datos PostgreSQL local)
- **Git**

Comprobar versiones:

```bash
python3 --version
node --version
docker --version
docker compose version
```

> En macOS el `python3` del sistema puede ser antiguo (3.9). Si es tu caso, instala una versión moderna con `brew install python@3.12` y usa `python3.12` en los comandos.

## Puesta en marcha en desarrollo

Necesitas **dos terminales abiertas a la vez**.

### 1. Backend

```bash
cd backend

# Crear el entorno virtual (solo la primera vez)
python3.12 -m venv .venv

# Activarlo (cada vez que abras una terminal nueva)
source .venv/bin/activate

# Actualizar pip e instalar dependencias
python -m pip install --upgrade pip
pip install -r requirements.txt

# Variables de entorno (rellena los valores, ver "Base de datos local")
cp .env.example .env

# Arrancar la base de datos (ver "Base de datos local")
docker compose up -d

# Arrancar la API con recarga automática
uvicorn app.main:app --reload
```

- API: http://localhost:8000
- Documentación interactiva (Swagger): http://localhost:8000/docs

Con el entorno activo verás `(.venv)` al inicio del prompt. Para confirmarlo:

```bash
which python    # debe apuntar a .../backend/.venv/bin/python
```

Si añades una dependencia nueva, actualiza el fichero:

```bash
pip install <paquete>
pip freeze > requirements.txt
```

### 2. Frontend

```bash
cd frontend

# Instalar dependencias (solo la primera vez o si cambia package.json)
npm install

# Variables de entorno
cp .env.example .env

# Arrancar el servidor de desarrollo
npm run dev
```

- App: http://localhost:5173

Otros comandos útiles:

```bash
npm run test:unit     # tests unitarios (Vitest)
npm run type-check    # comprobación de tipos
npm run build         # build de producción
npm run format        # formatear con Prettier
```

## Base de datos local

El backend usa **PostgreSQL 17**, que se ejecuta en un contenedor definido en [`backend/docker-compose.yml`](backend/docker-compose.yml). Los datos se guardan en un volumen de Docker (`pgdata`), así que sobreviven a parar o recrear el contenedor.

### Configuración

Las credenciales se leen de `backend/.env` (no versionado). Las claves están listadas, sin valores, en `backend/.env.example`:

| Variable            | Descripción                              | Ejemplo           |
| ------------------- | ---------------------------------------- | ----------------- |
| `POSTGRES_USER`     | Usuario de la base de datos              | `backlog`         |
| `POSTGRES_PASSWORD` | Contraseña (elige una para tu entorno)   |                   |
| `POSTGRES_DB`       | Nombre de la base de datos               | `backlog_to_play` |
| `POSTGRES_PORT`     | Puerto en tu máquina (por defecto 5432)  | `5432`            |

El puerto se publica solo en `127.0.0.1`: la base de datos no es accesible desde otros equipos de la red.

### Comandos

Ejecútalos desde `backend/`:

| Acción                       | Comando                                                                  |
| ---------------------------- | ------------------------------------------------------------------------ |
| Arrancar                     | `docker compose up -d`                                                   |
| Comprobar estado             | `docker compose ps` (espera a que ponga `healthy`)                       |
| Ver logs                     | `docker compose logs -f db`                                              |
| Parar (conserva los datos)   | `docker compose stop`                                                    |
| Reiniciar                    | `docker compose restart db`                                              |
| Eliminar el contenedor       | `docker compose down` (conserva los datos)                               |
| Reiniciar desde cero         | `docker compose down -v` (**borra el volumen y todos los datos**)        |

### Conectarse

```bash
# Consola de psql dentro del contenedor (no requiere tener psql instalado)
docker compose exec db psql -U <POSTGRES_USER> -d <POSTGRES_DB>

# Desde tu máquina, si tienes psql instalado
psql -h localhost -p 5432 -U <POSTGRES_USER> -d <POSTGRES_DB>
```

Cadena de conexión para el backend:

```
postgresql://<POSTGRES_USER>:<POSTGRES_PASSWORD>@localhost:<POSTGRES_PORT>/<POSTGRES_DB>
```

## Variables de entorno

Cada carpeta tiene su propio `.env`, que **no se sube a git**. Lo que sí se versiona es el `.env.example` con las claves y sin valores reales. Copia el ejemplo a `.env` y rellénalo.

## Convenciones

- **Commits:** [Conventional Commits](https://www.conventionalcommits.org/es/) (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`, `test:`).
- **Ramas:** GitHub Flow. `main` siempre estable y el trabajo en ramas cortas con Pull Request.

## Problemas frecuentes

| Problema                                     | Solución                                                                     |
| -------------------------------------------- | ---------------------------------------------------------------------------- |
| `externally-managed-environment` al usar pip | No instales en el Python global. Activa el venv: `source .venv/bin/activate` |
| `command not found: uvicorn`                 | El venv no está activado o falta `pip install -r requirements.txt`           |
| Error de CORS en el navegador                | Revisa `allow_origins` en el backend y que el puerto del frontend coincida   |
| Cambiaste la versión de Python               | Borra `backend/.venv` y vuelve a crearlo                                     |
| `Cannot connect to the Docker daemon`        | Docker Desktop no está arrancado. Ábrelo y espera a que termine de iniciar   |
| `port is already allocated` (5432)           | Otro Postgres usa ese puerto. Cambia `POSTGRES_PORT` en `backend/.env`       |
| Cambiaste `POSTGRES_PASSWORD` y no surte efecto | Postgres solo lee las credenciales al crear el volumen. Ejecuta `docker compose down -v` (borra los datos) y vuelve a arrancar |
