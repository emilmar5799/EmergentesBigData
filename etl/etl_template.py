"""
ETL Template con Apache Spark
=============================
Este template proporciona la estructura base para procesos ETL usando Apache Spark.

Uso:
    from etl_template import create_spark_session
    
    spark = create_spark_session()
    # Tu código ETL aquí
    spark.stop()
"""

from pyspark.sql import SparkSession
from pyspark.sql.types import *
import logging
from typing import Optional


def create_spark_session(
    app_name: str = "ETL-Process",
    master: Optional[str] = "local[*]",
    config_options: Optional[dict] = None
) -> SparkSession:
    """
    Crea y configura una sesión de Spark.
    
    Args:
        app_name: Nombre de la aplicación Spark
        master: URL del master ("local[*]" por defecto para modo local)
        config_options: Diccionario con opciones adicionales de configuración
    
    Returns:
        SparkSession configurada
    """
    # Configuración base del SparkSession con modo local por defecto
    spark_builder = SparkSession.builder.appName(app_name)
    
    # Configurar master (por defecto local[*] para desarrollo)
    if master:
        spark_builder = spark_builder.master(master)
    else:
        spark_builder = spark_builder.master("local[*]")
    
    # Configuraciones adicionales por defecto
    default_config = {
        "spark.sql.warehouse.dir": "spark-warehouse",
        "spark.sql.execution.arrow.pyspark.enabled": "true",
        "spark.serializer": "org.apache.spark.serializer.KryoSerializer"
    }
    
    # Aplicar configuraciones por defecto
    for key, value in default_config.items():
        spark_builder = spark_builder.config(key, value)
    
    # Aplicar configuraciones personalizadas si se proporcionan
    if config_options:
        for key, value in config_options.items():
            spark_builder = spark_builder.config(key, value)
    
    # Crear y retornar la sesión
    try:
        spark = spark_builder.getOrCreate()
        # Configurar logging después de crear la sesión
        spark.sparkContext.setLogLevel("WARN")
        logging.info(f"SparkSession creada: {app_name}")
        return spark
    except Exception as e:
        logging.error(f"Error al crear SparkSession: {str(e)}")
        logging.error("Verifica que Java esté instalado y JAVA_HOME esté configurado")
        raise


def main():
    """
    Función principal de ejemplo.
    """
    # Crear sesión de Spark con modo local
    spark = create_spark_session("ETL-Template-Example", master="local[*]")
    
    try:
        # Ejemplo de uso básico
        print("=" * 50)
        print("SparkSession creada exitosamente")
        print(f"Spark Version: {spark.version}")
        print(f"App Name: {spark.sparkContext.appName}")
        print(f"Master: {spark.sparkContext.master}")
        print("=" * 50)
        
        # Verificar que la sesión funciona correctamente
        print("\n[OK] La configuracion de SparkSession es correcta.")
        print("[OK] El template ETL esta listo para usar.")
        print("\n[INFO] Para usar este template en tus procesos ETL:")
        print("   from etl_template import create_spark_session")
        print("   spark = create_spark_session('Mi-Proceso-ETL')")
        print("   # Tu código ETL aquí")
        print("   spark.stop()")
        
    except Exception as e:
        logging.error(f"Error en el proceso ETL: {str(e)}")
        raise
    finally:
        # Cerrar la sesión
        spark.stop()
        logging.info("SparkSession cerrada")


if __name__ == "__main__":
    main()

