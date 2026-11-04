# Guía de contribución

Flujo de trabajo de Backlog to Play: GitHub Flow, Conventional Commits y SemVer.

## Principio

`main` siempre está estable y **solo recibe cambios por Pull Request**. No se hace push directo ni force push.

## Ramas

Se crea una rama corta desde `main` por cada tarea, con uno de estos prefijos:

| Prefijo | Uso |
| --- | --- |
| `feat/` | Funcionalidad nueva |
| `fix/` | Corrección de un bug |
| `chore/` | Mantenimiento, configuración, dependencias |
| `docs/` | Solo documentación |

Ejemplo: `feat/busqueda-de-juegos`.

## Commits

Se siguen los [Conventional Commits](https://www.conventionalcommits.org/es/): `tipo: descripción en minúscula`.

Tipos: `feat`, `fix`, `docs`, `refactor`, `chore`, `test`.

```
feat: añadir endpoint de búsqueda de juegos
fix: corregir el orden del backlog al eliminar un juego
```

## Flujo de un Pull Request

1. Actualizar `main` y crear la rama: `git checkout main && git pull && git checkout -b feat/mi-cambio`.
2. Hacer los cambios con commits pequeños.
3. Pasar las comprobaciones de la parte tocada:
   - `backend/`: `ruff check .` y `pytest`
   - `frontend/`: `npm run test:unit -- --run` y `npm run build`
4. Subir la rama y abrir el PR contra `main`. La plantilla se rellena sola: describir el cambio y marcar la lista.
5. Cuando todo esté marcado, fusionar con **Squash and merge** (un commit por PR, con mensaje en Conventional Commits).
6. Borrar la rama.

## Versiones

Etiquetas SemVer sobre `main`: `v0.1.0` (MVP), `v0.2.0` (recomendaciones), `v1.0.0` (publicación estable).

## Secretos y variables de entorno

No se sube ningún `.env`. Cada variable nueva se añade, sin valor, al `.env.example` de su carpeta.
