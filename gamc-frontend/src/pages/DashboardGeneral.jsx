import { useEffect, useState } from "react";
import { getDatosGenerales } from "../services/dataService";
import TableData from "../components/TableData";
import CardStat from "../components/CardStat";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardGeneral() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getDatosGenerales().then(setData);
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <main>
        <Navbar />
        <h2>📈 Dashboard General</h2>
        <div className="card-grid">
          <CardStat title="Dispositivos activos" value={data.length} color="green" />
          <CardStat title="Última actualización" value="Hace 5 min" color="blue" />
        </div>
        <TableData data={data} />
      </main>
    </div>
  );
}
