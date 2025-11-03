// src/pages/Login.tsx
export default function Login() {
  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <div className="mx-auto mb-3 h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-2xl">
            🔐
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Iniciar sesión</h1>
          <p className="text-slate-500 text-sm">Ingresa con tu cuenta GAMC</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Correo
            </label>
            <input
              type="email"
              placeholder="tucorreo@dominio.com"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="********"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
