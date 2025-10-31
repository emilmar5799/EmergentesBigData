import { post } from "./api";

export const loginUser = async (email, password) => {
  try {
    // simulación por ahora
    if (email === "admin@gob.bo" && password === "123456") {
      return { success: true, token: "fake-token", role: "admin" };
    } else {
      const res = await post("/api/auth/login", { email, password });
      return res;
    }
  } catch (err) {
    return { success: false, message: "Error en el servidor" };
  }
};
