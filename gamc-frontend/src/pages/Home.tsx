import React, { useEffect, useState } from "react";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import { API } from "../api/BaseUrl";

export default function Home() {
  const [air, setAir] = useState<any>(null);
  const [noise, setNoise] = useState<any>(null);
  const [und, setUnd] = useState<any>(null);

  const [airHistory, setAirHistory] = useState<any[]>([]);
  const [noiseHistory, setNoiseHistory] = useState<any[]>([]);
  const [undHistory, setUndHistory] = useState<any[]>([]);

  useEffect(() => {
    fetchAir();
    fetchNoise();
    fetchUnderground();
  }, []);

  // ================== FETCHS (ARREGLADOS) =====================

  const fetchAir = async () => {
    try {
      const res = await API.get("/api/data/air/latest");
      const arr = res.data;

      setAir(arr?.[0] ?? null);
      setAirHistory(arr ?? []);
    } catch (err) {
      console.error("Error air:", err);
    }
  };

  const fetchNoise = async () => {
    try {
      const res = await API.get("/api/data/noise/latest");
      const arr = res.data;

      setNoise(arr?.[0] ?? null);
      setNoiseHistory(arr ?? []);
    } catch (err) {
      console.error("Error noise:", err);
    }
  };

  const fetchUnderground = async () => {
    try {
      const res = await API.get("/api/data/underground/latest");
      const arr = res.data;

      setUnd(arr?.[0] ?? null);
      setUndHistory(arr ?? []);
    } catch (err) {
      console.error("Error underground:", err);
    }
  };

  // =================== CARD COMPONENT ===========================

  interface FieldItem { key: string; label: string }
  interface SensorCardProps {
    title: string;
    icon: React.ReactNode;
    data: Record<string, any> | null;
    history: Array<Record<string, any>>;
    fields: { chart: string; list: FieldItem[] };
    color?: string;
  }

  const SensorCard: React.FC<SensorCardProps> = ({ title, icon, data, history, fields, color }) => {
    
    // FIX: ID seguro sin espacios
    const safeId = title.replace(/\s+/g, "-");

    return (
      <div className="bg-neutral-900/70 backdrop-blur-xl border border-neutral-700 rounded-2xl p-6 shadow-lg gamc-glow flex flex-col gap-3 fade-in">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
              {icon}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-neutral-100">{title}</h2>
              <p className="text-neutral-400 text-sm">
                Última actualización:{" "}
                <span className="text-neutral-300">
                  {data ? new Date(data.time).toLocaleString("es-ES") : "--"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* GRAFICO SPARKLINE */}
        <div className="h-24 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
              <defs>
                <linearGradient id={`colorGradient-${safeId}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="20%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>

              <Tooltip contentStyle={{ background: "#111", border: "1px solid #444" }} />
              <Area
                type="monotone"
                dataKey={fields.chart}
                stroke="#3b82f6"
                fill={`url(#colorGradient-${safeId})`}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* DATA GRID */}
        <div className="grid grid-cols-2 gap-4 mt-2">
          {fields.list.map((f: FieldItem) => (
            <div key={f.key} className="bg-neutral-800/50 p-3 rounded-xl border border-neutral-700">
              <p className="text-neutral-400 text-xs">{f.label}</p>
              <p className="text-neutral-100 text-xl font-semibold">
                {data ? data[f.key] ?? "-" : "-"}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // =================== UI MAIN ============================

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-10 text-neutral-100 fade-in">

      <h1 className="text-4xl font-bold mb-8 tracking-tight text-neutral-100">
        🌎 Monitoreo Ambiental GAMC
      </h1>

      <p className="text-neutral-400 mb-10 text-lg">
        Visualiza los valores generales del sistema en tiempo real:  
        calidad del aire, niveles de ruido y monitoreo soterrado.
      </p>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* AIRE */}
        <SensorCard
          title="Calidad del Aire"
          icon="🌫️"
          data={air}
          history={airHistory}
          color="bg-blue-600"
          fields={{
            chart: "co2",
            list: [
              { key: "co2", label: "CO₂ (ppm)" },
              { key: "temperature", label: "Temperatura °C" },
              { key: "humidity", label: "Humedad %" },
              { key: "pressure", label: "Presión" },
            ],
          }}
        />

        {/* RUIDO */}
        <SensorCard
          title="Niveles de Ruido"
          icon="🔊"
          data={noise}
          history={noiseHistory}
          color="bg-yellow-600"
          fields={{
            chart: "laeq",
            list: [
              { key: "laeq", label: "LAeq (dB)" },
              { key: "lai", label: "LAI (dB)" },
              { key: "lai_max", label: "LAI Máx" },
              { key: "battery", label: "Batería %" },
            ],
          }}
        />

        {/* SOTERRADO */}
        <SensorCard
          title="Monitoreo Soterrado"
          icon="📡"
          data={und}
          history={undHistory}
          color="bg-green-600"
          fields={{
            chart: "distance",
            list: [
              { key: "distance", label: "Distancia (cm)" },
              { key: "position", label: "Posición" },
              { key: "battery", label: "Batería %" },
              { key: "status", label: "Estado" },
            ],
          }}
        />

      </div>
    </div>
  );
}
