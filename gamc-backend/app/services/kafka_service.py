from kafka import KafkaAdminClient, KafkaProducer, KafkaConsumer
from kafka.admin import NewTopic
import json

BROKER = "localhost:9092"
TOPIC = "simulador_datos"

def create_topic():
    """
    Crea el topic simulador_datos si no existe.
    """
    admin = KafkaAdminClient(bootstrap_servers=BROKER)
    topic = NewTopic(name=TOPIC, num_partitions=3, replication_factor=1)
    try:
        admin.create_topics([topic])
        print(f"✅ Topic '{TOPIC}' creado correctamente.")
    except Exception as e:
        print(f"⚠️ {e}")
    finally:
        admin.close()

def send_to_kafka(data: dict):
    """
    Envía un mensaje JSON al topic simulador_datos.
    """
    producer = KafkaProducer(
        bootstrap_servers=BROKER,
        value_serializer=lambda v: json.dumps(v).encode('utf-8')
    )
    producer.send(TOPIC, value=data)
    producer.flush()
    print(f"📤 Enviado a Kafka: {data}")

def consume_from_kafka():
    """
    Escucha mensajes del topic (solo para pruebas locales).
    """
    consumer = KafkaConsumer(
        TOPIC,
        bootstrap_servers=BROKER,
        auto_offset_reset='earliest',
        value_deserializer=lambda v: json.loads(v.decode('utf-8'))
    )
    print(f"📥 Escuchando mensajes del topic '{TOPIC}'...")
    for msg in consumer:
        print(f"Mensaje recibido: {msg.value}")
