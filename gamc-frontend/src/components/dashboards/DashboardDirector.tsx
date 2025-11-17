// Dashboard para DIRECTOR_DGEYCI - Supervisión, informes y métricas detalladas
export default function DashboardDirector() {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header mejorado */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <span className="text-5xl">📊</span>
              Dashboard de Supervisión
            </h1>
            <p className="text-blue-100 text-lg">
              Supervisión de operación, generación de informes y revisión de métricas detalladas
            </p>
          </div>
          <button className="px-6 py-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center gap-2">
            <span>📄</span>
            <span>Generar Informe</span>
          </button>
        </div>
      </div>

      {/* Métricas Detalladas mejoradas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="group bg-white rounded-xl shadow-lg p-5 border-l-4 border-blue-500 transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Sensores Activos</h3>
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-xl">
              📡
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">24/25</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full" style={{ width: '96%' }}></div>
            </div>
            <span className="text-xs font-semibold text-green-600">96%</span>
          </div>
        </div>

        <div className="group bg-white rounded-xl shadow-lg p-5 border-l-4 border-orange-500 transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Alertas Hoy</h3>
            <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center text-xl">
              ⚠️
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">3</p>
          <p className="text-xs text-orange-600 font-semibold">2 críticas</p>
        </div>

        <div className="group bg-white rounded-xl shadow-lg p-5 border-l-4 border-purple-500 transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Promedio Aire</h3>
            <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center text-xl">
              🌬️
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">82%</p>
          <p className="text-xs text-blue-600 font-semibold">+2% vs ayer ↗️</p>
        </div>

        <div className="group bg-white rounded-xl shadow-lg p-5 border-l-4 border-green-500 transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Uptime Sistema</h3>
            <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center text-xl">
              ✅
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">99.8%</p>
          <p className="text-xs text-green-600 font-semibold">Últimos 30 días</p>
        </div>
      </div>

      {/* Gráficos Detallados mejorados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 transform transition-all hover:shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-3xl">📈</span>
              Métricas de Calidad del Aire
            </h2>
            <select className="text-sm border-2 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium">
              <option>Últimos 7 días</option>
              <option>Últimos 30 días</option>
              <option>Últimos 90 días</option>
            </select>
          </div>
          <div className="h-80 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl flex items-center justify-center border-2 border-dashed border-blue-200">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-pulse">📊</div>
              <p className="text-gray-700 font-semibold">Gráfico detallado de calidad del aire</p>
              <p className="text-sm text-gray-500 mt-2">PM2.5, PM10, O3, NO2</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 transform transition-all hover:shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="text-3xl">🔊</span>
              Análisis de Niveles de Sonido
            </h2>
            <select className="text-sm border-2 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium">
              <option>Últimos 7 días</option>
              <option>Últimos 30 días</option>
              <option>Últimos 90 días</option>
            </select>
          </div>
          <div className="h-80 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-xl flex items-center justify-center border-2 border-dashed border-green-200">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-pulse">📊</div>
              <p className="text-gray-700 font-semibold">Análisis de niveles de sonido</p>
              <p className="text-sm text-gray-500 mt-2">Distribución por zonas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de Alertas mejorada */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-3xl">🚨</span>
            Alertas y Eventos Recientes
          </h2>
          <span className="px-4 py-2 bg-red-100 text-red-700 rounded-xl text-sm font-semibold">
            3 Alertas
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Fecha/Hora</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Sensor</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Severidad</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Acción</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {[
                { tipo: 'Calidad Aire', sensor: 'A-01', severidad: 'Crítica', hora: '10:30', icon: '🌬️' },
                { tipo: 'Sonido', sensor: 'S-05', severidad: 'Media', hora: '09:15', icon: '🔊' },
                { tipo: 'Soterrado', sensor: 'ST-12', severidad: 'Baja', hora: '08:45', icon: '📊' },
              ].map((alerta, i) => (
                <tr key={i} className="hover:bg-indigo-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ⏰ {alerta.hora}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 flex items-center gap-2">
                    <span>{alerta.icon}</span>
                    <span>{alerta.tipo}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {alerta.sensor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      alerta.severidad === 'Crítica' ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200' :
                      alerta.severidad === 'Media' ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border border-yellow-200' :
                      'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200'
                    }`}>
                      {alerta.severidad}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline">
                      Ver Detalles →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generación de Informes mejorada */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-3xl">📄</span>
          Generar Informe
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="group border-2 border-gray-200 rounded-xl p-6 hover:border-indigo-500 hover:bg-indigo-50 transition-all cursor-pointer transform hover:scale-105">
            <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">📄</div>
            <h3 className="font-bold text-gray-900 mb-2">Informe Diario</h3>
            <p className="text-sm text-gray-600">Resumen del día actual</p>
          </div>
          <div className="group border-2 border-gray-200 rounded-xl p-6 hover:border-indigo-500 hover:bg-indigo-50 transition-all cursor-pointer transform hover:scale-105">
            <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">📊</div>
            <h3 className="font-bold text-gray-900 mb-2">Informe Semanal</h3>
            <p className="text-sm text-gray-600">Análisis de la última semana</p>
          </div>
          <div className="group border-2 border-gray-200 rounded-xl p-6 hover:border-indigo-500 hover:bg-indigo-50 transition-all cursor-pointer transform hover:scale-105">
            <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">📈</div>
            <h3 className="font-bold text-gray-900 mb-2">Informe Mensual</h3>
            <p className="text-sm text-gray-600">Resumen del mes completo</p>
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
