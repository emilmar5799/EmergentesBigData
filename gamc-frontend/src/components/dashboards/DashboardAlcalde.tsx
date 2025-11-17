// Dashboard para ALCALDE_GAMC - Solo visualización de dashboards y reportes globales
export default function DashboardAlcalde() {
  // Datos estáticos para gráficos
  const airQualityData = [65, 70, 75, 80, 85, 82, 85, 88, 85, 87, 85, 90];
  const soundLevelData = [45, 42, 40, 38, 42, 45, 42, 40, 42, 44, 42, 42];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header mejorado */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl">
                👑
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-1">Dashboard Ejecutivo</h1>
                <p className="text-indigo-100 text-lg">Alcalde GAMC</p>
              </div>
            </div>
            <p className="text-indigo-100">
              Vista general de la calidad del aire, sonido y soterrados
            </p>
          </div>
          <div className="hidden lg:block text-9xl opacity-10">📊</div>
        </div>
      </div>

      {/* Métricas Globales mejoradas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Calidad del Aire */}
        <div className="group bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-3xl shadow-2xl p-8 text-white transform transition-all hover:scale-105 hover:shadow-3xl cursor-pointer relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Calidad del Aire</h3>
              <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl transform group-hover:rotate-12 transition-transform">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
            </div>
            <div className="text-6xl font-bold mb-4">85%</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-100">Índice de calidad</span>
                <span className="font-bold">Buena</span>
              </div>
              <div className="h-3 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Nivel de Sonido */}
        <div className="group bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 rounded-3xl shadow-2xl p-8 text-white transform transition-all hover:scale-105 hover:shadow-3xl cursor-pointer relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Nivel de Sonido</h3>
              <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl transform group-hover:rotate-12 transition-transform">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.383 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.383l4-4.617a1 1 0 011.617.793zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="text-6xl font-bold mb-4">42 dB</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-100">Nivel</span>
                <span className="font-bold">Aceptable</span>
              </div>
              <div className="h-3 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Soterrados */}
        <div className="group bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 text-white transform transition-all hover:scale-105 hover:shadow-3xl cursor-pointer relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Soterrados</h3>
              <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl transform group-hover:rotate-12 transition-transform">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
            </div>
            <div className="text-6xl font-bold mb-4">12</div>
            <p className="text-purple-100 text-lg font-medium">Sensores activos</p>
          </div>
        </div>
      </div>

      {/* Gráficos de Reportes Globales mejorados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico Calidad del Aire */}
        <div className="bg-white rounded-3xl shadow-xl p-6 transform transition-all hover:shadow-2xl border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              Calidad del Aire
            </h2>
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-xs font-bold">
              Últimos 30 días
            </span>
          </div>
          <div className="h-80 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-100">
            <div className="h-full flex items-end justify-between gap-2">
              {airQualityData.map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center group">
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-500 hover:from-blue-600 hover:to-blue-500 cursor-pointer group-hover:opacity-80"
                    style={{ height: `${(value / 100) * 100}%` }}
                    title={`${value}%`}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2 font-medium">{index + 1}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span>Índice de calidad del aire (%)</span>
            </div>
          </div>
        </div>

        {/* Gráfico Niveles de Sonido */}
        <div className="bg-white rounded-3xl shadow-xl p-6 transform transition-all hover:shadow-2xl border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.383 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.383l4-4.617a1 1 0 011.617.793zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                </svg>
              </div>
              Niveles de Sonido
            </h2>
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-xl text-xs font-bold">
              Últimos 30 días
            </span>
          </div>
          <div className="h-80 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-100">
            <div className="h-full flex items-end justify-between gap-2">
              {soundLevelData.map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center group">
                  <div 
                    className="w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t-lg transition-all duration-500 hover:from-green-600 hover:to-green-500 cursor-pointer group-hover:opacity-80"
                    style={{ height: `${(value / 60) * 100}%` }}
                    title={`${value} dB`}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2 font-medium">{index + 1}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span>Nivel de sonido (dB)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Resumen de Soterrados mejorado */}
      <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            Sensores Soterrados
          </h2>
          <span className="px-5 py-2.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-xl text-sm font-bold border border-purple-200">
            12 Activos
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 via-purple-50 to-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Sensor</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Ubicación</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Última Lectura</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-purple-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50"></div>
                      <span className="text-sm font-bold text-gray-900">Sensor ST-{i.toString().padStart(2, '0')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Zona {i}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-4 py-2 inline-flex text-xs leading-5 font-bold rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-2 border-green-200">
                      ✓ Activo
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Hace {i * 5} min
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Nota de solo lectura mejorada */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-l-4 border-indigo-500 rounded-2xl p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-indigo-100 flex items-center justify-center text-2xl flex-shrink-0">
            ℹ️
          </div>
          <div>
            <p className="text-base font-bold text-indigo-900 mb-1">Modo de Solo Lectura</p>
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
