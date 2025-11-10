import pandas as pd
import json
import random
from datetime import datetime, timezone
import os

# Carpeta donde está este archivo
BASE_DIR = os.path.dirname(__file__)

# Archivo CSV relativo al script
INPUT_CSV_FILE = os.path.join(BASE_DIR, "datosSonido.csv")
# --- CONFIGURACIÓN DE ARCHIVOS ---
INPUT_CSV_FILE = 'Simulador/SimuladorSonido/datosSonido.csv'
OUTPUT_JSON_FILE = 'simulacion_datos_nuevos.json'

COLUMNA_SONIDO = 'object.LAeq'
COLUMNA_BATERIA = 'object.battery'
COLUMNA_STATUS = 'object.status'

# Metadatos fijos para la simulación
SENSOR_INFO = {
    'deviceinfo.tenantName': "Empresa Simulada S.A.",
    'deviceinfo.deviceName': "Sensor-API-002",
    'deviceinfo.Tag.Address': "API_Endpoint_Simulado",
    'Object.laiMax': 0.0 
}

# Rangos
RANGOS = {
    'LAEQ_MIN': 0.0, 'LAEQ_MAX': 0.0, 
    'BATTERY_MIN': 0, 'BATTERY_MAX': 0
}

# ----------------------------------------------------------------------
# PASO 1: LEER EL CSV PARA OBTENER LOS RANGOS
# ----------------------------------------------------------------------
def analizar_rangos_desde_csv():
    """Lee el CSV de entrada y determina los rangos min/max para la simulación."""
    print(f"1️⃣ Analizando el archivo de entrada '{INPUT_CSV_FILE}'...")
    try:
        df = pd.read_csv(INPUT_CSV_FILE, usecols=[COLUMNA_SONIDO, COLUMNA_BATERIA])
        df = df.dropna(subset=[COLUMNA_SONIDO, COLUMNA_BATERIA])
        
        RANGOS['LAEQ_MIN'] = df[COLUMNA_SONIDO].min()
        RANGOS['LAEQ_MAX'] = df[COLUMNA_SONIDO].max()
        RANGOS['BATTERY_MIN'] = df[COLUMNA_BATERIA].min()
        RANGOS['BATTERY_MAX'] = df[COLUMNA_BATERIA].max()
        
        SENSOR_INFO['Object.laiMax'] = RANGOS['LAEQ_MAX']
        print("   ✅ Rangos extraídos correctamente desde el CSV.")
        print(f"   → LAeq: {RANGOS['LAEQ_MIN']} - {RANGOS['LAEQ_MAX']} dB")
        print(f"   → Batería: {RANGOS['BATTERY_MIN']}% - {RANGOS['BATTERY_MAX']}%")
        return RANGOS['LAEQ_MAX'] * 0.8
        
    except FileNotFoundError:
        print(f"❌ Error: El archivo '{INPUT_CSV_FILE}' no fue encontrado. Usando rangos por defecto.")
        RANGOS.update({'LAEQ_MIN': 35.0, 'LAEQ_MAX': 85.0, 'BATTERY_MIN': 70, 'BATTERY_MAX': 100})
        SENSOR_INFO['Object.laiMax'] = 85.0
        return 70.0
    except Exception as e:
        print(f"❌ Error al leer el CSV: {e}")
        exit()

UMBRAL_ALERTA = analizar_rangos_desde_csv()

# ----------------------------------------------------------------------
# PASO 2: FUNCIÓN INTERNA PARA GENERAR UN REGISTRO
# ----------------------------------------------------------------------
def _generar_datos_registro(umbral_alerta):
    """Genera un diccionario de datos simulados usando los rangos reales."""
    laeq = round(random.uniform(RANGOS['LAEQ_MIN'], RANGOS['LAEQ_MAX']), 2)
    lai = round(random.uniform(RANGOS['LAEQ_MIN'], laeq * 0.95), 2)
    
    if laeq < RANGOS['LAEQ_MIN'] * 1.2:
        status = "BAJO"
    elif laeq < umbral_alerta:
        status = "NORMAL"
    else:
        status = "ALERTA"
        
    registro = {
        "Time": datetime.now(timezone.utc).isoformat().replace('+00:00', 'Z'),
        "deviceinfo.deviceName": SENSOR_INFO["deviceinfo.deviceName"],
        "deviceinfo.tenantName": SENSOR_INFO["deviceinfo.tenantName"],
        "deviceinfo.Tag.Address": SENSOR_INFO["deviceinfo.Tag.Address"],
        "Object.laeq": laeq,
        "Object.lai": lai,
        "Object.laiMax": SENSOR_INFO['Object.laiMax'],
        "Object.Battery": random.randint(int(RANGOS['BATTERY_MIN']), int(RANGOS['BATTERY_MAX'])),
        "Object.status": status
    }
    return registro

# ----------------------------------------------------------------------
# PASO 3: FUNCIÓN PRINCIPAL (GUARDA EN JSON)
# ----------------------------------------------------------------------
def generar_y_guardar_un_registro():
    """Genera un registro único, lo anexa al archivo JSON y lo retorna."""
    data_row = _generar_datos_registro(UMBRAL_ALERTA)

    try:
        # Si ya existe el archivo, lo abrimos y cargamos los datos
        if os.path.exists(OUTPUT_JSON_FILE):
            with open(OUTPUT_JSON_FILE, 'r', encoding='utf-8') as f:
                try:
                    data = json.load(f)
                except json.JSONDecodeError:
                    data = []
        else:
            data = []

        # Añadimos el nuevo registro
        data.append(data_row)

        # Guardamos de nuevo el archivo
        with open(OUTPUT_JSON_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)

        print(f"   [Simulador API] Guardado: LAeq={data_row['Object.laeq']} dB, Status={data_row['Object.status']}")
    except Exception as e:
        print(f"❌ Error al guardar en JSON: {e}")

    return data_row

