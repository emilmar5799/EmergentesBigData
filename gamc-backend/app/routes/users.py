# app/routes/users.py

from fastapi import APIRouter, HTTPException
from bson import ObjectId

from app.db.mongo_conn import users_collection
from app.utils.security import hash_password

router = APIRouter()


# ================================
# 📌 Crear usuario (POST)
# ================================
@router.post("/")
def create_user(user: dict):

    # Validar email duplicado
    email_exist = users_collection.find_one({"email": user["email"]})
    if email_exist:
        raise HTTPException(status_code=400, detail="El correo ya está registrado")

    # Hashear contraseña
    user["password"] = hash_password(user["password"])

    result = users_collection.insert_one(user)

    return {
        "id": str(result.inserted_id),
        "message": "Usuario creado correctamente"
    }


# ================================
# 📌 Obtener todos los usuarios (GET)
# ================================
@router.get("/")
def get_users():
    users = []
    for user in users_collection.find():
        users.append({
            "id": str(user["_id"]),
            "full_name": user.get("full_name"),
            "email": user.get("email"),
            "role": user.get("role"),
            "activo": user.get("activo", True)
        })
    return users


# ================================
# 📌 Actualizar usuario (PUT)
# ================================
@router.put("/{user_id}")
def update_user(user_id: str, data: dict):

    # Si actualiza contraseña → la hasheamos
    if "password" in data:
        data["password"] = hash_password(data["password"])

    result = users_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    return {"message": "Usuario actualizado correctamente"}


# ================================
# 📌 Eliminar usuario (DELETE)
# ================================
@router.delete("/{user_id}")
def delete_user(user_id: str):
    result = users_collection.delete_one({"_id": ObjectId(user_id)})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    return {"message": "Usuario eliminado"}
