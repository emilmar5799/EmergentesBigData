#!/bin/sh

echo "🚀 Iniciando consumer_mongo..."
python consumer_mongo.py &

echo "🚀 Iniciando consumer_mysql..."
python consumer_mysql.py &

echo "🚀 Iniciando producer..."
python producer.py
