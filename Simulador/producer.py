import json
import time
import random
from kafka import KafkaProducer
from kafka.errors import NoBrokersAvailable
from datetime import datetime, UTC
import uuid

AIR_SENSORS = ["EMS-6500", "EMS-6962", "EMS-6968", "EMS-6993"]
NOISE_SENSORS = ["SLS-2648", "SLS-3164", "SLS-8588", "SLS-8654", "SLS-8852"]
UNDER_SENSORS = ["UDS-7097", "UDS-8479", "UDS-8653", "UDS-9929"]

def connect_kafka():
    while True:
        try:
            print("Intentando conectar con Kafka...")
            producer = KafkaProducer(
                bootstrap_servers=["kafka:9092"],
                value_serializer=lambda v: json.dumps(v).encode("utf-8"),
                api_version=(2, 5, 0)
            )
            print("✔ Conectado a Kafka!")
            return producer
        except NoBrokersAvailable:
            print("❌ Kafka no está listo aún. Reintentando en 5 segundos...")
            time.sleep(5)

producer = connect_kafka()

def generate_air():
    return {
        "_id": str(uuid.uuid4()),
        "sensor_id": random.choice(AIR_SENSORS),
        "time": datetime.now(UTC).isoformat(),
        "co2": random.randint(350, 1200),
        "temperature": round(random.uniform(20, 35), 1),
        "humidity": random.randint(20, 60),
        "pressure": round(random.uniform(700, 760), 1),
        "battery": random.randint(50, 100),
    }

def generate_noise():
    return {
        "_id": str(uuid.uuid4()),
        "sensor_id": random.choice(NOISE_SENSORS),
        "time": datetime.now(UTC).isoformat(),
        "laeq": round(random.uniform(40, 80), 1),
        "lai": round(random.uniform(40, 70), 1),
        "lai_max": round(random.uniform(70, 95), 1),
        "battery": random.randint(50, 100),
        "status": None,
    }

def generate_underground():
    return {
        "_id": str(uuid.uuid4()),
        "sensor_id": random.choice(UNDER_SENSORS),
        "time": datetime.now(UTC).isoformat(),
        "distance": round(random.uniform(0, 50), 1),
        "position": "normal",
        "battery": random.randint(50, 100),
        "status": None,
    }

while True:
    producer.send("air_topic", generate_air())
    producer.send("noise_topic", generate_noise())
    producer.send("und_topic", generate_underground())

    print("Datos enviados...")
    time.sleep(1)
