import csv
import requests
from tkinter import Tk, filedialog
import os
from dotenv import load_dotenv

# Cargar variables del archivo .env
load_dotenv()

# Debug: mostrar todas las variables del .env
print("🔍 Variables cargadas del .env:")
print(f"API_BASE: {os.getenv('API_BASE')}")
print(f"MONGO_URI: {os.getenv('MONGO_URI')[:50]}...")  # Mostrar solo parte por seguridad

# API segura con validación
API_BASE = os.getenv("API_BASE")
if API_BASE is None:
    print("❌ ERROR: API_BASE no encontrada en .env")
    print("💡 Asegúrate de que tu archivo .env tenga: API_BASE=http://127.0.0.1:8000")
    exit()

API = API_BASE + "/api/data/air"
print(f"✅ URL final de la API: {API}")

# El resto del código permanece igual...
REQUIRED_COLUMNS = [
    "deviceInfo.deviceName",
    "time",
    "object.co2",
    "object.temperature",
    "object.humidity",
    "object.pressure",
    "object.battery"
]

def select_csv():
    Tk().withdraw()
    path = filedialog.askopenfilename(
        title="Selecciona el CSV EM500-CO2",
        filetypes=[("CSV files", "*.csv")]
    )
    return path

def to_float(v):
    try:
        return float(v)
    except:
        return None

def run_etl():
    print("\n=== ETL AIRE (EM500-CO2) ===\n")

    csv_file = select_csv()
    if not csv_file:
        print("❌ No seleccionaste archivo")
        return

    print(f"📄 Archivo seleccionado: {csv_file}")

    # preguntar límite
    try:
        limit = input("\n¿Cuántos registros insertar? (default = 50): ")
        limit = int(limit) if limit.strip() else 50
    except:
        limit = 50

    print(f"\n→ Se insertarán como máximo {limit} registros.\n")

    with open(csv_file, encoding="utf-8") as f:
        reader = csv.DictReader(f)

        # validar columnas
        missing = [c for c in REQUIRED_COLUMNS if c not in reader.fieldnames]
        if missing:
            print("❌ ERROR: faltan columnas en el CSV:")
            for c in missing:
                print(" -", c)
            print("\n👉 Columnas encontradas:")
            print(reader.fieldnames)
            return

        print("CSV válido ✓\n")

        total_ok, total_err = 0, 0

        for i, row in enumerate(reader, start=1):

            if total_ok >= limit:
                print("\n🚫 Límite alcanzado, deteniendo ETL.")
                break

            payload = {
                "sensor_id": row["deviceInfo.deviceName"],
                "time": row["time"],
                "co2": to_float(row["object.co2"]),
                "temperature": to_float(row["object.temperature"]),
                "humidity": to_float(row["object.humidity"]),
                "pressure": to_float(row["object.pressure"]),
                "battery": to_float(row["object.battery"]),
            }

            # detectar qué campo está vacío
            missing_fields = [k for k, v in payload.items() if v is None]
            if missing_fields:
                print(f"Fila {i} incompleta → saltada. Campos vacíos: {missing_fields}")
                total_err += 1
                continue

            # enviar a la API
            try:
                res = requests.post(API, json=payload)

                if res.status_code == 200:
                    total_ok += 1
                    print(f"✓ Insertado fila {i}  (total: {total_ok})")
                else:
                    total_err += 1
                    print(f"❌ Error en fila {i}: {res.text}")

            except Exception as e:
                total_err += 1
                print(f"⚠ EXCEPCIÓN fila {i}: {e}")

    print("\n-----------------------------------")
    print("TOTAL INSERTADOS:", total_ok)
    print("TOTAL ERRORES:", total_err)
    print("-----------------------------------")

if __name__ == "__main__":
    run_etl()