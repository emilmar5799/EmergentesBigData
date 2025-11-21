import os
from dotenv import load_dotenv
from flask import Flask
from pymongo import MongoClient

# Cargar variables de entorno del archivo .env
load_dotenv()

app = Flask(__name__)

# --- CONFIGURACIÓN DE DB ---
MONGO_URI = os.getenv("MONGO_URI")
# Variable global para la colección de usuarios (usada en auth_routes.py)
users_collection = None 

try:
    client = MongoClient(MONGO_URI)
    # Seleccionamos la base de datos (EmergentesDb)
    db = client.get_database(name='EmergentesDb')
    # ASIGNAMOS la colección 'users' a la variable global
    users_collection = db['users'] 
    print("✅ Conexión exitosa a MongoDB con PyMongo.")
    
    # Asegurar el índice único en el campo 'email'
    users_collection.create_index("email", unique=True)
    
except Exception as e:
    print(f"❌ Error de conexión a MongoDB: {e}")
    # Salimos del proceso si no podemos conectar a la DB
    exit(1)

# Cargar el resto de las variables de entorno
app.config['JWT_SECRET'] = os.getenv("JWT_SECRET")
app.config['JWT_ALGORITHM'] = os.getenv("JWT_ALGORITHM")
app.config['JWT_EXPIRATION_SECONDS'] = int(os.getenv("JWT_EXPIRATION_SECONDS"))

# --- REGISTRO DE RUTAS ---
# Importar el blueprint de las rutas de autenticación
# Nota: La ruta de importación es 'app.auth.auth_routes'
from app.auth.auth_routes import auth_bp
auth_bp.users_collection = users_collection
app.register_blueprint(auth_bp, url_prefix='/api/auth')


# Ruta de prueba
@app.route('/')
def home():
    return "Servidor Flask funcionando. La DB está conectada. Usa /api/auth/..."

if __name__ == '__main__':
    # Flask correrá en el puerto 5000
    app.run(host='0.0.0.0', port=5000, debug=True)