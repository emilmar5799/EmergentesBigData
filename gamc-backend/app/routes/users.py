from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_users():
    return [
        {"id": 1, "nombre": "Pablo Guzman", "rol": "Admin"},
        {"id": 2, "nombre": "Valeria Ovando", "rol": "Viewer"}
    ]
