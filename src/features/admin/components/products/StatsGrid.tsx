import StatCard from "@/components/common/StatCard";

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      <StatCard label="Total Productos" value={20} color="text-primary" />
      <StatCard label="Productos Disponibles" value={25} color="text-success" />
      <StatCard label="Sin Stock" value={8.5} color="text-warning" />
    </div>
  );
};

export default StatsGrid;
