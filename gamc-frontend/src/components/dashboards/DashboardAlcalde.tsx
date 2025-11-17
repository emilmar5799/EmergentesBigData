// Dashboard para ALCALDE_GAMC - Solo visualización de dashboards y reportes globales
export default function DashboardAlcalde() {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header mejorado */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-2xl shadow-2xl p-8 text-white transform transition-all hover:shadow-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <span className="text-5xl">👑</span>
              Dashboard Ejecutivo
            </h1>
            <p className="text-indigo-100 text-lg">
              Vista general de la calidad del aire, sonido y soterrados
            </p>
          </div>
          <div className="hidden lg:block text-8xl opacity-20">📊</div>
        </div>
      </div>

      {/* Métricas Globales mejoradas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="group bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl shadow-xl p-6 text-white transform transition-all hover:scale-105 hover:shadow-2xl cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Calidad del Aire</h3>
            <div className="h-14 w-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl transform group-hover:rotate-12 transition-transform">
              🌬️
            </div>
          </div>
          <div className="text-5xl font-bold mb-2">85%</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: '85%' }}></div>
            </div>
            <span className="text-blue-100 text-sm font-medium">Buena</span>
          </div>
        </div>

        <div className="group bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 rounded-2xl shadow-xl p-6 text-white transform transition-all hover:scale-105 hover:shadow-2xl cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Nivel de Sonido</h3>
            <div className="h-14 w-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl transform group-hover:rotate-12 transition-transform">
              🔊
            </div>
          </div>
          <div className="text-5xl font-bold mb-2">42 dB</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: '70%' }}></div>
            </div>
            <span className="text-green-100 text-sm font-medium">Aceptable</span>
          </div>
        </div>

        <div className="group bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 rounded-2xl shadow-xl p-6 text-white transform transition-all hover:scale-105 hover:shadow-2xl cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Soterrados</h3>
            <div className="h-14 w-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl transform group-hover:rotate-12 transition-transform">
              📊
            </div>
          </div>
          <div className="text-5xl font-bold mb-2">12</div>
          <p className="text-purple-100 text-sm font-medium">Sensores activos</p>
        </div>
      </div>

      {/* Gráficos de Reportes Globales mejorados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 transform transition-all hover:shadow-2xl border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-3xl">📈</span>
              Calidad del Aire
            </h2>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
              Últimos 30 días
            </span>
          </div>
          <div className="h-72 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center border-2 border-dashed border-blue-200">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-pulse">📊</div>
              <p className="text-gray-600 font-medium">Gráfico de tendencia</p>
              <p className="text-sm text-gray-400 mt-2">Datos simulados para visualización</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 transform transition-all hover:shadow-2xl border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-3xl">🔊</span>
              Niveles de Sonido
            </h2>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
              Últimos 30 días
            </span>
          </div>
          <div className="h-72 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl flex items-center justify-center border-2 border-dashed border-green-200">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-pulse">📊</div>
              <p className="text-gray-600 font-medium">Análisis de sonido</p>
              <p className="text-sm text-gray-400 mt-2">Datos simulados para visualización</p>
            </div>
          </div>
        </div>
      </div>

      {/* Resumen de Soterrados mejorado */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-3xl">🔌</span>
            Sensores Soterrados
          </h2>
          <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-xl text-sm font-semibold">
            {12} Activos
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Sensor
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Ubicación
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Última Lectura
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-indigo-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-sm font-semibold text-gray-900">Sensor {i}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    📍 Zona {i}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200">
                      ✓ Activo
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ⏰ Hace {i * 5} min
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Nota de solo lectura mejorada */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-l-4 border-indigo-500 rounded-xl p-6 shadow-md">
        <div className="flex items-start gap-3">
          <div className="text-3xl">ℹ️</div>
          <div>
            <p className="text-sm font-bold text-indigo-900 mb-1">Modo de Solo Lectura</p>
            <p className="text-sm text-indigo-700">
              Este rol tiene acceso de solo lectura. No puede editar ni modificar información del sistema.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
