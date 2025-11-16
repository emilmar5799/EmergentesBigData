import { useEffect, useState } from "react";
import { API } from "../api/BaseUrl"; // ojo: NO axios, solo API

interface AirSample {
  sensor_id: string;
  time: string;
  co2: number;
  temperature: number;
  humidity: number;
  battery?: number;
}

export default function AirDataPage() {
  const [airData, setAirData] = useState<AirSample[]>([]);

  useEffect(() => {
    API.get("/api/data/air/latest")   // <<--- AQUÍ EL FIX
      .then((res) => setAirData(res.data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">📡 Lecturas de Calidad de Aire</h1>

      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Sensor</th>
            <th className="border px-3 py-2">Fecha</th>
            <th className="border px-3 py-2">CO₂</th>
            <th className="border px-3 py-2">Temp</th>
            <th className="border px-3 py-2">Humedad</th>
            <th className="border px-3 py-2">Batería</th>
          </tr>
        </thead>

        <tbody>
          {airData.map((d, index) => (
            <tr key={index}>
              <td className="border px-3 py-1">{d.sensor_id}</td>
              <td className="border px-3 py-1">{new Date(d.time).toLocaleString()}</td>
              <td className="border px-3 py-1">{d.co2}</td>
              <td className="border px-3 py-1">{d.temperature}</td>
              <td className="border px-3 py-1">{d.humidity}</td>
              <td className="border px-3 py-1">{d.battery}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
