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
- **Git**

Comprobar versiones:

```bash
python3 --version
node --version
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

# Variables de entorno
cp .env.example .env

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
