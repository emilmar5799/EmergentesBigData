# app/config/settings.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGO_URI: str
    JWT_SECRET: str = "SUPER_SECRETO_CAMBIA_ESTE_VALOR"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION_SECONDS: int = 3600
    API_BASE: str = "http://127.0.0.1:8000"  # ← AGREGAR ESTA LÍNEA

    class Config:
        env_file = ".env"

settings = Settings()