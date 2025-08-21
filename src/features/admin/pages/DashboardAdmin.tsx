import QuickActions from "../components/dashboard/QuickActions";
import RecentActivity from "../components/dashboard/RecentActivity";
import StatsGrid from "../components/dashboard/StatsGrid";


const DashboardAdmin = () => {
  return (
    <>
      <div className="mb-5 space-y-2">
        <h1 className="text-3xl font-semibold text-foreground">Bienvenido Administrador</h1>
        <p className="text-muted-foreground">Esta es la página de inicio del panel de administración.</p>
      </div>

      <div className="mb-5">
        <StatsGrid />
      </div>
      
      <div className="mb-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <QuickActions />
      </div>
    </>
  )
}

export default DashboardAdmin