from pymongo import MongoClient
from app.config.settings import settings

try:
    client = MongoClient(settings.MONGO_URI)
    db = client["EmergentesDb"]

    # Colecciones
    users_collection = db["users"]
    air_collection = db["air"]
    noise_collection = db["noise"]
    underground_collection = db["underground"]

    print("✔ MongoDB conectado correctamente")

except Exception as e:
    print(f"❌ ERROR MongoDB: {e}")
    client = None
    db = None

    users_collection = None
    air_collection = None
    noise_collection = None
    underground_collection = None
