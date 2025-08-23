import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Edit,
  Mail,
  MoreHorizontal,
  Package,
  Phone,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import type { Supplier } from "@/types/supplier";

// Mock data
const mockSuppliers: Supplier[] = [
  {
    id: "supplier-1",
    name: "Proveedor ABC",
    contact: "Juan Pérez",
    phone: "+1234567890",
    email: "juan@proveedorabc.com",
    products: ["product-1", "product-2", "product-3"],
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "supplier-2",
    name: "Distribuidora XYZ",
    contact: "María García",
    phone: "+0987654321",
    email: "maria@distribuidoraxyz.com",
    products: ["product-4", "product-5"],
    createdAt: new Date("2024-01-05"),
  },
  {
    id: "supplier-3",
    name: "Suministros DEF",
    contact: "Carlos López",
    phone: "+1122334455",
    email: "carlos@suministrosdef.com",
    products: ["product-6", "product-7", "product-8", "product-9"],
    createdAt: new Date("2024-01-01"),
  },
];

const SuppliersGrid = () => {
  const [suppliers] = useState<Supplier[]>(mockSuppliers);
  const [searchTerm] = useState("");

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map((supplier) => (
          <Card key={supplier.id} className="card-elevated">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{supplier.name}</CardTitle>
                  <CardDescription>
                    Contacto: {supplier.contact}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{supplier.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{supplier.email}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Productos
                  </span>
                  <Badge variant="secondary">{supplier.products.length}</Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  Registrado el {supplier.createdAt.toLocaleDateString()}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Package className="h-4 w-4 mr-1" />
                  Ver Productos
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSuppliers.length === 0 && (
        <Card className="card-elevated">
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No hay proveedores
            </h3>
            <p className="text-muted-foreground">
              {searchTerm
                ? "No se encontraron proveedores con los filtros aplicados."
                : "Comienza agregando tu primer proveedor."}
            </p>
            {!searchTerm && (
              <Button className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Primer Proveedor
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default SuppliersGrid;
