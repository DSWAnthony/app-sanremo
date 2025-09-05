import StatCard from "@/components/common/StatCard";
import { Users, Package } from "lucide-react";

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        label="Total Proveedores"
        value={20}
        icon={Users}
        color="text-primary"
      />
      <StatCard
        label="Productos Totales"
        value={25}
        icon={Package}
        color="text-success"
      />
      <StatCard
        label="Promedio Productos"
        value={8.5}
        icon={Package}
        color="text-warning"
      />
    </div>
  );
};

export default StatsGrid;
