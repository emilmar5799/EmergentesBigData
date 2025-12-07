import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import DashboardLayout from "./layout/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import UsersPage from "./pages/Users";
import AirDataPage from "./pages/AirDataPage";
import NoiseDataPage from "./pages/NoiseDataPage";
import UndergroundDataPage from "./pages/UndergroundDataPage";
import UndergroundPrediction from "./pages/UndergroundPrediction"; // ⭐ NUEVA PÁGINA

export default function App() {
  const { user } = useAuth();
  const role = user?.role;

  return (
    <Routes>

      {/* LOGIN (SIN LAYOUT) */}
      <Route path="/login" element={<Login />} />

      {/* HOME */}
      <Route
        path="/"
        element={
          <ProtectedRoute
            allowedRoles={["USUARIO", "ADMIN_SISTEMA", "DIRECTOR_DGEYCI", "ALCALDE_GAMC"]}
          >
            <DashboardLayout>
              <Home />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* USUARIOS */}
      <Route
        path="/users"
        element={
          <ProtectedRoute allowedRoles={["ADMIN_SISTEMA"]}>
            <DashboardLayout>
              <UsersPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* AIRE */}
      <Route
        path="/air"
        element={
          <ProtectedRoute allowedRoles={["ADMIN_SISTEMA", "DIRECTOR_DGEYCI", "ALCALDE_GAMC"]}>
            <DashboardLayout>
              <AirDataPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* SONIDO */}
      <Route
        path="/noise"
        element={
          <ProtectedRoute allowedRoles={["ADMIN_SISTEMA", "DIRECTOR_DGEYCI"]}>
            <DashboardLayout>
              <NoiseDataPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* SOTERRADOS */}
      <Route
        path="/underground"
        element={
          <ProtectedRoute allowedRoles={["ADMIN_SISTEMA", "DIRECTOR_DGEYCI"]}>
            <DashboardLayout>
              <UndergroundDataPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* ⭐⭐ PREDICCIÓN SOTERRADA ⭐⭐ */}
      <Route
        path="/underground/predict"
        element={
          <ProtectedRoute allowedRoles={["ADMIN_SISTEMA", "DIRECTOR_DGEYCI"]}>
            <DashboardLayout>
              <UndergroundPrediction />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}
