import os
from dotenv import load_dotenv

# Cargar variables del archivo .env
load_dotenv()

class Settings:
    MYSQL_URL = os.getenv("MYSQL_URL")
    MONGO_URL = os.getenv("MONGO_URL")
    SECRET_KEY = os.getenv("SECRET_KEY", "secret")

settings = Settings()
