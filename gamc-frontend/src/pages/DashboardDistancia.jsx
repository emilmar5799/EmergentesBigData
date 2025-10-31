import { useEffect, useState } from "react";
import { getDatosDistancia } from "../services/dataService";
import TableData from "../components/TableData";
import CardStat from "../components/CardStat";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardDistancia() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getDatosDistancia().then(setData);
  }, []);

  const promedio = data.reduce((acc, d) => acc + d.distance, 0) / (data.length || 1);

  return (
    <div className="dashboard">
      <Sidebar />
      <main>
        <Navbar />
        <h2>📏 Dashboard Distancia</h2>
        <div className="card-grid">
          <CardStat title="Promedio Distancia" value={`${promedio.toFixed(2)} m`} color="teal" />
          <CardStat title="Sensores activos" value={data.length} color="blue" />
        </div>
        <TableData data={data} />
      </main>
    </div>
  );
}
