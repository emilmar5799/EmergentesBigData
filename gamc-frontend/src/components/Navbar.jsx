import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="navbar">
      <h1>🌍 Monitoreo GAMC</h1>
      <div>
        {user && <span>{user.role}</span>}
        {user && <button onClick={logout}>Salir</button>}
      </div>
    </header>
  );
}
