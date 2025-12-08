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
  <div className="p-8 fade-in text-gray-100">

    {/* TÍTULO */}
    <h1 className="text-4xl font-bold text-center mb-8 tracking-wide">
      Gestión de Usuarios
    </h1>

    {/* BOTÓN CREAR – verde suave */}
    <div className="flex justify-center">
      <button
        onClick={openCreateModal}
        className="
          px-6 py-3 rounded-xl text-white font-semibold 
          bg-[#4CAF50] hover:bg-[#43A047]
          transition-all duration-300 shadow-lg shadow-green-900/40
        "
      >
        + Nuevo Usuario
      </button>
    </div>

    {/* TABLA */}
    <div
      className="
        max-w-5xl mx-auto mt-8 
        bg-[#1a1a1a]/70 backdrop-blur-xl 
        border border-white/10 
        rounded-2xl shadow-2xl p-6
      "
    >
      {loading ? (
        <p className="text-center text-gray-400 py-6">Cargando...</p>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-300 border-b border-gray-700">
              <th className="py-3">Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th className="text-right">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className="
                  border-b border-gray-800 
                  hover:bg-white/5 transition
                "
              >
                <td className="py-3">{u.full_name}</td>
                <td>{u.email}</td>

                <td className="uppercase text-green-300 font-medium">
                  {u.role}
                </td>

                <td className="text-right flex justify-end gap-3 py-2">

                  {/* EDITAR – verde pastel suave */}
                  <button
                    onClick={() => openEditModal(u)}
                    className="
                      px-4 py-1.5 rounded-lg 
                      bg-[#7BC47F] hover:bg-[#6BB56E] 
                      text-black font-semibold 
                      transition shadow-md
                    "
                  >
                    Editar
                  </button>

                  {/* ELIMINAR – rojo tenue */}
                  <button
                    onClick={() => deleteUser(u.id)}
                    className="
                      px-4 py-1.5 rounded-lg 
                      bg-[#E57373] hover:bg-[#EF5350] 
                      text-white font-semibold 
                      transition shadow-md
                    "
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
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">

        {/* CARD MODAL – verde en crear, gris suave en editar */}
        <div
          className={`
            w-96 p-6 rounded-2xl shadow-2xl border border-white/10 fade-in
            ${
              editUser
                ? "bg-[#2a2a2a]/90" // editar: gris profesional
                : "bg-[#1f2d1f]/90" // crear: verde muy oscuro (suave)
            }
            backdrop-blur-xl
          `}
        >
          <h2 className="text-2xl font-bold text-center mb-4">
            {editUser ? "Editar Usuario" : "Nuevo Usuario"}
          </h2>

          <div className="space-y-4">

            <input
              className="
                w-full bg-[#2c2c2c] border border-gray-600 rounded-lg p-2.5 
                text-white focus:ring-2 focus:ring-green-600
              "
              placeholder="Nombre completo"
              value={form.full_name}
              onChange={(e) =>
                setForm({ ...form, full_name: e.target.value })
              }
            />

            <input
              className="
                w-full bg-[#2c2c2c] border border-gray-600 rounded-lg p-2.5 
                text-white focus:ring-2 focus:ring-green-600
              "
              placeholder="Correo"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              className="
                w-full bg-[#2c2c2c] border border-gray-600 rounded-lg p-2.5 
                text-white focus:ring-2 focus:ring-green-600
              "
              type="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <select
              className="
                w-full bg-[#2c2c2c] border border-gray-600 rounded-lg p-2.5 
                text-white focus:ring-2 focus:ring-green-600
              "
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="USUARIO">USUARIO</option>
              <option value="ADMIN_SISTEMA">ADMIN_SISTEMA</option>
              <option value="DIRECTOR_DGEYCI">DIRECTOR_DGEYCI</option>
              <option value="ALCALDE_GAMC">ALCALDE_GAMC</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setModalVisible(false)}
              className="
                px-4 py-2 rounded-lg 
                bg-gray-600 hover:bg-gray-500 
                text-white font-medium transition
              "
            >
              Cancelar
            </button>

            <button
              onClick={handleSave}
              className={`
                px-4 py-2 rounded-lg font-semibold transition
                ${
                  editUser
                    ? "bg-[#7BC47F] text-black hover:bg-[#6BB56E]"
                    : "bg-[#4CAF50] text-white hover:bg-[#43A047]"
                }
              `}
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
