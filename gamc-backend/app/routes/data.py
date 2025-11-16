from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

from app.db.mongo_conn import (
    air_collection,
    noise_collection,
    underground_collection
)

from app.utils.mongo_serializer import serialize_doc


router = APIRouter(tags=["Data"])


# ======================================================
# MODELOS Pydantic
# ======================================================

class AirInput(BaseModel):
    sensor_id: str
    time: datetime
    co2: float
    temperature: float
    humidity: float
    pressure: Optional[float] = None
    battery: Optional[float] = None


class NoiseInput(BaseModel):
    sensor_id: str
    time: datetime
    laeq: float
    lai: Optional[float] = None
    lai_max: Optional[float] = None
    battery: Optional[float] = None
    status: Optional[str] = None


class UndergroundInput(BaseModel):
    sensor_id: str
    time: datetime
    distance: float
    position: Optional[str] = None
    battery: Optional[float] = None
    status: Optional[str] = None


# ======================================================
# ENDPOINTS AIRE
# ======================================================

@router.post("/air")
def create_air(data: AirInput):
    result = air_collection.insert_one(data.dict())
    return {"message": "Lectura de aire guardada", "id": str(result.inserted_id)}


@router.get("/air")
def get_all_air():
    docs = list(air_collection.find().sort("time", -1))
    return [serialize_doc(d) for d in docs]


@router.get("/air/latest")
def get_air_latest(limit: int = 20):
    docs = list(air_collection.find().sort("time", -1).limit(limit))
    return [serialize_doc(d) for d in docs]


# ======================================================
# ENDPOINTS SONIDO
# ======================================================

@router.post("/noise")
def create_noise(data: NoiseInput):
    result = noise_collection.insert_one(data.dict())
    return {"message": "Lectura de sonido guardada", "id": str(result.inserted_id)}


@router.get("/noise")
def get_all_noise():
    docs = list(noise_collection.find().sort("time", -1))
    return [serialize_doc(d) for d in docs]


@router.get("/noise/latest")
def get_noise_latest(limit: int = 20):
    docs = list(noise_collection.find().sort("time", -1).limit(limit))
    return [serialize_doc(d) for d in docs]


# ======================================================
# ENDPOINTS SOTERRADO
# ======================================================

@router.post("/underground")
def create_underground(data: UndergroundInput):
    result = underground_collection.insert_one(data.dict())
    return {"message": "Lectura soterrada guardada", "id": str(result.inserted_id)}


@router.get("/underground")
def get_all_underground():
    docs = list(underground_collection.find().sort("time", -1))
    return [serialize_doc(d) for d in docs]


@router.get("/underground/latest")
def get_underground_latest(limit: int = 20):
    docs = list(underground_collection.find().sort("time", -1).limit(limit))
    return [serialize_doc(d) for d in docs]
