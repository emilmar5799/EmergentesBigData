import time
import random
import json
from kafka import KafkaProducer

BROKER = "localhost:9092"
TOPIC = "simulador_datos"

def start_simulator():
    producer = KafkaProducer(
        bootstrap_servers=BROKER,
        value_serializer=lambda v: json.dumps(v).encode('utf-8')
    )
    while True:
        data = {
            "sensor_id": random.randint(1, 5),
            "temperatura": round(random.uniform(18.0, 35.0), 2),
            "humedad": round(random.uniform(40, 90), 2),
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
        }
        producer.send(TOPIC, value=data)
        producer.flush()
        print(f"📡 Enviado a Kafka: {data}")
        time.sleep(3)

if __name__ == "__main__":
    start_simulator()
