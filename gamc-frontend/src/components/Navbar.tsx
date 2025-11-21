import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const role = user?.role;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="h-16 px-8 bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-700 flex items-center justify-between shadow-lg gamc-glow">

      {/* LOGO IZQUIERDA */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-900/40">
          M
        </div>
        <span className="text-neutral-100 font-semibold text-lg tracking-wide">
          GAMC Monitor
        </span>
      </div>

      {/* MENÚ */}
      <div className="flex items-center gap-8 text-neutral-300 text-sm font-medium">

        {role && (
          <Link className="hover:text-blue-400 transition-all" to="/">Inicio</Link>
        )}

        {role === "ADMIN_SISTEMA" && (
          <Link className="hover:text-blue-400 transition-all" to="/users">Usuarios</Link>
        )}

        {["ADMIN_SISTEMA", "DIRECTOR_DGEYCI", "ALCALDE_GAMC"].includes(role) && (
          <Link className="hover:text-blue-400 transition-all" to="/air">Aire</Link>
        )}

        {["ADMIN_SISTEMA", "DIRECTOR_DGEYCI"].includes(role) && (
          <Link className="hover:text-blue-400 transition-all" to="/noise">Sonido</Link>
        )}

        {["ADMIN_SISTEMA", "DIRECTOR_DGEYCI"].includes(role) && (
          <Link className="hover:text-blue-400 transition-all" to="/underground">Soterrados</Link>
        )}

      </div>

      {/* CERRAR SESIÓN */}
      <div>
        {role ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm font-semibold shadow-md shadow-red-900/30 transition-all"
          >
            Salir
          </button>
        ) : (
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 text-sm font-semibold"
          >
            Iniciar sesión
          </Link>
        )}
      </div>

    </nav>
  );
}
