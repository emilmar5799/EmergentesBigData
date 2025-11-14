import pandas as pd
import json
import random
from datetime import datetime, timezone
import os

# ----------------------------
#   CONFIGURACIÓN DE RUTAS
# ----------------------------
BASE_DIR = os.path.dirname(__file__)

INPUT_CSV_FILE = os.path.join(BASE_DIR, "datosSoterrados.csv")
OUTPUT_JSON_FILE = "simulacion_soterrados.json"

# Columnas importantes del CSV original
COL_DISTANCE = "object.distance"
COL_BATTERY = "object.battery"
COL_STATUS = "object.status"
COL_LOCATION = "deviceInfo.tags.Location"

# ----------------------------
#   PARÁMETROS GLOBALES
# ----------------------------
RANGOS = {
    "DIST_MIN": 0.1,
    "DIST_MAX": 4.0,
    "BAT_MIN": 60,
    "BAT_MAX": 100
}

LOCATIONS = []  # lista de coordenadas reales

META_INFO = {
    "deviceinfo.deviceName": "SENSOR-EM310-SIMULADO",
    "deviceinfo.tenantName": "Secretaría de Ciudad Digital",
    "deviceinfo.Tag.Address": "Simulación API",
    "deviceinfo.Tag.Description": "Sensor de nivel de líquido (simulado)"
}

# ------------------------------------------------------------
# PASO 1: LEER CSV → OBTENER RANGOS Y COORDENADAS REALES
# ------------------------------------------------------------
def analizar_rangos_csv():
    print(f"1️⃣ Leyendo CSV de soterrados → {INPUT_CSV_FILE}")

    try:
        df = pd.read_csv(INPUT_CSV_FILE)

        # Distancia (si existe)
        if COL_DISTANCE in df.columns:
            df = df.dropna(subset=[COL_DISTANCE])
            RANGOS["DIST_MIN"] = max(0.05, df[COL_DISTANCE].min())
            RANGOS["DIST_MAX"] = min(4.0, df[COL_DISTANCE].max())

        # Batería
        if COL_BATTERY in df.columns:
            df = df.dropna(subset=[COL_BATTERY])
            RANGOS["BAT_MIN"] = max(20, df[COL_BATTERY].min())
            RANGOS["BAT_MAX"] = min(100, df[COL_BATTERY].max())

        # Coordenadas reales
        if COL_LOCATION in df.columns:
            for loc in df[COL_LOCATION].dropna().unique():
                try:
                    lat, lng = loc.replace('"', '').split(",")
                    LOCATIONS.append((float(lat), float(lng)))
                except:
                    pass

        print("   ✓ Rangos establecidos:")
        print(f"     → Distancia: {RANGOS['DIST_MIN']}m – {RANGOS['DIST_MAX']}m")
        print(f"     → Batería: {RANGOS['BAT_MIN']}% – {RANGOS['BAT_MAX']}%")
        print(f"     → Coordenadas reales encontradas: {len(LOCATIONS)}")

    except Exception as e:
        print("⚠ Error leyendo CSV, usando valores por defecto.")
        print(e)

analizar_rangos_csv()

# ------------------------------------------------------------
# PASO 2: GENERAR UN REGISTRO SIMULADO
# ------------------------------------------------------------
def generar_registro_soterrado():
    distancia = round(random.uniform(RANGOS["DIST_MIN"], RANGOS["DIST_MAX"]), 2)
    
    # reglas de estado según distancia
    if distancia > 2.5:
        status = "BAJO"
    elif distancia > 1.0:
        status = "NORMAL"
    else:
        status = "ALTO"

    # tomar coordenadas reales
    if LOCATIONS:
        lat, lng = random.choice(LOCATIONS)
    else:
        lat, lng = -17.38, -66.15  # fallback

    registro = {
        "Time": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "object.distance": distancia,
        "object.position": "OK",
        "object.battery": random.randint(RANGOS["BAT_MIN"], RANGOS["BAT_MAX"]),
        "object.status": status,
        "lat": lat,
        "lng": lng,
        **META_INFO
    }

    return registro

# ------------------------------------------------------------
# PASO 3: GUARDAR EN JSON
# ------------------------------------------------------------
def generar_y_guardar_un_registro():
    data = generar_registro_soterrado()

    try:
        if os.path.exists(OUTPUT_JSON_FILE):
            with open(OUTPUT_JSON_FILE, "r", encoding="utf-8") as f:
                try:
                    contenido = json.load(f)
                except:
                    contenido = []
        else:
            contenido = []

        contenido.append(data)

        with open(OUTPUT_JSON_FILE, "w", encoding="utf-8") as f:
            json.dump(contenido, f, indent=4, ensure_ascii=False)

        print(f"   [Simulador Soterrado] Dist: {data['object.distance']}m | Estado: {data['object.status']}")

    except Exception as e:
        print("❌ Error guardando JSON:", e)

    return data
