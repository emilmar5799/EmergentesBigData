// Dashboard para ADMIN_SISTEMA - Gestión completa del sistema
import { useState } from 'react';

export default function DashboardAdmin() {
  const [activeTab, setActiveTab] = useState('Usuarios');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header mejorado */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-indigo-800 rounded-2xl shadow-2xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <span className="text-5xl">⚙️</span>
          Panel de Administración
        </h1>
        <p className="text-gray-300 text-lg">
          Gestión de usuarios, configuración de sensores, monitoreo del sistema y revisión de logs
        </p>
      </div>

      {/* Métricas del Sistema mejoradas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="group bg-white rounded-xl shadow-lg p-5 border-l-4 border-blue-500 transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Usuarios Activos</h3>
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-xl">
              👥
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">12</p>
          <p className="text-xs text-gray-500 font-semibold">4 roles diferentes</p>
        </div>

        <div className="group bg-white rounded-xl shadow-lg p-5 border-l-4 border-green-500 transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Sensores Configurados</h3>
            <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center text-xl">
              📡
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">25</p>
          <p className="text-xs text-green-600 font-semibold">24 operativos</p>
        </div>

        <div className="group bg-white rounded-xl shadow-lg p-5 border-l-4 border-red-500 transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Errores Hoy</h3>
            <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center text-xl">
              ⚠️
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">2</p>
          <p className="text-xs text-red-600 font-semibold">1 crítico</p>
        </div>

        <div className="group bg-white rounded-xl shadow-lg p-5 border-l-4 border-purple-500 transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Logs Generados</h3>
            <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center text-xl">
              📝
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">1,234</p>
          <p className="text-xs text-gray-500 font-semibold">Últimas 24h</p>
        </div>
      </div>

      {/* Tabs de Gestión mejoradas */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <nav className="flex -mb-px">
            {['Usuarios', 'Sensores', 'Monitoreo', 'Logs'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-bold transition-all ${
                  activeTab === tab
                    ? 'text-indigo-600 border-b-2 border-indigo-600 bg-white'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Gestión de Usuarios */}
          {activeTab === 'Usuarios' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="text-3xl">👥</span>
                  Gestión de Usuarios
                </h2>
                <button className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center gap-2">
                  <span>➕</span>
                  <span>Nuevo Usuario</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Rol</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {[
                      { nombre: 'Alcalde GAMC', email: 'alcalde@gamc.com', rol: 'ALCALDE_GAMC', estado: 'Activo' },
                      { nombre: 'Director DGEYCI', email: 'director@dgeyci.com', rol: 'DIRECTOR_DGEYCI', estado: 'Activo' },
                      { nombre: 'Usuario Técnico 1', email: 'usuario1@tecnico.com', rol: 'USUARIO', estado: 'Activo' },
                    ].map((user, i) => (
                      <tr key={i} className="hover:bg-indigo-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                              {user.nombre.charAt(0)}
                            </div>
                            <span className="text-sm font-semibold text-gray-900">{user.nombre}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.rol}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200">
                            ✓ {user.estado}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                          <button className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline">✏️ Editar</button>
                          <button className="text-red-600 hover:text-red-800 font-semibold hover:underline">🗑️ Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Configuración de Sensores */}
          {activeTab === 'Sensores' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <span className="text-3xl">📡</span>
                  Configuración de Sensores
                </h2>
                <button className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center gap-2">
                  <span>➕</span>
                  <span>Agregar Sensor</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['Aire', 'Sonido', 'Soterrado'].map((tipo, i) => (
                  <div key={i} className="border-2 border-gray-200 rounded-xl p-6 hover:border-indigo-500 hover:bg-indigo-50 transition-all cursor-pointer transform hover:scale-105">
                    <div className="text-4xl mb-3">{tipo === 'Aire' ? '🌬️' : tipo === 'Sonido' ? '🔊' : '📊'}</div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Sensores de {tipo}</h3>
                    <p className="text-3xl font-bold text-indigo-600 mb-2">8</p>
                    <button className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold hover:underline">
                      Ver Configuración →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Monitoreo del Sistema */}
          {activeTab === 'Monitoreo' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-3xl">🖥️</span>
                Monitoreo del Sistema
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">🟢</span>
                    Estado del Servidor
                  </h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-4 w-4 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-lg font-bold text-gray-900">Operativo</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">CPU:</span>
                      <span className="font-bold text-gray-900">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">RAM:</span>
                      <span className="font-bold text-gray-900">62%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Disco:</span>
                      <span className="font-bold text-gray-900">38%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">💾</span>
                    Base de Datos
                  </h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-4 w-4 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-lg font-bold text-gray-900">Conectada</span>
                  </div>
                  <p className="text-sm text-gray-600">Última sincronización: hace 2 min</p>
                </div>
              </div>
            </div>
          )}

          {/* Logs y Errores */}
          {activeTab === 'Logs' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-3xl">📝</span>
                Logs y Errores Recientes
              </h2>
              <div className="bg-gray-900 rounded-xl p-6 font-mono text-sm text-green-400 max-h-96 overflow-y-auto shadow-inner">
                <div className="space-y-2">
                  {[
                    '[2024-01-15 10:30:15] INFO: Usuario autenticado: admin@sistema.com',
                    '[2024-01-15 10:28:42] WARN: Sensor A-05 sin respuesta por 5 minutos',
                    '[2024-01-15 10:25:10] INFO: Backup de base de datos completado',
                    '[2024-01-15 10:20:33] ERROR: Error de conexión con sensor S-12',
                    '[2024-01-15 10:15:07] INFO: Nuevo usuario creado: usuario@tecnico.com',
                    '[2024-01-15 10:10:22] INFO: Sistema iniciado correctamente',
                  ].map((log, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-gray-500">{log.split(']')[0]}]</span>
                      <span className={log.includes('ERROR') ? 'text-red-400' : log.includes('WARN') ? 'text-yellow-400' : 'text-green-400'}>
                        {log.split('] ')[1]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <button className="mt-4 px-5 py-2.5 bg-gray-700 hover:bg-gray-800 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg">
                Ver Todos los Logs
              </button>
            </div>
          )}
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
