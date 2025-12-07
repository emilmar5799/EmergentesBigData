# 🚀 EmergentesBigData
## Sistema de tratamiento de datos en tiempo real

Este proyecto implementa un sistema de **procesamiento y análisis de datos en tiempo real** utilizando herramientas de **Big Data** y **Python**, con un servidor desarrollado en **FastAPI** y ejecutado con **Uvicorn**.

---

## 🧠 Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- [Python 3.8 o superior](https://www.python.org/downloads/)
- `pip` (gestor de paquetes de Python)
- Git (opcional, para clonar el repositorio)

---

## ⚙️ Configuración del entorno virtual (Windows)

1. **Crear el entorno virtual:**
   ```bash
   python -m venv venv
Activar el entorno virtual:

bash
Copiar código
.\venv\Scripts\activate
Instalar las dependencias:

bash
Copiar código
pip install -r requirements.txt
(Opcional) Si instalas una nueva librería, actualiza el archivo de dependencias:

bash
Copiar código
pip freeze > requirements.txt
🧩 Ejecución del sistema
Una vez activado el entorno virtual y con las dependencias instaladas, puedes ejecutar el sistema de dos formas:

🟢 Opción 1: Ejecutar el script principal
bash
Copiar código
python main.py
(Sustituye main.py por el nombre del archivo principal de tu proyecto si es diferente.)

🟣 Opción 2: Ejecutar el servidor FastAPI con Uvicorn
bash
Copiar código
uvicorn app.main:app --reload
Esto levantará el servidor localmente y podrás acceder a la aplicación en:
👉 http://127.0.0.1:8000

Para ver la documentación interactiva de la API (Swagger UI):
👉 http://127.0.0.1:8000/docs
