from fastapi import APIRouter

router = APIRouter()

@router.post("/login")
def login(username: str, password: str):
    if username == "admin" and password == "1234":
        return {"token": "abc123", "message": "Inicio de sesión exitoso"}
    return {"error": "Credenciales inválidas"}
