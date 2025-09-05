import StatCard from "@/components/common/StatCard";
import { UserPlus, Shield, User } from "lucide-react";

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        label="Total Usuarios"
        value={4}
        icon={UserPlus}
        color="text-primary"
      />
      <StatCard
        label="Administradores"
        value={2}
        icon={Shield}
        color="text-success"
      />
      <StatCard
        label="Personal Almacén"
        value={2}
        icon={User}
        color="text-warning"
      />
    </div>
  );
};

export default StatsGrid;
