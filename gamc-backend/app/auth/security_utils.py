import jwt
import os
from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext

# --- CAMBIO FINAL: Usar SHA256 (Máxima compatibilidad en todos los entornos) ---
# Esto evita los problemas de compilación que causaban el error 500 con Argon2/Bcrypt.
pwd_context = CryptContext(schemes=["sha256_crypt"], deprecated="auto")

# --- HASHING DE CONTRASEÑAS ---

def hash_password(password: str) -> str:
    """Hashea una contraseña para guardarla en la base de datos."""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifica una contraseña plana contra su versión hasheada."""
    return pwd_context.verify(plain_password, hashed_password)

# --- MANEJO DE JWT ---

def encode_auth_token(user_id, role) -> str:
    """Genera el token de autenticación JWT."""
    secret = os.getenv('JWT_SECRET')
    algorithm = os.getenv('JWT_ALGORITHM')
    # Se convierte a int por si se leyó como string desde .env
    expiration = int(os.getenv('JWT_EXPIRATION_SECONDS'))
    
    payload = {
        'exp': datetime.now(timezone.utc) + timedelta(seconds=expiration),
        'iat': datetime.now(timezone.utc),
        'sub': str(user_id), # ID del usuario
        'role': role
    }
    
    return jwt.encode(payload, secret, algorithm=algorithm)

def decode_auth_token(auth_token: str) -> dict | None:
    """Decodifica el token de autenticación JWT."""
    secret = os.getenv('JWT_SECRET')
    algorithm = os.getenv('JWT_ALGORITHM')
    
    try:
        # Extraer el token si viene en formato "Bearer token"
        if auth_token.startswith('Bearer '):
            auth_token = auth_token.split(' ')[1]

        payload = jwt.decode(auth_token, secret, algorithms=[algorithm])
        
        # Devolvemos el ID y el rol del usuario
        return {'user_id': payload['sub'], 'role': payload['role']}
    
    except jwt.ExpiredSignatureError:
        # El token ya no es válido por tiempo
        return None
    except jwt.InvalidTokenError:
        # El token es incorrecto (clave, formato, etc.)
        return None