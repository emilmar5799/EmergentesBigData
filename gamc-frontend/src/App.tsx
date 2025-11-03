// src/App.tsx
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function App() {
  return (
    <>
      {/* Navbar simple */}
      <nav className="h-14 px-4 bg-white shadow flex items-center gap-4">
        <Link to="/" className="text-sm text-blue-600 hover:underline">
          Home
        </Link>
        <Link to="/login" className="text-sm text-blue-600 hover:underline">
          Login
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
