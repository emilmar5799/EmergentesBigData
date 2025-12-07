// src/pages/Users.tsx
import { useEffect, useState } from "react";
import { API } from "../api/BaseUrl";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editUser, setEditUser] = useState<any>(null);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "USUARIO",
  });

  // ------------------------------------------
  // 📌 Cargar usuarios
  // ------------------------------------------
  const loadUsers = async () => {
    try {
      const res = await API.get("/api/users/");
      setUsers(res.data);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // ------------------------------------------
  // 📌 Abrir modal crear
  // ------------------------------------------
  const openCreateModal = () => {
    setForm({
      full_name: "",
      email: "",
      password: "",
      role: "USUARIO",
    });
    setEditUser(null);
    setModalVisible(true);
  };

  // ------------------------------------------
  // 📌 Abrir modal editar
  // ------------------------------------------
  const openEditModal = (user: any) => {
    setEditUser(user);
    setForm({
      full_name: user.full_name,
      email: user.email,
      password: "",
      role: user.role,
    });
    setModalVisible(true);
  };

  // ------------------------------------------
  // 📌 Guardar usuario
  // ------------------------------------------
  const handleSave = async () => {
    try {
      if (editUser) {
        // UPDATE
        await API.put(`/api/users/${editUser.id}`, form);
      } else {
        // CREATE
        await API.post("/api/users/", form);
      }
      setModalVisible(false);
      await loadUsers();
    } catch (error) {
      console.error("Error guardando usuario:", error);
      alert("Ocurrió un error al guardar el usuario");
    }
  };

  // ------------------------------------------
  // 📌 Eliminar usuario
  // ------------------------------------------
  const deleteUser = async (id: string) => {
    if (!confirm("¿Eliminar usuario?")) return;

    try {
      await API.delete(`/api/users/${id}`);
      await loadUsers();
    } catch (error) {
      console.error("Error eliminando usuario:", error);
      alert("No se pudo eliminar");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Usuarios</h1>

      <button
        onClick={openCreateModal}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg mb-4"
      >
        + Nuevo Usuario
      </button>

      {/* Tabla */}
      <div className="bg-white rounded-lg shadow p-4">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b">
                  <td className="py-2">{u.full_name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button
                      onClick={() => openEditModal(u)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteUser(u.id)}
                      className="px-2 py-1 bg-red-600 text-white rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* -------------------- MODAL -------------------- */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-96 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {editUser ? "Editar Usuario" : "Nuevo Usuario"}
            </h2>

            <div className="space-y-3">
              <input
                className="w-full border rounded-lg p-2"
                placeholder="Nombre completo"
                value={form.full_name}
                onChange={(e) =>
                  setForm({ ...form, full_name: e.target.value })
                }
              />

              <input
                className="w-full border rounded-lg p-2"
                placeholder="Correo"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <input
                className="w-full border rounded-lg p-2"
                placeholder="Contraseña"
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              <select
                className="w-full border rounded-lg p-2"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="USUARIO">USUARIO</option>
                <option value="ADMIN_SISTEMA">ADMIN_SISTEMA</option>
                <option value="DIRECTOR_DGEYCI">DIRECTOR_DGEYCI</option>
                <option value="ALCALDE_GAMC">ALCALDE_GAMC</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-400 rounded text-white"
                onClick={() => setModalVisible(false)}
              >
                Cancelar
              </button>

              <button
                className="px-4 py-2 bg-blue-600 rounded text-white"
                onClick={handleSave}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
