// Dashboard para USUARIO - Visualización de datos, consultas y reporte de incidencias
export default function DashboardUsuario() {
  // Datos estáticos para visualización
  const sensorData = [
    { sensor: 'A-01', tipo: 'Aire', valor: 85, fecha: '10:30', estado: 'Normal', icon: '🌬️' },
    { sensor: 'S-05', tipo: 'Sonido', valor: 42, fecha: '10:28', estado: 'Normal', icon: '🔊' },
    { sensor: 'ST-12', tipo: 'Soterrado', valor: 100, fecha: '10:25', estado: 'Normal', icon: '📊' },
    { sensor: 'A-03', tipo: 'Aire', valor: 78, fecha: '10:20', estado: 'Advertencia', icon: '🌬️' },
    { sensor: 'S-08', tipo: 'Sonido', valor: 55, fecha: '10:15', estado: 'Normal', icon: '🔊' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header mejorado */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl">
              👤
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-1">Panel de Usuario Técnico</h1>
              <p className="text-green-100 text-lg">Usuario del Sistema</p>
            </div>
          </div>
          <p className="text-green-100">
            Visualización de datos específicos, ejecución de consultas y reporte de incidencias
          </p>
        </div>
      </div>

      {/* Accesos Rápidos mejorados */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="group bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-3xl shadow-2xl p-8 text-white cursor-pointer transform transition-all hover:scale-105 hover:shadow-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 transform group-hover:rotate-12 transition-transform">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Consultar Datos</h3>
            <p className="text-blue-100 text-sm">Ejecutar consultas específicas</p>
          </div>
        </div>

        <div className="group bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 rounded-3xl shadow-2xl p-8 text-white cursor-pointer transform transition-all hover:scale-105 hover:shadow-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 transform group-hover:rotate-12 transition-transform">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Visualizar Datos</h3>
            <p className="text-green-100 text-sm">Ver datos de sensores</p>
          </div>
        </div>

        <div className="group bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 rounded-3xl shadow-2xl p-8 text-white cursor-pointer transform transition-all hover:scale-105 hover:shadow-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 transform group-hover:rotate-12 transition-transform">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Reportar Incidencia</h3>
            <p className="text-orange-100 text-sm">Notificar problemas</p>
          </div>
        </div>
      </div>

      {/* Consultas de Datos mejoradas */}
      <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          Consultar Datos Específicos
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Sensor</label>
              <select className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium">
                <option>Todos</option>
                <option>Calidad del Aire</option>
                <option>Sonido</option>
                <option>Soterrados</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha Desde</label>
              <input
                type="date"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha Hasta</label>
              <input
                type="date"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            Ejecutar Consulta
          </button>
        </div>
      </div>

      {/* Visualización de Datos mejorada con gráfico */}
      <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          Datos de Sensores (Últimas Lecturas)
        </h2>
        
        {/* Gráfico de barras simple */}
        <div className="mb-6 h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200">
          <div className="h-full flex items-end justify-between gap-3">
            {sensorData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center group">
                <div 
                  className={`w-full rounded-t-xl transition-all duration-500 hover:opacity-80 cursor-pointer ${
                    item.estado === 'Normal' 
                      ? 'bg-gradient-to-t from-green-500 to-emerald-400' 
                      : 'bg-gradient-to-t from-yellow-500 to-orange-400'
                  }`}
                  style={{ height: `${(item.valor / 100) * 100}%` }}
                  title={`${item.sensor}: ${item.valor}${item.tipo === 'Sonido' ? ' dB' : item.tipo === 'Aire' ? '%' : ''}`}
                ></div>
                <span className="text-xs text-gray-600 mt-2 font-medium">{item.sensor}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabla de datos */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Sensor</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Valor</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Fecha/Hora</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {sensorData.map((dato, i) => (
                <tr key={i} className="hover:bg-indigo-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{dato.icon}</span>
                      <span className="text-sm font-semibold text-gray-900">{dato.sensor}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{dato.tipo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    {dato.valor}{dato.tipo === 'Sonido' ? ' dB' : dato.tipo === 'Aire' ? '%' : ''}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {dato.fecha}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-4 py-2 inline-flex text-xs leading-5 font-bold rounded-full ${
                      dato.estado === 'Normal' 
                        ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-2 border-green-200' 
                        : 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-2 border-yellow-200'
                    }`}>
                      {dato.estado === 'Normal' ? '✓' : '⚠'} {dato.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reporte de Incidencias mejorado */}
      <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-orange-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          Reportar Incidencia
        </h2>
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Incidencia</label>
            <select className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium">
              <option>Seleccione un tipo</option>
              <option>Sensor no responde</option>
              <option>Lectura anómala</option>
              <option>Error de conexión</option>
              <option>Otro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Sensor Afectado</label>
            <input
              type="text"
              placeholder="Ej: A-01, S-05, ST-12"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
            <textarea
              rows={4}
              placeholder="Describe la incidencia en detalle..."
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              <span>Enviar Reporte</span>
            </button>
            <button
              type="button"
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition-all transform hover:scale-105"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>

      {/* Mis Reportes Enviados mejorados */}
      <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-indigo-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
          </div>
          Mis Reportes Enviados
        </h2>
        <div className="space-y-4">
          {[
            { id: 'R-001', tipo: 'Sensor no responde', sensor: 'A-03', fecha: '2024-01-15 09:30', estado: 'En revisión' },
            { id: 'R-002', tipo: 'Lectura anómala', sensor: 'S-08', fecha: '2024-01-14 15:20', estado: 'Resuelto' },
          ].map((reporte) => (
            <div key={reporte.id} className="border-2 border-gray-200 rounded-2xl p-5 hover:border-indigo-500 hover:bg-indigo-50 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-gray-900 text-lg">{reporte.id}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-700 font-semibold">{reporte.tipo}</span>
                  </div>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Sensor: <span className="font-semibold">{reporte.sensor}</span> | 
                    <svg className="w-4 h-4 text-gray-400 ml-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {reporte.fecha}
                  </p>
                </div>
                <span className={`px-4 py-2 text-xs font-bold rounded-xl ${
                  reporte.estado === 'Resuelto' 
                    ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-2 border-green-200' 
                    : 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-2 border-yellow-200'
                }`}>
                  {reporte.estado === 'Resuelto' ? '✓' : '⏳'} {reporte.estado}
                </span>
              </div>
            </div>
          ))}
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
