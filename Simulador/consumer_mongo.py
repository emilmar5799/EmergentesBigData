from kafka import KafkaConsumer
from pymongo import MongoClient
import json
import os

mongo_uri = os.getenv("MONGO_URI")
client = MongoClient(mongo_uri)
db = client["EmergentesDb"]

consumer = KafkaConsumer(
    "air_topic", "noise_topic", "und_topic",
    bootstrap_servers=["kafka:9092"],
    value_deserializer=lambda m: json.loads(m.decode("utf-8"))
)

for msg in consumer:
    collection = msg.topic.replace("_topic", "")
    print(f"[Mongo] Insertando → {collection}")
    db[collection].insert_one(msg.value)
