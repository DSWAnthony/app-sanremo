import { Card, CardContent } from "@/components/ui/card";
import { Package, Users } from "lucide-react";

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="card-elevated">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Proveedores
              </p>
              <p className="text-2xl font-bold text-foreground">10</p>
            </div>
            <Users className="h-8 w-8 text-primary" />
          </div>
        </CardContent>
      </Card>
      <Card className="card-elevated">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Productos Totales
              </p>
              <p className="text-2xl font-bold text-success">10</p>
            </div>
            <Package className="h-8 w-8 text-success" />
          </div>
        </CardContent>
      </Card>

      <Card className="card-elevated">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Promedio Productos
              </p>
              <p className="text-2xl font-bold text-warning">10</p>
            </div>
            <Package className="h-8 w-8 text-warning" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default StatsGrid;
