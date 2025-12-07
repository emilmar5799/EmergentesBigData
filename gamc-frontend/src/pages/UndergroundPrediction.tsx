import { useState } from "react";
import { API } from "../api/BaseUrl";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend,
  CartesianGrid, ResponsiveContainer
} from "recharts";

export default function UndergroundPrediction() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [metrics, setMetrics] = useState<any>(null);
  const [trend, setTrend] = useState<any>(null);

  const [pred7, setPred7] = useState<any[]>([]);
  const [pred30, setPred30] = useState<any[]>([]);
  const [pred50, setPred50] = useState<any[]>([]);
  const [weekly, setWeekly] = useState<any[]>([]);

  const runPrediction = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await API.get("/api/underground/predict");

      setMetrics(res.data.metrics);
      setTrend(res.data.trend);

      setPred7(res.data.pred7.map((p: any) => ({
        date: p.date,
        value: Number(p.value)
      })));

      setPred30(res.data.pred30.map((p: any) => ({
        date: p.date,
        value: Number(p.value)
      })));

      setPred50(res.data.pred50.map((p: any) => ({
        date: p.date,
        value: Number(p.value)
      })));

      setWeekly(
        res.data.weekly.map((w: any) => ({
          week: w.week,
          value: Number(w.value)
        }))
      );

    } catch (err) {
      console.error(err);
      setError("❌ Error ejecutando la predicción. Asegúrate de cargar datos soterrados.");
    }

    setLoading(false);
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-4">🔮 Predicción Soterrada (Underground)</h1>

      <button
        onClick={runPrediction}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Procesando..." : "Ejecutar Modelo de Predicción"}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-200 text-red-800 rounded">
          {error}
        </div>
      )}

      {/* ---------------- MÉTRICAS ---------------- */}
      {metrics && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">📊 Métricas del Modelo</h2>

          <p><b>MAE:</b> {metrics.MAE.toFixed(4)} cm  
            <span className="text-sm text-gray-600 ml-2">
              ➜ Error medio absoluto: cuánto se equivoca el modelo en promedio.
            </span>
          </p>

          <p><b>RMSE:</b> {metrics.RMSE.toFixed(4)} cm  
            <span className="text-sm text-gray-600 ml-2">
              ➜ Error cuadrático medio: penaliza errores grandes. Indica estabilidad del terreno.
            </span>
          </p>

          <p><b>R²:</b> {metrics.R2.toFixed(4)}
            <span className="text-sm text-gray-600 ml-2">
              ➜ Explica qué tan bien el modelo predice el comportamiento real.
            </span>
          </p>

          <div className="mt-4 bg-white p-3 border rounded">
            <h3 className="font-semibold">📘 ¿Cómo interpretar?</h3>

            {metrics.R2 < 0.5 && (
              <p className="mt-1">
                ⚠️ Los datos presentan variaciones fuertes. La predicción sirve para TENDENCIAS, no valores exactos.
              </p>
            )}

            {metrics.R2 >= 0.5 && metrics.R2 < 0.8 && (
              <p className="mt-1">
                ✔️ Modelo razonable: útil para monitoreo operativo semanal/mensual.
              </p>
            )}

            {metrics.R2 >= 0.8 && (
              <p className="mt-1">
                🌟 Predicción altamente confiable.
              </p>
            )}
          </div>
        </div>
      )}

      {/* ---------------- TENDENCIA ---------------- */}
      {trend && (
        <div className="mt-6 p-4 bg-yellow-100 border rounded shadow">
          <h2 className="font-bold text-xl">📈 Análisis de Tendencia del Terreno</h2>

          <p className="mt-2">🔼 <b>Pico máximo:</b> {trend.max_value.toFixed(2)} cm — {trend.max_date}</p>
          <p className="mt-1">🔽 <b>Mínimo estimado:</b> {trend.min_value.toFixed(2)} cm — {trend.min_date}</p>
          <p className="mt-3 text-lg">{trend.risk}</p>
        </div>
      )}

      {/* ---------------- 7 DÍAS ---------------- */}
      {pred7.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4">📅 Predicción Próximos 7 Días</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={pred7}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date"
                label={{ value: "Fecha", position: "insideBottom", dy: 10 }}
              />
              <YAxis label={{ value: "Distancia (cm)", angle: -90, dx: -10 }} />
              <Tooltip
                formatter={(v) => `${Number(v).toFixed(2)} cm`}
                labelFormatter={(l) => `Fecha: ${l}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                name="Distancia (cm)" // ✔ LABEL CORRECTO
                stroke="#0066ff"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </section>
      )}

      {/* ---------------- 30 DÍAS ---------------- */}
      {pred30.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4">📆 Predicción Próximos 30 Días</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={pred30}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" interval={2} />
              <YAxis label={{ value: "Distancia (cm)", angle: -90 }} />
              <Tooltip formatter={(v) => `${Number(v).toFixed(2)} cm`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                name="Distancia (cm)"
                stroke="#ff6600"
              />
            </LineChart>
          </ResponsiveContainer>
        </section>
      )}

      {/* ---------------- 50 DÍAS ---------------- */}
      {pred50.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4">📅 Predicción Próximos 50 Días</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={pred50}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" interval={5} />
              <YAxis label={{ value: "Distancia (cm)", angle: -90 }} />
              <Tooltip formatter={(v) => `${Number(v).toFixed(2)} cm`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                name="Distancia (cm)"
                stroke="#9900ff"
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </section>
      )}

      {/* ---------------- SEMANAS ---------------- */}
      {weekly.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4">🗓️ Predicción por Semanas (50 días)</h2>

          <table className="min-w-full text-sm border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">Semana</th>
                <th className="border px-4 py-2">Promedio estimado (cm)</th>
              </tr>
            </thead>

            <tbody>
              {weekly.map((w, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{w.week}</td>
                  <td className="border px-4 py-2">{Number(w.value).toFixed(2)} cm</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 bg-white p-3 border rounded shadow">
            <h3 className="font-semibold">📘 ¿Para qué sirve esta tabla?</h3>
            <p className="mt-2">• Resume la tendencia semanal del terreno.</p>
            <p>• Identifica semanas críticas con riesgo de hundimiento o levantamiento.</p>
            <p>• Es clave para planificación operativa y mantenimiento preventivo.</p>
          </div>
        </section>
      )}

    </div>
  );
}
