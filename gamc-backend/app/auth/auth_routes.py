from functools import wraps
from flask import Blueprint, request, jsonify, g
from bson import ObjectId
from .security_utils import hash_password, verify_password, encode_auth_token, decode_auth_token

# Blueprint para organizar las rutas
auth_bp = Blueprint('auth', __name__)

# ===================================
# MIDDLEWARE DE PROTECCIÓN (DECORATOR)
# ===================================
def protect(f):
    """Decorator para asegurar que la ruta solo sea accesible con un JWT válido."""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        
        if not auth_header:
            return jsonify({'message': 'Acceso denegado: No se proporcionó token.'}), 401

        # Decodificar y verificar el token
        decoded_payload = decode_auth_token(auth_header)
        
        if not decoded_payload:
            return jsonify({'message': 'Acceso denegado: Token inválido o expirado.'}), 401
        
        # Almacenar la información del usuario en el objeto global 'g' de Flask
        g.user = decoded_payload 
        
        return f(*args, **kwargs)
    return decorated_function

def restrict_to(allowed_roles):
    """Decorator para restringir el acceso a la ruta basado en el rol del usuario."""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            # Verificar si el rol del usuario está en la lista de roles permitidos
            if g.user['role'] not in allowed_roles:
                return jsonify({'message': 'Acceso denegado: No tiene los permisos necesarios.'}), 403
            
            return f(*args, **kwargs)
        return decorated_function
    return decorator

# ===================================
# RUTA DE REGISTRO (/api/auth/register)
# ===================================
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    full_name = data.get('full_name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'USUARIO') # Por defecto 'USUARIO'
    
    if not all([full_name, email, password]):
        return jsonify({'message': 'Faltan campos obligatorios.'}), 400
        
    # Accedemos a la colección de MongoDB a través del Blueprint
    users_collection = auth_bp.users_collection 
    
    try:
        password_hash = hash_password(password)
        
        user_data = {
            "full_name": full_name,
            "email": email,
            "password_hash": password_hash,
            "role": role,
        }
        
        result = users_collection.insert_one(user_data)
        
        return jsonify({
            'message': 'Usuario registrado exitosamente',
            'user': {
                'id': str(result.inserted_id),
                'email': email,
                'role': role
            }
        }), 201
        
    except Exception as e:
        # Código de error para índice duplicado
        if "E11000" in str(e):
            return jsonify({'message': 'El correo electrónico ya está en uso.'}), 400
        return jsonify({'message': f'Error interno del servidor.'}), 500

# ===================================
# RUTA DE LOGIN (/api/auth/login)
# ===================================
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not all([email, password]):
        return jsonify({'message': 'Faltan campos obligatorios.'}), 400

    # Accedemos a la colección de MongoDB a través del Blueprint
    users_collection = auth_bp.users_collection 
    
    user = users_collection.find_one({'email': email})

    if user and verify_password(password, user['password_hash']):
        user_id = str(user['_id'])
        token = encode_auth_token(user_id, user['role'])
        
        return jsonify({
            'message': 'Login exitoso',
            'token': token,
            'user': {
                'id': user_id,
                'full_name': user.get('full_name'),
                'email': user['email'],
                'role': user['role']
            }
        }), 200
    else:
        return jsonify({'message': 'Credenciales inválidas (email o contraseña incorrectos).'}), 401

# ===================================
# RUTAS DE PRUEBA PROTEGIDAS
# ===================================

@auth_bp.route('/profile', methods=['GET'])
@protect
def profile():
    return jsonify({
        'message': 'Acceso al perfil exitoso.',
        'data': f"Bienvenido, {g.user['role']}. Tu ID es {g.user['user_id']}"
    }), 200

@auth_bp.route('/admin-dashboard', methods=['GET'])
@protect
@restrict_to(['ALCALDE_GAMC', 'ADMIN_SISTEMA'])
def admin_dashboard():
    return jsonify({
        'message': f"Acceso concedido al panel administrativo. Rol: {g.user['role']}",
        'content': 'Datos sensibles de administración.'
    }), 200