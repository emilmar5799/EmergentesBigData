// src/App.tsx
import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import UsersPage from "./pages/Users";

// NUEVAS PÁGINAS 📌
import AirDataPage from "./pages/AirDataPage";
import NoiseDataPage from "./pages/NoiseDataPage";
import UndergroundDataPage from "./pages/UndergroundDataPage";

export default function App() {
  return (
    <>
      {/* NAVBAR */}
      <nav className="h-14 px-4 bg-white shadow flex items-center gap-6">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/users" className="hover:underline">Usuarios</Link>

        {/* NUEVOS MENÚS */}
        <Link to="/air" className="hover:underline">Calidad Aire</Link>
        <Link to="/noise" className="hover:underline">Sonido</Link>
        <Link to="/underground" className="hover:underline">Soterrados</Link>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UsersPage />} />

        {/* NUEVAS RUTAS */}
        <Route path="/air" element={<AirDataPage />} />
        <Route path="/noise" element={<NoiseDataPage />} />
        <Route path="/underground" element={<UndergroundDataPage />} />
      </Routes>
    </>
  );
}
