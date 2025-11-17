from kafka import KafkaConsumer
import mysql.connector
import json
import os

conn = mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME"),
    port=os.getenv("DB_PORT")
)
cursor = conn.cursor()

consumer = KafkaConsumer(
    "air_topic", "noise_topic", "und_topic",
    bootstrap_servers=["kafka:9092"],
    value_deserializer=lambda m: json.loads(m.decode("utf-8"))
)

def insert_air(d):
    cursor.execute("""
        INSERT INTO air (_id, sensor_id, time, co2, temperature, humidity, pressure, battery)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s)
    """, (d["_id"], d["sensor_id"], d["time"], d["co2"], d["temperature"],
          d["humidity"], d["pressure"], d["battery"]))
    conn.commit()

def insert_noise(d):
    cursor.execute("""
        INSERT INTO noise (_id, sensor_id, time, laeq, lai, lai_max, battery, status)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s)
    """, (d["_id"], d["sensor_id"], d["time"], d["laeq"], d["lai"],
          d["lai_max"], d["battery"], d["status"]))
    conn.commit()

def insert_und(d):
    cursor.execute("""
        INSERT INTO underground (_id, sensor_id, time, distance, position, battery, status)
        VALUES (%s,%s,%s,%s,%s,%s,%s)
    """, (d["_id"], d["sensor_id"], d["time"], d["distance"], d["position"],
          d["battery"], d["status"]))
    conn.commit()

for msg in consumer:
    t = msg.topic
    d = msg.value
    print(f"[MySQL] Insertando → {t}")

    if t == "air_topic":
        insert_air(d)

    elif t == "noise_topic":
        insert_noise(d)

    elif t == "und_topic":
        insert_und(d)
