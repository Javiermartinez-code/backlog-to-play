"""Router principal de la versión 1 de la API.

Todas las rutas de negocio cuelgan de aquí y se montan bajo /api/v1 en main.py.
Cada recurso tendrá su propio router, que se incluirá así:

    api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
"""

from fastapi import APIRouter

api_router = APIRouter()