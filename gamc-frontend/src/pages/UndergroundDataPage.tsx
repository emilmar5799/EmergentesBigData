import { useEffect, useState } from "react";
import { API } from "../api/BaseUrl";

interface UndergroundSample {
  sensor_id: string;
  time: string;
  distance: number;
  position?: string;
  battery?: number;
}

export default function UndergroundDataPage() {
  const [undData, setUndData] = useState<UndergroundSample[]>([]);

  useEffect(() => {
    API.get("/api/data/underground/latest")
      .then((res) => setUndData(res.data))
      .catch((err) => console.error("ERROR UND:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">📡 Lecturas Soterradas</h1>

      {undData.length === 0 && (
        <p className="text-gray-500">No hay datos disponibles.</p>
      )}

      {undData.length > 0 && (
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Sensor</th>
              <th className="border px-3 py-2">Fecha</th>
              <th className="border px-3 py-2">Distancia</th>
              <th className="border px-3 py-2">Posición</th>
              <th className="border px-3 py-2">Batería</th>
            </tr>
          </thead>

          <tbody>
            {undData.map((d, i) => (
              <tr key={i}>
                <td className="border px-3 py-1">{d.sensor_id}</td>
                <td className="border px-3 py-1">
                  {new Date(d.time).toLocaleString()}
                </td>
                <td className="border px-3 py-1">{d.distance}</td>
                <td className="border px-3 py-1">{d.position}</td>
                <td className="border px-3 py-1">{d.battery}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
