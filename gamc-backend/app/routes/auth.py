from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.db.mongo_conn import users_collection
from app.utils.security import verify_password, create_token

router = APIRouter(tags=["Auth"])

class LoginInput(BaseModel):
    email: str
    password: str

@router.post("/login")
def login(data: LoginInput):
    email = data.email
    password = data.password

    user = users_collection.find_one({"email": email})

    if not user:
        raise HTTPException(status_code=401, detail="Credenciales inválidas (email no existe)")

    if not verify_password(password, user["password"]):
        raise HTTPException(status_code=401, detail="Credenciales inválidas (password incorrecto)")

    token = create_token({"user_id": str(user["_id"])})

    return {
        "message": "Login correcto",
        "token": token,
        "user": {
            "id": str(user["_id"]),
            "name": user.get("name", "Sin nombre"),   # ← YA NO CRASHEA
            "email": user["email"],
            "role": user.get("role", "USUARIO")       # ← Opcional pero recomendado
        }
    }
