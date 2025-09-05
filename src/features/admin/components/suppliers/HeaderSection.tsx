import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const HeaderSection = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Proveedores</h1>
        <p className="text-muted-foreground">
          Gestiona la información de tus proveedores
        </p>
      </div>
      <Button className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Agregar Proveedor
      </Button>
    </div>
  );
};

export default HeaderSection;
