import csv
import requests
from tkinter import Tk
from tkinter.filedialog import askopenfilename
import os
from dotenv import load_dotenv  # Importar para cargar el .env

# Cargar variables del archivo .env
load_dotenv()

# Obtener API_BASE con valor por defecto
API_BASE = os.getenv("API_BASE")
if API_BASE is None:
    print("❌ ERROR: No se encontró API_BASE en el archivo .env")
    print("💡 Asegúrate de tener un archivo .env con: API_BASE=http://127.0.0.1:8000")
    exit()

API = API_BASE + "/api/data/underground"
print(f"🔗 Conectando a: {API}")

required_columns = [
    "deviceInfo.deviceName",
    "time",
    "object.distance",
    "object.position",
    "object.battery"
]

print("\n=== ETL SOTERRADOS (EM310 UDL) ===\n")

# Seleccionar CSV
Tk().withdraw()
CSV_FILE = askopenfilename(
    title="Selecciona el archivo CSV del EM310-UDL",
    filetypes=[("CSV files", "*.csv")]
)

if not CSV_FILE:
    print("❌ No seleccionaste ningún archivo.")
    exit()

print(f"📄 Archivo seleccionado: {CSV_FILE}")

# Límite de registros
try:
    limit = input("\n¿Cuántos registros deseas insertar? (Default = 10): ")
    limit = int(limit) if limit.strip() else 10
except:
    limit = 10

print(f"\n→ Se insertarán como máximo {limit} registros.\n")
print("Validando archivo...\n")

with open(CSV_FILE, encoding="utf-8") as f:
    reader = csv.DictReader(f)

    # Validación de columnas
    missing_columns = [col for col in required_columns if col not in reader.fieldnames]
    if missing_columns:
        print("❌ ERROR: Faltan columnas en CSV:")
        for col in missing_columns:
            print(f" - {col}")
        print("\n👉 Tu CSV tiene estas columnas:")
        print(reader.fieldnames)
        exit()

    print("CSV válido ✓\n")

    total = 0
    errores = 0

    for i, row in enumerate(reader, start=1):

        if total >= limit:
            print("\n🚫 Límite alcanzado, deteniendo ETL.\n")
            break

        try:
            payload = {
                "sensor_id": row["deviceInfo.deviceName"],
                "time": row["time"],
                "distance": float(row["object.distance"]) if row["object.distance"] else None,
                "position": row["object.position"],
                "battery": float(row["object.battery"]) if row["object.battery"] else None
            }

            # Validar valores críticos
            if payload["distance"] is None or payload["battery"] is None:
                missing_fields = []
                if payload["distance"] is None:
                    missing_fields.append("distance")
                if payload["battery"] is None:
                    missing_fields.append("battery")
                print(f"Fila {i} incompleta → saltada. Campos vacíos: {missing_fields}")
                errores += 1
                continue

            res = requests.post(API, json=payload)

            if res.status_code == 200:
                total += 1
                print(f"✓ Insertado fila {i} (total: {total})")
            else:
                errores += 1
                print(f"❌ Error en fila {i}: {res.status_code} - {res.text}")

        except Exception as e:
            errores += 1
            print(f"❌ EXCEPCIÓN en fila {i}: {e}")

print("\n--------------------------------")
print("TOTAL INSERTADOS:", total)
print("TOTAL ERRORES:", errores)
print("--------------------------------")