// Dashboard para USUARIO - Visualización de datos, consultas y reporte de incidencias
export default function DashboardUsuario() {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header mejorado */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl shadow-2xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <span className="text-5xl">👤</span>
          Panel de Usuario Técnico
        </h1>
        <p className="text-green-100 text-lg">
          Visualización de datos específicos, ejecución de consultas y reporte de incidencias
        </p>
      </div>

      {/* Accesos Rápidos mejorados */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="group bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl">
          <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-transform">🔍</div>
          <h3 className="text-xl font-bold mb-2">Consultar Datos</h3>
          <p className="text-blue-100 text-sm">Ejecutar consultas específicas</p>
        </div>

        <div className="group bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 rounded-2xl shadow-xl p-8 text-white cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl">
          <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-transform">📊</div>
          <h3 className="text-xl font-bold mb-2">Visualizar Datos</h3>
          <p className="text-green-100 text-sm">Ver datos de sensores</p>
        </div>

        <div className="group bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 rounded-2xl shadow-xl p-8 text-white cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl">
          <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-transform">⚠️</div>
          <h3 className="text-xl font-bold mb-2">Reportar Incidencia</h3>
          <p className="text-orange-100 text-sm">Notificar problemas</p>
        </div>
      </div>

      {/* Consultas de Datos mejoradas */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-3xl">🔍</span>
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
          <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg">
            🔍 Ejecutar Consulta
          </button>
        </div>
      </div>

      {/* Visualización de Datos mejorada */}
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-3xl">📊</span>
          Datos de Sensores (Últimas Lecturas)
        </h2>
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
              {[
                { sensor: 'A-01', tipo: 'Aire', valor: '85%', fecha: '10:30', estado: 'Normal', icon: '🌬️' },
                { sensor: 'S-05', tipo: 'Sonido', valor: '42 dB', fecha: '10:28', estado: 'Normal', icon: '🔊' },
                { sensor: 'ST-12', tipo: 'Soterrado', valor: 'OK', fecha: '10:25', estado: 'Normal', icon: '📊' },
                { sensor: 'A-03', tipo: 'Aire', valor: '78%', fecha: '10:20', estado: 'Advertencia', icon: '🌬️' },
                { sensor: 'S-08', tipo: 'Sonido', valor: '55 dB', fecha: '10:15', estado: 'Normal', icon: '🔊' },
              ].map((dato, i) => (
                <tr key={i} className="hover:bg-indigo-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{dato.icon}</span>
                      <span className="text-sm font-semibold text-gray-900">{dato.sensor}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{dato.tipo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{dato.valor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">⏰ {dato.fecha}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      dato.estado === 'Normal' 
                        ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200' 
                        : 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border border-yellow-200'
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
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-3xl">⚠️</span>
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
              <span>📤</span>
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
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="text-3xl">📋</span>
          Mis Reportes Enviados
        </h2>
        <div className="space-y-4">
          {[
            { id: 'R-001', tipo: 'Sensor no responde', sensor: 'A-03', fecha: '2024-01-15 09:30', estado: 'En revisión' },
            { id: 'R-002', tipo: 'Lectura anómala', sensor: 'S-08', fecha: '2024-01-14 15:20', estado: 'Resuelto' },
          ].map((reporte) => (
            <div key={reporte.id} className="border-2 border-gray-200 rounded-xl p-5 hover:border-indigo-500 hover:bg-indigo-50 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-gray-900 text-lg">{reporte.id}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-700 font-semibold">{reporte.tipo}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    📍 Sensor: <span className="font-semibold">{reporte.sensor}</span> | ⏰ {reporte.fecha}
                  </p>
                </div>
                <span className={`px-4 py-2 text-xs font-bold rounded-xl ${
                  reporte.estado === 'Resuelto' 
                    ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200' 
                    : 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border border-yellow-200'
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
