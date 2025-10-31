const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export const get = async (url) => {
  const res = await fetch(`${apiBase}${url}`);
  return res.json();
};

export const post = async (url, body) => {
  const res = await fetch(`${apiBase}${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
};
