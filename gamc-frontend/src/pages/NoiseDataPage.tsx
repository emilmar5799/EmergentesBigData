import { useEffect, useState } from "react";
import { API } from "../api/BaseUrl";

interface NoiseSample {
  sensor_id: string;
  time: string;
  laeq: number;
  lai?: number;
  lai_max?: number;
  battery?: number;
}

export default function NoiseDataPage() {
  const [noiseData, setNoiseData] = useState<NoiseSample[]>([]);

  useEffect(() => {
    API.get("/api/data/noise/latest")
      .then((res) => setNoiseData(res.data))
      .catch((err) => console.error("ERROR NOISE:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">🔊 Lecturas de Sonido</h1>

      {noiseData.length === 0 && (
        <p className="text-gray-500">No hay datos disponibles.</p>
      )}

      {noiseData.length > 0 && (
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Sensor</th>
              <th className="border px-3 py-2">Fecha</th>
              <th className="border px-3 py-2">LAeq</th>
              <th className="border px-3 py-2">LAI</th>
              <th className="border px-3 py-2">LAI Max</th>
              <th className="border px-3 py-2">Batería</th>
            </tr>
          </thead>

          <tbody>
            {noiseData.map((d, i) => (
              <tr key={i}>
                <td className="border px-3 py-1">{d.sensor_id}</td>
                <td className="border px-3 py-1">
                  {new Date(d.time).toLocaleString()}
                </td>
                <td className="border px-3 py-1">{d.laeq}</td>
                <td className="border px-3 py-1">{d.lai}</td>
                <td className="border px-3 py-1">{d.lai_max}</td>
                <td className="border px-3 py-1">{d.battery}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
