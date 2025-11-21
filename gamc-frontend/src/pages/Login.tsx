import { useState } from "react";
import { API } from "../api/BaseUrl";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await API.post("/api/auth/login", { email, password });
      const userData = res.data.user;
      login(userData);

      if (userData.role === "ADMIN_SISTEMA") navigate("/users");
      else navigate("/");
    } catch (error) {
      setErrorMsg("Credenciales inválidas");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-neutral-800 flex items-center justify-center px-4">
      
      {/* CARD */}
      <div className="w-full max-w-md bg-neutral-900/60 backdrop-blur-xl border border-neutral-700 rounded-2xl shadow-2xl p-10 animate-fadeIn">
        
        {/* ICONO */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-neutral-800 border border-neutral-600 flex items-center justify-center text-blue-400 text-3xl font-bold shadow-lg">
            IoT
          </div>
        </div>

        {/* TITULO */}
        <h1 className="text-center text-3xl font-extrabold text-white mb-2 tracking-wide">
          Monitoreo GAMC
        </h1>

        <p className="text-center text-neutral-400 text-sm mb-6">
          Plataforma oficial de análisis en tiempo real de 
          <span className="text-blue-400 font-semibold"> Aire</span>, 
          <span className="text-blue-400 font-semibold"> Sonido</span> y 
          <span className="text-blue-400 font-semibold"> Soterrados</span>.
        </p>

        {/* ERROR */}
        {errorMsg && (
          <p className="text-red-400 bg-red-900/20 border border-red-700 px-3 py-2 rounded mb-4 text-center">
            {errorMsg}
          </p>
        )}

        {/* FORM */}
        <form className="space-y-5" onSubmit={handleLogin}>

          <div>
            <label className="text-neutral-300 text-sm">Correo</label>
            <input
              type="email"
              placeholder="usuario@gamc.gob.bo"
              className="w-full mt-1 bg-neutral-800 text-white border border-neutral-700 px-3 py-2 rounded-lg outline-none focus:border-blue-500 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-neutral-300 text-sm">Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full mt-1 bg-neutral-800 text-white border border-neutral-700 px-3 py-2 rounded-lg outline-none focus:border-blue-500 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white text-lg py-2 rounded-xl shadow-lg shadow-blue-900/40 transition-all"
          >
            Ingresar
          </button>
        </form>

        {/* FOOTER INFO */}
        <p className="mt-6 text-center text-neutral-500 text-xs">
          Gobierno Autónomo Municipal de Cochabamba · 
          <span className="text-neutral-400"> Dirección de GEyCI</span>
        </p>
      </div>
    </div>
  );
}
