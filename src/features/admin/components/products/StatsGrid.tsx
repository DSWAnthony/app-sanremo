import { Card, CardContent } from "@/components/ui/card";

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      <Card className="card-elevated">
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-foreground">10</div>
          <p className="text-xs text-muted-foreground">Productos</p>
        </CardContent>
      </Card>
      <Card className="card-elevated">
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-warning">5</div>
          <p className="text-xs text-muted-foreground">Disponibles</p>
        </CardContent>
      </Card>
      <Card className="card-elevated">
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-success">3</div>
          <p className="text-xs text-muted-foreground">Sin Stock</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsGrid;
