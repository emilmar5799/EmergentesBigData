from fastapi import APIRouter, HTTPException
from app.db.mongo_conn import underground_collection
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np
from datetime import datetime, timedelta

router = APIRouter(tags=["Underground Prediction"])


@router.get("/predict")
def predict_underground():

    # ===========================
    # 1. Cargar datos de MongoDB
    # ===========================
    docs = list(underground_collection.find().sort("time", 1))

    if len(docs) < 5:
        raise HTTPException(status_code=400, detail="No hay suficientes datos soterrados para entrenar el modelo.")

    df = pd.DataFrame(docs)

    # Asegurar valores numéricos
    df["distance"] = pd.to_numeric(df["distance"], errors="coerce")
    df = df.dropna(subset=["distance"])

    # ================================================
    # 2. CORRECCIÓN DEL ERROR tz-naive vs tz-aware
    # ================================================
    df["time"] = pd.to_datetime(df["time"], utc=True, errors="coerce")
    df["time"] = df["time"].dt.tz_localize(None)  # eliminar zona horaria

    # Fecha real más reciente
    last_date = df["time"].max()

    # =======================================
    # 3. Construir variable temporal t
    # =======================================
    df["t"] = np.arange(len(df)).reshape(-1,)

    X = df["t"].values.reshape(-1, 1)
    y = df["distance"].values

    # =======================================
    # 4. Entrenar modelo base (LinearRegression)
    # =======================================
    model = LinearRegression()
    model.fit(X, y)

    # ==========================
    # 5. Predicciones crudas
    # ==========================
    pred7 = model.predict(np.arange(len(df), len(df)+7).reshape(-1, 1)).tolist()
    pred30 = model.predict(np.arange(len(df), len(df)+30).reshape(-1, 1)).tolist()
    pred50 = model.predict(np.arange(len(df), len(df)+50).reshape(-1, 1)).tolist()

    # ====================================================
    # 6. Predicciones con FECHAS reales (Día 1 = mañana)
    # ====================================================
    pred7_with_dates = [
        {
            "date": (last_date + timedelta(days=i+1)).strftime("%d/%m/%Y"),
            "value": float(pred7[i])
        }
        for i in range(7)
    ]

    pred30_with_dates = [
        {
            "date": (last_date + timedelta(days=i+1)).strftime("%d/%m/%Y"),
            "value": float(pred30[i])
        }
        for i in range(30)
    ]

    pred50_with_dates = [
        {
            "date": (last_date + timedelta(days=i+1)).strftime("%d/%m/%Y"),
            "value": float(pred50[i])
        }
        for i in range(50)
    ]

    # ====================================================
    # 7. Predicción semanal (promedio por semana)
    # ====================================================
    weekly = []
    for w in range(0, 50, 7):
        week_start = last_date + timedelta(days=w+1)
        week_end = last_date + timedelta(days=w+7)
        week_avg = float(np.mean(pred50[w:w+7]))

        weekly.append({
            "week": f"{week_start.strftime('%d/%m/%Y')} → {week_end.strftime('%d/%m/%Y')}",
            "value": week_avg
        })

    # ====================================================
    # 8. Análisis de tendencia — pico máximo y mínimo
    # ====================================================
    max_idx = int(np.argmax(pred50))
    min_idx = int(np.argmin(pred50))

    max_day_date = (last_date + timedelta(days=max_idx+1)).strftime("%d/%m/%Y")
    min_day_date = (last_date + timedelta(days=min_idx+1)).strftime("%d/%m/%Y")

    max_val = float(pred50[max_idx])
    min_val = float(pred50[min_idx])

    # ====================================================
    # 9. Clasificación de riesgo
    # ====================================================
    if max_val > 120:
        risk = "🔴 Riesgo CRÍTICO: actividad soterrada muy intensa."
    elif max_val > 80:
        risk = "🟠 Riesgo ALTO: cambios fuertes esperados en el subsuelo."
    elif max_val > 50:
        risk = "🟡 Riesgo MODERADO: variaciones previsibles pero no extremas."
    else:
        risk = "🟢 Riesgo BAJO: comportamiento estable."

    # ====================================================
    # 10. Retornar respuesta completa al frontend
    # ====================================================
    return {
        "metrics": {
            "MAE": float(mean_absolute_error(y, model.predict(X))),
            "RMSE": float(np.sqrt(mean_squared_error(y, model.predict(X)))),
            "R2": float(r2_score(y, model.predict(X))),
        },
        "trend": {
            "max_value": max_val,
            "max_date": max_day_date,
            "min_value": min_val,
            "min_date": min_day_date,
            "risk": risk
        },
        "pred7": pred7_with_dates,
        "pred30": pred30_with_dates,
        "pred50": pred50_with_dates,
        "weekly": weekly
    }
