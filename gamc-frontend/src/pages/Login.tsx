import { useState } from "react";
import { API } from "../api/BaseUrl";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await API.post("/api/auth/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      if (res.data.error) {
        setErrorMsg("Credenciales inválidas");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/users");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setErrorMsg("Credenciales inválidas");
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Iniciar sesión</h1>
        </div>

        {errorMsg && (
          <p className="text-red-600 bg-red-100 border border-red-300 px-3 py-2 rounded mb-4 text-center">
            {errorMsg}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
