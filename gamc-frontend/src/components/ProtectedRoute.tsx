import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  allowedRoles
}: {
  children: JSX.Element;
  allowedRoles: string[];
}) {

  const userData = localStorage.getItem("user");

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userData);

  if (!allowedRoles.includes(user.role)) {
    return (
      <h1 className="text-center text-2xl mt-10 text-red-600">
        ⛔ No tienes permisos para acceder aquí
      </h1>
    );
  }

  return children;
}
