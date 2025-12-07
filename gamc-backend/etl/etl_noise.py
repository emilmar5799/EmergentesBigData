import csv
import requests
from tkinter import Tk, filedialog
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

API = API_BASE + "/api/data/noise"
print(f"🔗 Conectando a: {API}")

required_columns = [
    "deviceInfo.deviceName",
    "time",
    "object.LAeq",
    "object.LAI",
    "object.LAImax",
    "object.battery",
]

def select_csv_file():
    Tk().withdraw()
    return filedialog.askopenfilename(
        title="Selecciona el CSV de Sonido WS302",
        filetypes=[("CSV files", "*.csv")]
    )

print("\n=== ETL SONIDO (WS302) ===\n")

CSV_FILE = select_csv_file()

if not CSV_FILE:
    print("❌ No seleccionaste archivo.")
    exit()

print(f"📄 Archivo seleccionado: {CSV_FILE}\n")

try:
    limit_input = input("¿Cuántos registros deseas insertar? (Default = 10): ")
    LIMIT = int(limit_input) if limit_input.strip() else 10
except:
    LIMIT = 10

print(f"\n→ Se insertarán como máximo {LIMIT} registros.\n")
print("Validando archivo...\n")

with open(CSV_FILE, encoding="utf-8") as f:
    reader = csv.DictReader(f)

    # validar columnas
    missing_columns = [col for col in required_columns if col not in reader.fieldnames]
    if missing_columns:
        print("❌ ERROR: Faltan columnas en CSV:")
        for col in missing_columns:
            print(f" - {col}")
        print("\n👉 Columnas encontradas:")
        print(reader.fieldnames)
        exit()

    print("CSV válido ✓\n")
    total = 0
    errores = 0

    for i, row in enumerate(reader, start=1):

        if total >= LIMIT:
            print("\n🚫 Límite alcanzado. ETL detenido.")
            break

        # Filas vacías
        if not row["deviceInfo.deviceName"] or not row["time"]:
            print(f"Fila {i} vacía → saltada")
            errores += 1
            continue

        try:
            payload = {
                "sensor_id": row["deviceInfo.deviceName"],
                "time": row["time"],
                "laeq": float(row["object.LAeq"]) if row["object.LAeq"] else None,
                "lai": float(row["object.LAI"]) if row["object.LAI"] else None,
                "lai_max": float(row["object.LAImax"]) if row["object.LAImax"] else None,
                "battery": float(row["object.battery"]) if row["object.battery"] else None,
            }

            # Verificar campos vacíos
            missing_fields = [key for key, value in payload.items() if value is None]
            if missing_fields:
                print(f"Fila {i} incompleta → saltada. Campos vacíos: {missing_fields}")
                errores += 1
                continue

            res = requests.post(API, json=payload)

            if res.status_code == 200:
                total += 1
                print(f"✓ Insertado fila {i}  (total: {total})")
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