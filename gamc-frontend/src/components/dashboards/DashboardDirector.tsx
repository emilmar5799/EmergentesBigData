// Dashboard para DIRECTOR_DGEYCI - Supervisión, informes y métricas detalladas
export default function DashboardDirector() {
  // Datos estáticos para gráficos
  const airMetrics = [78, 80, 82, 79, 85, 82, 84, 86, 82, 85, 82, 88];
  const soundMetrics = [40, 42, 38, 45, 42, 40, 43, 42, 41, 42, 40, 42];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header mejorado */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl">
                📊
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-1">Dashboard de Supervisión</h1>
                <p className="text-blue-100 text-lg">Director DGEYCI</p>
              </div>
            </div>
            <p className="text-blue-100">
              Supervisión de operación, generación de informes y revisión de métricas detalladas
            </p>
          </div>
          <button className="px-6 py-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
            </svg>
            <span>Generar Informe</span>
          </button>
        </div>
      </div>

      {/* Métricas Detalladas mejoradas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="group bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500 transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Sensores Activos</h3>
            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-2">24/25</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-1000" style={{ width: '96%' }}></div>
            </div>
            <span className="text-xs font-bold text-green-600">96%</span>
          </div>
        </div>

        <div className="group bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500 transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Alertas Hoy</h3>
            <div className="h-12 w-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-2">3</p>
          <p className="text-xs text-orange-600 font-bold">2 críticas</p>
        </div>

        <div className="group bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Promedio Aire</h3>
            <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-2">82%</p>
          <p className="text-xs text-blue-600 font-bold flex items-center gap-1">+2% vs ayer <span>↗️</span></p>
        </div>

        <div className="group bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Uptime Sistema</h3>
            <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-900 mb-2">99.8%</p>
          <p className="text-xs text-green-600 font-bold">Últimos 30 días</p>
        </div>
      </div>

      {/* Gráficos Detallados mejorados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 transform transition-all hover:shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              Métricas de Calidad del Aire
            </h2>
            <select className="text-sm border-2 border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium">
              <option>Últimos 7 días</option>
              <option>Últimos 30 días</option>
              <option>Últimos 90 días</option>
            </select>
          </div>
          <div className="h-80 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-100">
            <div className="h-full flex items-end justify-between gap-2">
              {airMetrics.map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center group">
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500 via-indigo-500 to-purple-500 rounded-t-xl transition-all duration-500 hover:opacity-80 cursor-pointer"
                    style={{ height: `${(value / 100) * 100}%` }}
                    title={`${value}%`}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2 font-medium">{index + 1}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span>PM2.5, PM10, O3, NO2</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 transform transition-all hover:shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.383 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.383l4-4.617a1 1 0 011.617.793zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                </svg>
              </div>
              Análisis de Niveles de Sonido
            </h2>
            <select className="text-sm border-2 border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium">
              <option>Últimos 7 días</option>
              <option>Últimos 30 días</option>
              <option>Últimos 90 días</option>
            </select>
          </div>
          <div className="h-80 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-green-100">
            <div className="h-full flex items-end justify-between gap-2">
              {soundMetrics.map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center group">
                  <div 
                    className="w-full bg-gradient-to-t from-green-500 via-emerald-500 to-teal-500 rounded-t-xl transition-all duration-500 hover:opacity-80 cursor-pointer"
                    style={{ height: `${(value / 60) * 100}%` }}
                    title={`${value} dB`}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2 font-medium">{index + 1}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span>Distribución por zonas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de Alertas mejorada */}
      <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-red-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            Alertas y Eventos Recientes
          </h2>
          <span className="px-5 py-2.5 bg-gradient-to-r from-red-100 to-pink-100 text-red-700 rounded-xl text-sm font-bold border border-red-200">
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {alerta.hora}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 flex items-center gap-2">
                    <span className="text-xl">{alerta.icon}</span>
                    <span>{alerta.tipo}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{alerta.sensor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-4 py-2 inline-flex text-xs leading-5 font-bold rounded-full ${
                      alerta.severidad === 'Crítica' ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-2 border-red-200' :
                      alerta.severidad === 'Media' ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-2 border-yellow-200' :
                      'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-2 border-green-200'
                    }`}>
                      {alerta.severidad}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-indigo-600 hover:text-indigo-800 font-bold hover:underline flex items-center gap-1">
                      Ver Detalles <span>→</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generación de Informes mejorada */}
      <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-indigo-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
            </svg>
          </div>
          Generar Informe
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="group border-2 border-gray-200 rounded-2xl p-6 hover:border-indigo-500 hover:bg-indigo-50 transition-all cursor-pointer transform hover:scale-105">
            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">📄</div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Informe Diario</h3>
            <p className="text-sm text-gray-600">Resumen del día actual</p>
          </div>
          <div className="group border-2 border-gray-200 rounded-2xl p-6 hover:border-indigo-500 hover:bg-indigo-50 transition-all cursor-pointer transform hover:scale-105">
            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">📊</div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Informe Semanal</h3>
            <p className="text-sm text-gray-600">Análisis de la última semana</p>
          </div>
          <div className="group border-2 border-gray-200 rounded-2xl p-6 hover:border-indigo-500 hover:bg-indigo-50 transition-all cursor-pointer transform hover:scale-105">
            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">📈</div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Informe Mensual</h3>
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
