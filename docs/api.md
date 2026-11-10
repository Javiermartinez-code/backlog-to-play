# API

Contrato de la API REST de Backlog to Play.

La **fuente de verdad** de los endpoints implementados es la documentación que genera FastAPI a partir del código: [`/docs`](http://localhost:8000/docs) (Swagger UI) y [`/openapi.json`](http://localhost:8000/openapi.json). Este documento recoge las convenciones y la planificación completa, incluidos los endpoints que aún no existen.

## Información general

| | |
| --- | --- |
| URL base (local) | `http://localhost:8000/api/v1` |
| Formato | JSON (`Content-Type: application/json`) |
| Autenticación | `Authorization: Bearer <token JWT>` |
| Versionado | En la ruta: `/api/v1`. Un cambio incompatible crearía `/api/v2` |

## Convenciones

- **Rutas en inglés, en plural y en minúscula:** `/games`, `/backlog/{id}`.
- **Métodos HTTP con su significado estándar:** `GET` lee, `POST` crea, `PATCH` modifica parcialmente y `DELETE` elimina.
- **Códigos de estado precisos:** `201` al crear, `204` al eliminar sin cuerpo de respuesta, `409` ante duplicados y `422` ante datos no válidos.
- **Errores con el formato de FastAPI:** `{"detail": "..."}` o, en errores de validación, una lista con el campo y el motivo.

## Endpoints

### Implementados

| Método | Ruta | Descripción | Auth | Respuestas |
| --- | --- | --- | --- | --- |
| `GET` | `/health` | Comprueba que la API está viva. Está fuera de `/api/v1` | No | `200` |

```http
GET /health

200 OK
{"status": "ok"}
```

### Planificados

Las rutas son relativas a `/api/v1`.

| Método | Ruta | Descripción | Auth | Respuestas | Versión |
| --- | --- | --- | --- | --- | --- |
| `POST` | `/auth/register` | Crea un usuario | No | `201`, `409`, `422` | MVP |
| `POST` | `/auth/login` | Devuelve un JWT | No | `200`, `401` | MVP |
| `POST` | `/auth/refresh` | Renueva el token | Sí | `200`, `401` | MVP |
| `GET` | `/users/me` | Perfil del usuario autenticado | Sí | `200`, `401` | MVP |
| `GET` | `/games/search?q=` | Busca juegos en RAWG, con caché | Sí | `200` | MVP |
| `GET` | `/games/{rawg_id}` | Ficha de un juego (desde la caché o RAWG) | Sí | `200`, `404` | MVP |
| `GET` | `/backlog?status=` | Lista el backlog, con filtro opcional por estado | Sí | `200` | MVP |
| `POST` | `/backlog` | Añade un juego con un estado | Sí | `201`, `409`, `422` | MVP |
| `PATCH` | `/backlog/{id}` | Cambia el estado, la prioridad o las notas | Sí | `200`, `404`, `422` | MVP |
| `DELETE` | `/backlog/{id}` | Quita un juego del backlog | Sí | `204`, `404` | MVP |
| `POST` | `/picker` | «Elígeme uno»: propone un juego según minutos y ánimo | Sí | `200`, `404` | MVP |
| `GET` | `/recommendations` | Juegos recomendados según los gustos del usuario | Sí | `200` | `v0.2.0` |
| `GET` | `/games/{id}/similar` | Juegos parecidos a uno dado | Sí | `200` | `v0.2.0` |
| `POST` | `/internal/cron/refresh` | Refresca la caché de juegos. Protegido con un secreto | Secreto | `204`, `403` | `v0.2.0` |
| `GET` | `/stats/backlog-health` | Métricas del backlog: horas pendientes, juegos olvidados | Sí | `200` | Extra |

## Ejemplo: «Elígeme uno»

```http
POST /api/v1/picker
Authorization: Bearer <token>
Content-Type: application/json

{"minutes": 90, "mood": "relaxed"}
```

```http
200 OK

{
  "game": {"id": 12, "name": "Stardew Valley"},
  "reasons": [
    "Cabe en tu sesión",
    "Encaja con un ánimo tranquilo",
    "Lleva 8 meses en tu backlog"
  ]
}
```

Si el backlog no tiene juegos pendientes, la respuesta es `404`.

## Códigos de error

| Código | Significado | Qué hacer |
| --- | --- | --- |
| `401` | No autenticado o token caducado | Enviar un token válido o renovarlo con `/auth/refresh` |
| `403` | Secreto incorrecto en un endpoint interno | Revisar el secreto configurado |
| `404` | El recurso no existe o el backlog está vacío | Revisar el identificador |
| `409` | Duplicado: el email ya existe o el juego ya está en el backlog | Usar el recurso existente |
| `422` | Datos no válidos | Revisar el cuerpo de la petición; `detail` indica el campo |
| `502` | RAWG no responde | Reintentar; si el juego está en caché, se sirve desde ahí |

## Mantenimiento de este documento

Cuando se implementa un endpoint, se mueve de «Planificados» a «Implementados» en el mismo Pull Request. Si su contrato cambia respecto a lo planificado, se actualiza aquí y en la página de endpoints de Notion.
