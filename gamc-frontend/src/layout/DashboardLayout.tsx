import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-neutral-500">

      {/* NAVBAR */}
      <Navbar />

      {/* CONTENIDO */}
      <main className="p-8 fade-in">

        {/* CARD contenedor principal */}
        <div className="bg-neutral-900/60 backdrop-blur-xl border border-neutral-700 rounded-2xl p-8 shadow-2xl gamc-glow mx-auto max-w-[1500px]">

          {children}

        </div>

      </main>
    </div>
  );
}
