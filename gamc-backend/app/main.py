from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
from app.routes.auth import router as auth_router
from app.routes.users import router as users_router
from app.routes.data import router as data_router
from app.routes.simular import router as simular_router
from app.routes.underground_predict import router as underground_predict_router

app.include_router(auth_router, prefix="/api/auth")
app.include_router(users_router, prefix="/api/users")
app.include_router(data_router, prefix="/api/data")
app.include_router(simular_router, prefix="/api/simular")
app.include_router(underground_predict_router, prefix="/api/underground")
