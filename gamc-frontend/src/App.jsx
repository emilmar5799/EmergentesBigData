import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DashboardGeneral from "./pages/DashboardGeneral";
import DashboardSonido from "./pages/DashboardSonido";
import DashboardDistancia from "./pages/DashboardDistancia";
import AdminUsuarios from "./pages/AdminUsuarios";

// (Opcional) “protector” súper simple
const isAuthed = () => !!localStorage.getItem("user");
const Protected = ({ children }) => (isAuthed() ? children : <Navigate to="/" replace />);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard/general"
          element={
            <Protected>
              <DashboardGeneral />
            </Protected>
          }
        />
        <Route
          path="/dashboard/sonido"
          element={
            <Protected>
              <DashboardSonido />
            </Protected>
          }
        />
        <Route
          path="/dashboard/distancia"
          element={
            <Protected>
              <DashboardDistancia />
            </Protected>
          }
        />
        <Route
          path="/usuarios"
          element={
            <Protected>
              <AdminUsuarios />
            </Protected>
          }
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
