import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Link to="/dashboard/general">📈 General</Link>
      <Link to="/dashboard/sonido">🔊 Sonido</Link>
      <Link to="/dashboard/distancia">📏 Distancia</Link>
      <Link to="/usuarios">👥 Usuarios</Link>
    </aside>
  );
}
