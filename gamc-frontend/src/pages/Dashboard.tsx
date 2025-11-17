import { useAuth } from '../context/AuthContext';
import DashboardAlcalde from '../components/dashboards/DashboardAlcalde';
import DashboardDirector from '../components/dashboards/DashboardDirector';
import DashboardAdmin from '../components/dashboards/DashboardAdmin';
import DashboardUsuario from '../components/dashboards/DashboardUsuario';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return <div>Cargando...</div>;
  }

  // Renderizar dashboard según el rol
  switch (user.role) {
    case 'ALCALDE_GAMC':
      return <DashboardAlcalde />;
    case 'DIRECTOR_DGEYCI':
      return <DashboardDirector />;
    case 'ADMIN_SISTEMA':
      return <DashboardAdmin />;
    case 'USUARIO':
      return <DashboardUsuario />;
    default:
      return <div>Rol no reconocido</div>;
  }
}

