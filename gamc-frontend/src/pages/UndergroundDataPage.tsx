import { useEffect, useState } from "react";
import { API } from "../api/BaseUrl";
import {
  PieChart, Pie, BarChart, Bar,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, Cell,
  LineChart, Line, ScatterChart, Scatter,
  ResponsiveContainer,
  Label
} from "recharts";

// ======================================================
// 📌 FUNCIONES ESTADÍSTICAS AVANZADAS PARA SOTERRADOS
// ======================================================

// Media
const mean = (arr: number[]) =>
  arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

// Mediana
const median = (arr: number[]) => {
  if (!arr.length) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
};

// Moda
const mode = (arr: number[]) => {
  const frequency: any = {};
  let maxFreq = 0;
  let modes: number[] = [];

  arr.forEach(value => {
    frequency[value] = (frequency[value] || 0) + 1;
    if (frequency[value] > maxFreq) {
      maxFreq = frequency[value];
      modes = [value];
    } else if (frequency[value] === maxFreq) {
      modes.push(value);
    }
  });

  return modes.length === arr.length ? [] : modes;
};

// Varianza
const variance = (arr: number[]) =>
  arr.length > 1
    ? arr.reduce((acc, v) => acc + (v - mean(arr)) ** 2, 0) / (arr.length - 1)
    : 0;

// Desviación estándar
const stdDev = (arr: number[]) => Math.sqrt(variance(arr));

// Error estándar
const stdError = (arr: number[]) => stdDev(arr) / Math.sqrt(arr.length);

// Coeficiente de variación
const coefficientOfVariation = (arr: number[]) => (stdDev(arr) / mean(arr)) * 100;

// Percentil
const percentile = (arr: number[], p: number) => {
  if (!arr.length) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const pos = (p / 100) * (sorted.length - 1);
  const base = Math.floor(pos);
  const rest = pos - base;
  return sorted[base + 1] !== undefined
    ? sorted[base] + rest * (sorted[base + 1] - sorted[base])
    : sorted[base];
};

// Rango intercuartílico
const iqr = (arr: number[]) => percentile(arr, 75) - percentile(arr, 25);

// Outliers (Método Tukey)
const detectOutliers = (arr: number[]) => {
  const q1 = percentile(arr, 25);
  const q3 = percentile(arr, 75);
  const r = iqr(arr);
  const lower = q1 - 1.5 * r;
  const upper = q3 + 1.5 * r;
  return arr.filter(x => x < lower || x > upper);
};

// Asimetría (Skewness)
const skewness = (arr: number[]) => {
  const n = arr.length;
  if (n < 3) return 0;
  const m = mean(arr);
  const s = stdDev(arr);
  if (s === 0) return 0;
  return (
    (n * arr.reduce((sum, x) => sum + Math.pow(x - m, 3), 0)) /
    ((n - 1) * (n - 2) * Math.pow(s, 3))
  );
};

// Curtosis
const kurtosis = (arr: number[]) => {
  const n = arr.length;
  if (n < 4) return 0;
  const m = mean(arr);
  const s = stdDev(arr);
  if (s === 0) return 0;
  const sum4 = arr.reduce((sum, x) => sum + Math.pow(x - m, 4), 0);
  return (
    (n * (n + 1) * sum4) /
    ((n - 1) * (n - 2) * (n - 3) * Math.pow(s, 4)) -
    (3 * (n - 1) ** 2) / ((n - 2) * (n - 3))
  );
};

// Histograma
const histogram = (arr: number[], bins = 15) => {
  if (!arr.length) return { labels: [], counts: [] };

  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const width = (max - min) / bins;
  const counts = new Array(bins).fill(0);

  arr.forEach(v => {
    let i = Math.floor((v - min) / width);
    if (i >= bins) i = bins - 1;
    if (i < 0) i = 0;
    counts[i]++;
  });

  const labels = counts.map((_, i) => {
    const start = min + width * i;
    const end = start + width;
    return `${start.toFixed(2)} - ${end.toFixed(2)}`;
  });

  return { labels, counts, min, max, width };
};

// Q-Q plot
const qqPlot = (arr: number[]) => {
  if (!arr.length) return { theo: [], samp: [] };

  const sorted = [...arr].sort((a, b) => a - b);
  const n = sorted.length;
  const theo = [];
  const samp = [];

  for (let i = 0; i < n; i++) {
    const p = (i + 0.5) / n;
    const z = Math.sqrt(2) * erfinv(2 * p - 1);
    theo.push(z);
    samp.push(sorted[i]);
  }
  return { theo, samp };
};

// Función inversa del error
function erfinv(x: number) {
  if (x <= -1 || x >= 1) return NaN;
  const a = 0.147;
  const ln = Math.log(1 - x ** 2);
  const s1 = 2 / (Math.PI * a) + ln / 2;
  const s2 = ln / a;
  return Math.sign(x) * Math.sqrt(Math.sqrt(s1 ** 2 - s2) - s1);
}

// Control Chart I-MR
const controlIMR = (arr: number[]) => {
  if (arr.length < 2) return null;

  const MR = arr.slice(1).map((v, i) => Math.abs(v - arr[i]));
  const mrBar = mean(MR);
  const cl = mean(arr);

  return {
    values: arr,
    mr: MR,
    cl,
    ucl: cl + 2.66 * mrBar,
    lcl: cl - 2.66 * mrBar,
    mrUcl: 3.267 * mrBar,
    mrCl: mrBar
  };
};

// Análisis de tendencia temporal
const temporalAnalysis = (arr: number[], timestamps: string[]) => {
  if (arr.length < 2) return null;

  const n = arr.length;
  const x = Array.from({ length: n }, (_, i) => i);
  const y = arr;

  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((a, _, i) => a + x[i] * y[i], 0);
  const sumX2 = x.reduce((a, b) => a + b * b, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return {
    slope,
    intercept,
    trend: x.map(xi => slope * xi + intercept),
    correlation: slope > 0 ? 'Positiva' : slope < 0 ? 'Negativa' : 'Estable'
  };
};

// Análisis por posición
const analyzeByPosition = (data: UndergroundSample[]) => {
  const positionData: { [key: string]: number[] } = {};

  data.forEach(d => {
    const position = d.position || 'No especificada';
    if (!positionData[position]) {
      positionData[position] = [];
    }
    positionData[position].push(d.distance);
  });

  return Object.entries(positionData).map(([position, values]) => ({
    position,
    average: mean(values),
    count: values.length,
    min: Math.min(...values),
    max: Math.max(...values)
  })).sort((a, b) => b.count - a.count);
};

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
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedSensor, setSelectedSensor] = useState('');

  useEffect(() => {
    fetchUndergroundData();
  }, [showAll, limit]); // ✅ CORREGIDO: Ahora se actualiza cuando cambia showAll o limit

  const fetchUndergroundData = () => {
    const endpoint = showAll ? "/api/data/underground" : "/api/data/underground/latest";
    const params = showAll ? { limit } : { limit };

    API.get(endpoint, { params })
      .then((res) => setUndData(res.data))
      .catch((err) => console.error("ERROR UND:", err));
  };

  // Filtrar datos por rango de fechas y sensor
  const filteredData = undData.filter(item => {
    const itemDate = new Date(item.time);
    const matchesDate = (!dateRange.start || itemDate >= new Date(dateRange.start)) &&
      (!dateRange.end || itemDate <= new Date(dateRange.end));
    const matchesSensor = !selectedSensor || item.sensor_id === selectedSensor;
    return matchesDate && matchesSensor;
  });

  // Obtener lista única de sensores
  const uniqueSensors = [...new Set(undData.map(item => item.sensor_id))];

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
  };

  // === GRÁFICOS PARA SOTERRADOS ===

  // Contar registros por sensor
  const sensorCount = filteredData.reduce((acc: any, d) => {
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

  filteredData.forEach((d) => {
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

  // ===============================
  // 📌 ESTADÍSTICAS AVANZADAS SOTERRADOS
  // ===============================

  const distanceValues = filteredData
    .map(d => d.distance)
    .filter(v => typeof v === "number" && !isNaN(v));

  const distanceTimestamps = filteredData
    .map(d => d.time)
    .filter((_, i) => typeof distanceValues[i] === "number");

  const stats = {
    count: distanceValues.length,
    mean: mean(distanceValues),
    median: median(distanceValues),
    mode: mode(distanceValues),
    min: Math.min(...distanceValues),
    max: Math.max(...distanceValues),
    range: Math.max(...distanceValues) - Math.min(...distanceValues),
    std: stdDev(distanceValues),
    variance: variance(distanceValues),
    stdError: stdError(distanceValues),
    cv: coefficientOfVariation(distanceValues),
    skewness: skewness(distanceValues),
    kurtosis: kurtosis(distanceValues),
    p10: percentile(distanceValues, 10),
    p25: percentile(distanceValues, 25),
    p50: percentile(distanceValues, 50),
    p75: percentile(distanceValues, 75),
    p90: percentile(distanceValues, 90),
    p95: percentile(distanceValues, 95),
    p99: percentile(distanceValues, 99),
    iqr: iqr(distanceValues),
    outliers: detectOutliers(distanceValues),
    outlierCount: detectOutliers(distanceValues).length,
    histogram: histogram(distanceValues, 12),
    qq: qqPlot(distanceValues),
    control: controlIMR(distanceValues),
    temporal: temporalAnalysis(distanceValues, distanceTimestamps),
    positions: analyzeByPosition(filteredData)
  };

  // Datos para gráficos avanzados
  const histogramChartData = stats.histogram.labels.map((label, i) => ({
    range: label,
    frequency: stats.histogram.counts[i]
  }));

  const qqChartData = stats.qq.theo.map((theo, i) => ({
    theoretical: theo,
    actual: stats.qq.samp[i]
  }));

  const controlChartData = stats.control ? stats.control.values.map((value, i) => ({
    index: i + 1,
    value: value,
    cl: stats.control?.cl,
    ucl: stats.control?.ucl,
    lcl: stats.control?.lcl
  })) : [];

  const mrChartData = stats.control ? stats.control.mr.map((mr, i) => ({
    index: i + 1,
    mr: mr,
    mrCl: stats.control?.mrCl,
    mrUcl: stats.control?.mrUcl
  })) : [];

  // Serie temporal por sensor
  const timeSeriesData = filteredData
    .map((d, index) => ({
      time: new Date(d.time).toLocaleString('es-ES', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      timestamp: new Date(d.time),
      distance: d.distance,
      sensor: d.sensor_id,
      index: index
    }))
    .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  // Agrupar por sensor para líneas separadas
  const sensorTimeSeries: { [key: string]: any[] } = {};
  filteredData.forEach(d => {
    if (!sensorTimeSeries[d.sensor_id]) {
      sensorTimeSeries[d.sensor_id] = [];
    }
    sensorTimeSeries[d.sensor_id].push({
      time: new Date(d.time),
      distance: d.distance,
      formattedTime: new Date(d.time).toLocaleString('es-ES', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    });
  });

  // Preparar datos para gráfico de líneas múltiples
  const lineChartData = Object.entries(sensorTimeSeries).map(([sensor, data]) => ({
    sensor,
    data: data.sort((a, b) => a.time.getTime() - b.time.getTime())
  }));

  const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28", "#AA66CC", "#33B5E5", "#FF6666"];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🕳️ Dashboard Avanzado de Monitoreo Soterrado</h1>

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
            🔄 Actualizar Datos
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

      {/* Filtros Avanzados */}
      <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
        <h2 className="text-lg font-semibold mb-3">🔍 Filtros Avanzados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rango de Fechas - Inicio
            </label>
            <input
              type="datetime-local"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rango de Fechas - Fin
            </label>
            <input
              type="datetime-local"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filtrar por Sensor
            </label>
            <select
              value={selectedSensor}
              onChange={(e) => setSelectedSensor(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm"
            >
              <option value="">Todos los sensores</option>
              {uniqueSensors.map(sensor => (
                <option key={sensor} value={sensor}>{sensor}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => {
              setDateRange({ start: '', end: '' });
              setSelectedSensor('');
            }}
            className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
          >
            Limpiar Filtros
          </button>
          <span className="text-sm text-gray-600 ml-auto">
            {filteredData.length} de {undData.length} registros mostrados
          </span>
        </div>
      </div>

      {/* Información del modo actual */}
      <div className="mb-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${showAll ? 'bg-green-500' : 'bg-orange-500'}`}></span>
          <span className="text-sm font-medium">
            {showAll ? '📂 Modo: Mostrando TODOS los registros' : '📋 Modo: Mostrando registros más recientes'}
          </span>
          <span className="text-sm text-gray-600 ml-4">
            Mostrando {filteredData.length} registros
          </span>
        </div>
      </div>

      {/* ====================== PANEL DE ESTADÍSTICAS AVANZADAS ============================ */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">📈 Análisis Estadístico Avanzado - Distancias Soterradas</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
          <div className="p-3 bg-white rounded-lg shadow border">
            <h3 className="font-semibold text-gray-600 text-sm">Registros</h3>
            <p className="text-2xl font-bold">{stats.count}</p>
          </div>

          <div className="p-3 bg-white rounded-lg shadow border">
            <h3 className="font-semibold text-gray-600 text-sm">Media Distancia</h3>
            <p className="text-2xl font-bold">{stats.mean.toFixed(2)} m</p>
          </div>

          <div className="p-3 bg-white rounded-lg shadow border">
            <h3 className="font-semibold text-gray-600 text-sm">Mediana</h3>
            <p className="text-2xl font-bold">{stats.median.toFixed(2)} m</p>
          </div>

          <div className="p-3 bg-white rounded-lg shadow border">
            <h3 className="font-semibold text-gray-600 text-sm">Desv. Estándar</h3>
            <p className="text-2xl font-bold">{stats.std.toFixed(2)} m</p>
          </div>

          <div className="p-3 bg-white rounded-lg shadow border">
            <h3 className="font-semibold text-gray-600 text-sm">Coef. Variación</h3>
            <p className="text-2xl font-bold">{stats.cv.toFixed(1)}%</p>
          </div>

          <div className="p-3 bg-white rounded-lg shadow border">
            <h3 className="font-semibold text-red-600 text-sm">Outliers</h3>
            <p className="text-2xl font-bold text-red-600">{stats.outlierCount}</p>
          </div>
        </div>

        {/* Estadísticas de distribución */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
            <h3 className="font-semibold text-orange-700">Asimetría (Skewness)</h3>
            <p className="text-2xl font-bold text-orange-800">{stats.skewness.toFixed(3)}</p>
            <p className="text-xs text-orange-600 mt-1">
              {Math.abs(stats.skewness) < 0.5 ? "Distribución simétrica" :
                stats.skewness > 0 ? "Sesgo positivo" : "Sesgo negativo"}
            </p>
          </div>

          <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-700">Curtosis</h3>
            <p className="text-2xl font-bold text-purple-800">{stats.kurtosis.toFixed(3)}</p>
            <p className="text-xs text-purple-600 mt-1">
              {stats.kurtosis > 0 ? "Distribución leptocúrtica" :
                stats.kurtosis < 0 ? "Distribución platicúrtica" : "Distribución normal"}
            </p>
          </div>

          <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-700">Rango Intercuartílico</h3>
            <p className="text-2xl font-bold text-blue-800">{stats.iqr.toFixed(2)} m</p>
            <p className="text-xs text-blue-600 mt-1">Q3-Q1: {stats.p25.toFixed(2)} - {stats.p75.toFixed(2)} m</p>
          </div>

          <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-700">Error Estándar</h3>
            <p className="text-2xl font-bold text-green-800">{stats.stdError.toFixed(3)} m</p>
            <p className="text-xs text-green-600 mt-1">Precisión de la media</p>
          </div>
        </div>
      </div>

      {/* ====================== GRÁFICOS AVANZADOS ============================ */}
      <div className="space-y-8">

        {/* Gráficos básicos existentes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <div className="bg-white p-4 border rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Promedio de distancia por sensor</h2>
            <BarChart width={400} height={300} data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sensor">
                <Label value="Sensores" offset={-5} position="insideBottom" />
              </XAxis>

              <YAxis>
                <Label
                  value="Distancia Promedio (m)"
                  angle={-90}
                  position="insideLeft"
                  style={{ textAnchor: "middle" }}
                />
              </YAxis>

              <Tooltip />
              <Legend />
              <Bar dataKey="distance" fill="#FF8042" name="Distancia Promedio (m)" />
            </BarChart>
          </div>
        </div>

        {/* Serie Temporal - Diagrama de Líneas por Sensor */}
        <div className="bg-white p-6 border rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Serie Temporal - Distancia por Sensor</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="formattedTime"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                >
                  <Label value="Fecha / Hora" offset={-5} position="insideBottom" />
                </XAxis>

                <YAxis>
                  <Label
                    value="Distancia (m)"
                    angle={-90}
                    position="insideLeft"
                    style={{ textAnchor: "middle" }}
                  />
                </YAxis>

                <Tooltip />
                <Legend />
                {lineChartData.map((sensorData, index) => (
                  <Line
                    key={sensorData.sensor}
                    type="monotone"
                    data={sensorData.data}
                    dataKey="distance"
                    name={sensorData.sensor}
                    stroke={COLORS[index % COLORS.length]}
                    strokeWidth={2}
                    dot={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Histograma de distribución */}
        <div className="bg-white p-6 border rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Distribución de Frecuencia (Histograma) - Distancias</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={histogramChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" angle={-45} textAnchor="end" height={80}>
                  <Label value="Rangos de Distancia (m)" offset={-5} position="insideBottom" />
                </XAxis>

                <YAxis>
                  <Label
                    value="Frecuencia"
                    angle={-90}
                    position="insideLeft"
                    style={{ textAnchor: "middle" }}
                  />
                </YAxis>

                <Tooltip />
                <Bar dataKey="frequency" fill="#FF8042" name="Frecuencia" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-700">
              <strong>Observación:</strong> {
                Math.abs(stats.skewness) < 0.5 ? "Sigue una distribución aproximadamente normal" :
                  stats.skewness > 0 ? "Distribución normal sesgada a la derecha" :
                    "Distribución normal sesgada a la izquierda"
              }
            </p>
          </div>
        </div>

        {/* Gráfico Q-Q */}
        <div className="bg-white p-6 border rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Prueba de Normalidad (Gráfico Q-Q)</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart data={qqChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="theoretical">
                  <Label value="Valores Teóricos (Normal)" offset={-5} position="insideBottom" />
                </XAxis>

                <YAxis dataKey="actual">
                  <Label
                    value="Valores Observados (m)"
                    angle={-90}
                    position="insideLeft"
                    style={{ textAnchor: "middle" }}
                  />
                </YAxis>

                <Tooltip />
                <Scatter name="Q-Q Plot" fill="#FF8042" />
                <Line type="linear" dataKey="actual" stroke="#ff7300" dot={false} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded">
            <p className="text-sm text-gray-700">
              <strong>Observación:</strong> {
                Math.abs(stats.skewness) < 0.5 && Math.abs(stats.kurtosis) < 1 ?
                  "Sigue una distribución normal" : "No sigue una distribución normal"
              }
            </p>
          </div>
        </div>

        {/* Gráficos de Control */}
        {stats.control && (
          <div className="bg-white p-6 border rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Gráfico de Control de Proceso I-MR (6 Sigma)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-80">
                <h3 className="font-semibold mb-2">Gráfico I (Individuales)</h3>
                <ResponsiveContainer width="100%" height="90%">
                  <LineChart data={controlChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="index">
                      <Label value="Número de Muestra" offset={-5} position="insideBottom" />
                    </XAxis>

                    <YAxis>
                      <Label
                        value="Distancia (m)"
                        angle={-90}
                        position="insideLeft"
                        style={{ textAnchor: "middle" }}
                      />
                    </YAxis>

                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#FF8042" name="Distancia (m)" />
                    <Line type="monotone" dataKey="cl" stroke="#8884d8" name="Línea Central" strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="ucl" stroke="#FF0000" name="LCS" strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="lcl" stroke="#FF0000" name="LCI" strokeDasharray="3 3" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="h-80">
                <h3 className="font-semibold mb-2">Gráfico MR (Rango Móvil)</h3>
                <ResponsiveContainer width="100%" height="90%">
                  <LineChart data={mrChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="index">
                      <Label value="Número de Muestra" offset={-5} position="insideBottom" />
                    </XAxis>

                    <YAxis>
                      <Label
                        value="Rango Móvil (MR)"
                        angle={-90}
                        position="insideLeft"
                        style={{ textAnchor: "middle" }}
                      />
                    </YAxis>

                    <Tooltip />
                    <Line type="monotone" dataKey="mr" stroke="#0088FE" name="Rango Móvil" />
                    <Line type="monotone" dataKey="mrCl" stroke="#8884d8" name="Línea Central MR" strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="mrUcl" stroke="#FF0000" name="LCS MR" strokeDasharray="3 3" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Análisis por Posición */}
        {stats.positions.length > 0 && (
          <div className="bg-white p-6 border rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Análisis por Posición</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.positions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="position" angle={-45} textAnchor="end" height={80}>
                    <Label value="Posición" offset={-5} position="insideBottom" />
                  </XAxis>

                  <YAxis>
                    <Label
                      value="Distancia Promedio (m)"
                      angle={-90}
                      position="insideLeft"
                      style={{ textAnchor: "middle" }}
                    />
                  </YAxis>

                  <Tooltip />
                  <Bar dataKey="average" fill="#FF8042" name="Distancia Promedio (m)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Análisis de Outliers */}
        {stats.outliers.length > 0 && (
          <div className="bg-white p-6 border rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Análisis de Valores Atípicos (Outliers)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-red-50 rounded border border-red-200">
                <h3 className="font-semibold text-red-700">Total Outliers</h3>
                <p className="text-3xl font-bold text-red-800">{stats.outliers.length}</p>
              </div>
              <div className="p-4 bg-orange-50 rounded border border-orange-200">
                <h3 className="font-semibold text-orange-700">Porcentaje</h3>
                <p className="text-3xl font-bold text-orange-800">
                  {((stats.outliers.length / stats.count) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded border border-blue-200">
                <h3 className="font-semibold text-blue-700">Rango Outliers</h3>
                <p className="text-lg font-bold text-blue-800">
                  {Math.min(...stats.outliers).toFixed(2)} - {Math.max(...stats.outliers).toFixed(2)} m
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ====================== TABLA DE DATOS ============================ */}
      <div className="mt-8 bg-white rounded-lg border shadow-sm">
        <div className="p-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold">Datos de Monitoreo Soterrado</h2>
        </div>
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
            {filteredData.length === 0 ? (
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
              filteredData.map((d, index) => (
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

      {/* Contador de registros - CORREGIDO */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Mostrando {filteredData.length} registros</span>
            {showAll && <span className="ml-2 text-orange-600">(Todos los registros)</span>}
            {!showAll && <span className="ml-2 text-gray-500">(Más recientes)</span>}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setLimit(50)}
              className={`px-3 py-1 text-xs rounded transition-colors ${limit === 50 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              50
            </button>
            <button
              onClick={() => setLimit(100)}
              className={`px-3 py-1 text-xs rounded transition-colors ${limit === 100 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              100
            </button>
            <button
              onClick={() => setLimit(200)}
              className={`px-3 py-1 text-xs rounded transition-colors ${limit === 200 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
