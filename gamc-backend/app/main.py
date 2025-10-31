from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, data, users
from app.services.kafka_service import create_topic

# --- Inicializar aplicación FastAPI ---
app = FastAPI(title="GAMC Backend API", version="1.0.0")

# --- Configurar CORS (para permitir conexión con tu frontend) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Puedes restringir a tu frontend real, ej. ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Registrar las rutas principales ---
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(data.router, prefix="/api/data", tags=["Data"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])

# --- Ruta de prueba ---
@app.get("/")
def root():
    return {"message": "🚀 GAMC Backend funcionando correctamente"}

# --- Evento al iniciar FastAPI ---
@app.on_event("startup")
async def startup_event():
    """
    Se ejecuta automáticamente al iniciar el servidor FastAPI.
    Crea el topic en Kafka si no existe.
    """
    print("🔄 Verificando conexión a Kafka...")
    try:
        create_topic()
        print("✅ Kafka topic 'simulador_datos' configurado correctamente.")
    except Exception as e:
        print(f"⚠️ Error al conectar con Kafka: {e}")
