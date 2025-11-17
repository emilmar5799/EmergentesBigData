import { useEffect, useState } from "react";
import { API } from "../api/BaseUrl";
import {
  PieChart, Pie, BarChart, Bar,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, Cell
} from "recharts";

interface UndergroundSample {
  sensor_id: string;
  time: string;
  distance: number;
  position?: string;
  battery?: number;
}

interface CSVRow {
  "deviceInfo.deviceName": string;
  "time": string;
  "object.distance": string;
  "object.position": string;
  "object.battery": string;
}

export default function UndergroundDataPage() {
  const [undData, setUndData] = useState<UndergroundSample[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [fileInputKey, setFileInputKey] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [limit, setLimit] = useState(100);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchUndergroundData();
  }, []);

  const fetchUndergroundData = () => {
    const endpoint = showAll ? "/api/data/underground" : "/api/data/underground/latest";
    const params = showAll ? {} : { limit };

    API.get(endpoint, { params })
      .then((res) => setUndData(res.data))
      .catch((err) => console.error("ERROR UND:", err));
  };

  const toFloat = (value: string): number | null => {
    if (!value || value.trim() === "") return null;
    try {
      return parseFloat(value);
    } catch {
      return null;
    }
  };

  const processCSV = async (file: File) => {
    setLoading(true);
    setUploadProgress(0);
    setMessage("📄 Procesando archivo CSV de soterrados...");

    const requiredColumns = [
      "deviceInfo.deviceName",
      "time",
      "object.distance",
      "object.position",
      "object.battery"
    ];

    try {
      const text = await file.text();
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

      // Validar columnas
      const missingColumns = requiredColumns.filter(col => !headers.includes(col));
      if (missingColumns.length > 0) {
        setMessage(`❌ ERROR: Faltan columnas: ${missingColumns.join(', ')}`);
        setLoading(false);
        return;
      }

      // Parsear CSV
      const rows: CSVRow[] = [];
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;

        const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
        const row: any = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        rows.push(row);
      }

      setMessage(`✅ CSV válido. ${rows.length} filas encontradas. Insertando...`);

      let totalOk = 0;
      let totalErr = 0;

      // Procesar cada fila
      for (let i = 0; i < Math.min(rows.length, limit); i++) {
        const row = rows[i];

        const payload = {
          sensor_id: row["deviceInfo.deviceName"],
          time: row["time"],
          distance: toFloat(row["object.distance"]),
          position: row["object.position"] || undefined,
          battery: toFloat(row["object.battery"]),
        };

        // Validar campos críticos
        const criticalFields = ["sensor_id", "time", "distance"];
        const missingCriticalFields = criticalFields.filter(field => !payload[field as keyof typeof payload]);

        if (missingCriticalFields.length > 0) {
          console.log(`Fila ${i + 1} incompleta → saltada. Campos críticos vacíos: ${missingCriticalFields}`);
          totalErr++;
          continue;
        }

        try {
          const response = await API.post("/api/data/underground", payload);
          if (response.status === 200) {
            totalOk++;
          } else {
            totalErr++;
            console.log(`Error en fila ${i + 1}:`, response.data);
          }
        } catch (error: any) {
          totalErr++;
          console.error(`Error en fila ${i + 1}:`, error.response?.data || error.message);
        }

        // Actualizar progreso
        const progress = Math.round(((i + 1) / Math.min(rows.length, limit)) * 100);
        setUploadProgress(progress);
        setMessage(`📊 Procesando... ${i + 1}/${Math.min(rows.length, limit)} filas`);
      }

      setMessage(`✅ ETL completado: ${totalOk} insertados, ${totalErr} errores`);

      // Recargar datos después de 2 segundos
      setTimeout(() => {
        fetchUndergroundData();
        setUploadProgress(0);
      }, 2000);

    } catch (error) {
      setMessage(`❌ Error procesando CSV: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.csv')) {
      setMessage("❌ Por favor selecciona un archivo CSV");
      return;
    }

    processCSV(file);

    // Resetear input para permitir seleccionar el mismo archivo otra vez
    setFileInputKey(prev => prev + 1);
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById('csv-file-underground') as HTMLInputElement;
    fileInput?.click();
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
    setTimeout(() => fetchUndergroundData(), 100);
  };
  // === GRÁFICOS PARA SOTERRADOS ===

  // Contar registros por sensor
  const sensorCount = undData.reduce((acc: any, d) => {
    acc[d.sensor_id] = (acc[d.sensor_id] || 0) + 1;
    return acc;
  }, {});

  // PieChart - Registros por sensor
  const pieData = Object.entries(sensorCount).map(([sensor, count]) => ({
    name: sensor,
    value: count,
  }));

  // Promedio de distancia por sensor
  const distBySensor: any = {};

  undData.forEach((d) => {
    if (!distBySensor[d.sensor_id]) {
      distBySensor[d.sensor_id] = { total: 0, count: 0 };
    }

    // Ignorar NaN o undefined
    if (d.distance !== null && d.distance !== undefined && !isNaN(d.distance)) {
      distBySensor[d.sensor_id].total += d.distance;
      distBySensor[d.sensor_id].count += 1;
    }
  });

  const barData = Object.entries(distBySensor).map(([sensor, data]: any) => {
    const avg = data.count > 0 ? data.total / data.count : 0;

    return {
      sensor,
      distance: Number.isFinite(avg) ? avg : 0,
    };
  });

  const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28", "#AA66CC"];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">🕳️ Lecturas Soterradas</h1>

      {/* Sección de Carga de CSV */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
        <h2 className="text-lg font-semibold mb-3">🕳️ Cargar Datos Soterrados (CSV)</h2>

        <div className="flex gap-4 items-center mb-3">
          <button
            onClick={triggerFileInput}
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded disabled:opacity-50 transition-colors"
          >
            📁 Seleccionar CSV
          </button>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Límite:</label>
            <input
              type="number"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="w-20 px-2 py-1 border rounded text-sm"
              min="1"
              max="1000"
            />
            <span className="text-sm text-gray-600">registros</span>
          </div>

          <button
            onClick={fetchUndergroundData}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
          >
            🔄 Actualizar Tabla
          </button>

          <button
            onClick={toggleShowAll}
            className={`${showAll ? 'bg-green-600 hover:bg-green-700' : 'bg-yellow-500 hover:bg-yellow-600'
              } text-white px-4 py-2 rounded transition-colors`}
          >
            {showAll ? '📋 Mostrar Recientes' : '📂 Mostrar Todos'}
          </button>
        </div>

        <input
          key={fileInputKey}
          id="csv-file-underground"
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Barra de progreso */}
        {uploadProgress > 0 && (
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Progreso: {uploadProgress}%
            </div>
          </div>
        )}

        {/* Mensajes */}
        {message && (
          <div className={`mt-3 p-3 rounded ${message.includes("✅") ? "bg-green-100 text-green-800 border border-green-200" :
              message.includes("❌") ? "bg-red-100 text-red-800 border border-red-200" :
                "bg-blue-100 text-blue-800 border border-blue-200"
            }`}>
            {message}
          </div>
        )}

        {loading && (
          <div className="mt-3 text-orange-600">
            ⏳ Procesando CSV de soterrados...
          </div>
        )}
      </div>

      {/* Información del modo actual */}
      <div className="mb-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${showAll ? 'bg-green-500' : 'bg-orange-500'}`}></span>
          <span className="text-sm font-medium">
            {showAll ? '📂 Modo: Mostrando TODOS los registros' : '📋 Modo: Mostrando registros más recientes'}
          </span>
        </div>
      </div>
      {/* ====================== GRÁFICOS ============================ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        {/* === PIE CHART — Registros por Sensor === */}
        <div className="bg-white p-4 border rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Distribución de registros por sensor</h2>

          <PieChart width={350} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* === BAR CHART — Promedio de Distancia por Sensor === */}
        <div className="bg-white p-4 border rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Promedio de distancia por sensor</h2>

          <BarChart width={400} height={300} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sensor" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="distance" fill="#FF8042" name="Distancia Promedio (m)" />
          </BarChart>
        </div>

      </div>
      {/* ============================================================ */}

      {/* Tabla de datos */}
      <div className="bg-white rounded-lg border shadow-sm">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-3 text-left font-semibold text-gray-700">Sensor</th>
              <th className="border px-4 py-3 text-left font-semibold text-gray-700">Fecha</th>
              <th className="border px-4 py-3 text-left font-semibold text-gray-700">Distancia (m)</th>
              <th className="border px-4 py-3 text-left font-semibold text-gray-700">Posición</th>
              <th className="border px-4 py-3 text-left font-semibold text-gray-700">Batería (%)</th>
            </tr>
          </thead>

          <tbody>
            {undData.length === 0 ? (
              <tr>
                <td colSpan={5} className="border px-4 py-8 text-center text-gray-500 bg-gray-50">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-2xl mb-2">🕳️</span>
                    <p className="text-lg font-medium">No hay datos soterrados disponibles</p>
                    <p className="text-sm mt-1">Selecciona un archivo CSV para cargar datos</p>
                  </div>
                </td>
              </tr>
            ) : (
              undData.map((d, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="border px-4 py-3 font-medium text-gray-900">{d.sensor_id}</td>
                  <td className="border px-4 py-3 text-gray-700">
                    {new Date(d.time).toLocaleString('es-ES', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </td>
                  <td className="border px-4 py-3 text-gray-700">{d.distance?.toFixed(2) || '-'}</td>
                  <td className="border px-4 py-3 text-gray-700">{d.position || '-'}</td>
                  <td className="border px-4 py-3 text-gray-700">{d.battery?.toFixed(1) || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Contador de registros */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Mostrando {undData.length} registros</span>
            {showAll && <span className="ml-2 text-orange-600">(Todos los registros)</span>}
            {!showAll && <span className="ml-2 text-gray-500">(Más recientes)</span>}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setLimit(50)}
              className={`px-3 py-1 text-xs rounded ${limit === 50 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
            >
              50
            </button>
            <button
              onClick={() => setLimit(100)}
              className={`px-3 py-1 text-xs rounded ${limit === 100 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
            >
              100
            </button>
            <button
              onClick={() => setLimit(200)}
              className={`px-3 py-1 text-xs rounded ${limit === 200 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
            >
              200
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}