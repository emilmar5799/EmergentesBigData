from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Any
import subprocess
import os

from app.db.mongo_conn import (
    air_collection,
    noise_collection,
    underground_collection
)

from app.utils.mongo_serializer import serialize_doc

router = APIRouter(tags=["Data"])

# ======================================================
# MODELOS Pydantic ULTRA FLEXIBLES
# ======================================================

class AirInput(BaseModel):
    sensor_id: str
    time: Any  # Acepta cualquier tipo
    co2: Optional[Any] = None
    temperature: Optional[Any] = None
    humidity: Optional[Any] = None
    pressure: Optional[Any] = None
    battery: Optional[Any] = None

    class Config:
        extra = "allow"  # Permite campos extra

class NoiseInput(BaseModel):
    sensor_id: str
    time: Any
    laeq: Optional[Any] = None
    lai: Optional[Any] = None
    lai_max: Optional[Any] = None
    battery: Optional[Any] = None
    status: Optional[str] = None

    class Config:
        extra = "allow"

class UndergroundInput(BaseModel):
    sensor_id: str
    time: Any
    distance: Optional[Any] = None
    position: Optional[str] = None
    battery: Optional[Any] = None
    status: Optional[str] = None

    class Config:
        extra = "allow"

# ======================================================
# ENDPOINTS AIRE - VERSIÓN MÁS FLEXIBLE
# ======================================================

@router.post("/air")
def create_air(data: AirInput):
    try:
        # Convertir y limpiar datos
        data_dict = data.dict()
        
        # Función para convertir valores
        def clean_value(value):
            if value is None or value == "":
                return None
            try:
                return float(value)
            except (TypeError, ValueError):
                return value
        
        # Limpiar todos los valores numéricos
        clean_data = {}
        for key, value in data_dict.items():
            if key in ['co2', 'temperature', 'humidity', 'pressure', 'battery']:
                clean_data[key] = clean_value(value)
            else:
                clean_data[key] = value
        
        # Remover campos None
        clean_data = {k: v for k, v in clean_data.items() if v is not None}
        
        print(f"📥 Insertando datos: {clean_data}")  # Debug
        
        result = air_collection.insert_one(clean_data)
        return {"message": "Lectura de aire guardada", "id": str(result.inserted_id)}
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")  # Debug
        raise HTTPException(status_code=500, detail=f"Error guardando datos: {str(e)}")

# Los otros endpoints permanecen igual...
@router.get("/air")
def get_all_air():
    docs = list(air_collection.find().sort("time", -1))
    return [serialize_doc(d) for d in docs]

@router.get("/air/latest")
def get_air_latest(limit: int = 20):
    if limit > 100:
        limit = 100
    docs = list(air_collection.find().sort("time", -1).limit(limit))
    return [serialize_doc(d) for d in docs]

# ======================================================
# ENDPOINTS SONIDO
# ======================================================

@router.post("/noise")
def create_noise(data: NoiseInput):
    try:
        data_dict = data.dict()
        clean_data = {k: v for k, v in data_dict.items() if v is not None}
        
        result = noise_collection.insert_one(clean_data)
        return {"message": "Lectura de sonido guardada", "id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error guardando datos: {str(e)}")

@router.get("/noise")
def get_all_noise():
    docs = list(noise_collection.find().sort("time", -1))
    return [serialize_doc(d) for d in docs]

@router.get("/noise/latest")
def get_noise_latest(limit: int = 20):
    if limit > 100:
        limit = 100
    docs = list(noise_collection.find().sort("time", -1).limit(limit))
    return [serialize_doc(d) for d in docs]

# ======================================================
# ENDPOINTS SOTERRADO
# ======================================================

@router.post("/underground")
def create_underground(data: UndergroundInput):
    try:
        data_dict = data.dict()
        clean_data = {k: v for k, v in data_dict.items() if v is not None}
        
        result = underground_collection.insert_one(clean_data)
        return {"message": "Lectura soterrada guardada", "id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error guardando datos: {str(e)}")

@router.get("/underground")
def get_all_underground():
    docs = list(underground_collection.find().sort("time", -1))
    return [serialize_doc(d) for d in docs]

@router.get("/underground/latest")
def get_underground_latest(limit: int = 20):
    if limit > 100:
        limit = 100
    docs = list(underground_collection.find().sort("time", -1).limit(limit))
    return [serialize_doc(d) for d in docs]

# ======================================================
# ENDPOINTS ETL
# ======================================================

@router.post("/etl/{etl_type}")
async def run_etl(etl_type: str, background_tasks: BackgroundTasks):
    etl_scripts = {
        "air": "etl/etl_air.py",
        "noise": "etl/etl_noise.py", 
        "underground": "etl/etl_underground.py"
    }
    
    if etl_type not in etl_scripts:
        raise HTTPException(status_code=400, detail="Tipo de ETL no válido")
    
    script_path = etl_scripts[etl_type]
    
    if not os.path.exists(script_path):
        raise HTTPException(status_code=404, detail="Script ETL no encontrado")
    
    def execute_etl():
        try:
            result = subprocess.run(
                ["python", script_path],
                capture_output=True,
                text=True,
                timeout=120
            )
            
            if result.returncode != 0:
                print(f"❌ Error en ETL {etl_type}: {result.stderr}")
            else:
                print(f"✅ ETL {etl_type} ejecutado correctamente")
                
        except subprocess.TimeoutExpired:
            print(f"❌ ETL {etl_type} tardó demasiado tiempo")
        except Exception as e:
            print(f"❌ Error ejecutando ETL {etl_type}: {str(e)}")
    
    background_tasks.add_task(execute_etl)
    
    return {"message": f"ETL {etl_type} iniciado en segundo plano"}