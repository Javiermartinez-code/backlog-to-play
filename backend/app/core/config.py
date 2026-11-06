"""Configuración de la aplicación leída desde variables de entorno y el archivo .env."""

from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    """Ajustes de la API. Cada atributo se lee de la variable de entorno con el mismo nombre."""
    
    # extra: indica a pydantic que hacer con las variables del .env no declaradas dentro de Settings
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "Backlog to Play API"
    
    # valores obligatorios en .env. Sin valores por defecto
    environment: str
    cors_origins: list[str]

# Pyright no sabe que BaseSettings rellena los campos desde el .env al instanciarse.
settings = Settings() # pyright: ignore[reportCallIssue]