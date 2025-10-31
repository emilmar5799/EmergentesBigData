import { useEffect, useState } from "react";
import { getDatosSonido } from "../services/dataService";
import TableData from "../components/TableData";
import CardStat from "../components/CardStat";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardSonido() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getDatosSonido().then(setData);
  }, []);

  const promedio = data.reduce((acc, d) => acc + d.laeq, 0) / (data.length || 1);

  return (
    <div className="dashboard">
      <Sidebar />
      <main>
        <Navbar />
        <h2>🔊 Dashboard Sonido</h2>
        <div className="card-grid">
          <CardStat title="Promedio LAeq" value={`${promedio.toFixed(1)} dB`} color="orange" />
          <CardStat title="Sensores" value={data.length} color="purple" />
        </div>
        <TableData data={data} />
      </main>
    </div>
  );
}
