from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, data, users

app = FastAPI(title="GAMC Backend API", version="1.0.0")

# 🔓 Permitir acceso desde tu frontend (React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # puedes cambiarlo luego a ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🧭 Registrar rutas
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(data.router, prefix="/api/data", tags=["Data"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])

@app.get("/")
def root():
    return {"message": "🚀 GAMC Backend funcionando correctamente"}
