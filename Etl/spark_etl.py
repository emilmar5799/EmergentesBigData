from pyspark.sql import SparkSession
from pyspark.sql.functions import from_json, col
from pyspark.sql.types import StructType, StructField, StringType, DoubleType, IntegerType

spark = SparkSession.builder \
    .appName("KafkaSparkETL") \
    .getOrCreate()

df = spark.readStream.format("kafka") \
    .option("kafka.bootstrap.servers", "localhost:9092") \
    .option("subscribe", "simulador_datos") \
    .option("startingOffsets", "earliest") \
    .load()

schema = StructType([
    StructField("sensor_id", IntegerType()),
    StructField("temperatura", DoubleType()),
    StructField("humedad", DoubleType()),
    StructField("timestamp", StringType())
])

json_df = df.select(from_json(col("value").cast("string"), schema).alias("data")).select("data.*")

query = json_df.writeStream \
    .outputMode("append") \
    .format("console") \
    .start()

query.awaitTermination()
