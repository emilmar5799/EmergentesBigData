// src/pages/Home.tsx
export default function Home() {
  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🚀 Tailwind + React + Vite funcionando
        </h1>
        <p className="text-gray-500">
          Esta es la página de inicio. Ve a /login para probar el formulario.
        </p>
      </div>
    </div>
  );
}
