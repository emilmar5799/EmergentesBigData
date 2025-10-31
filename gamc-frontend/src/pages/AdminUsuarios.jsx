import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function AdminUsuarios() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <main>
        <Navbar />
        <h2>👥 Administración de Usuarios</h2>
        <table className="data-table">
          <thead>
            <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Rol</th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
