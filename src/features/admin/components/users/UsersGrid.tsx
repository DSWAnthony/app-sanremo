import React, { useState } from "react";
import type { User as UserType, UserRole } from "@/types/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  //  Badge,
  MoreHorizontal,
  Edit,
  Trash2,
  Mail,
  Calendar,
  Shield,
  UserPlus,
  Plus,
} from "lucide-react";

// Mock data
const mockUsers: UserType[] = [
  {
    id: "user-1",
    name: "Juan Pérez",
    email: "juan@empresa.com",
    role: "admin",
    createdAt: new Date("2024-01-01"),
    avatar: "",
  },
  {
    id: "user-2",
    name: "María García",
    email: "maria@empresa.com",
    role: "warehouse",
    createdAt: new Date("2024-01-05"),
    avatar: "",
  },
  {
    id: "user-3",
    name: "Carlos López",
    email: "carlos@empresa.com",
    role: "warehouse",
    createdAt: new Date("2024-01-10"),
    avatar: "",
  },
  {
    id: "user-4",
    name: "Ana Martínez",
    email: "ana@empresa.com",
    role: "admin",
    createdAt: new Date("2024-01-15"),
    avatar: "",
  },
];

const UsersGrid: React.FC = () => {
  const [users] = useState<UserType[]>(mockUsers);
  const [searchTerm] = useState("");
  const [roleFilter] = useState<string>("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  /*const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "bg-primary text-primary-foreground";
      case "warehouse":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };
  */

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "Administrador";
      case "warehouse":
        return "Almacén";
      default:
        return "desconocido";
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="card-elevated">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-lg font-medium text-primary">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <h1>{getRoleLabel(user.role)}</h1>
                  </div>
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
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Registrado el {user.createdAt.toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Shield className="h-4 w-4 mr-1" />
                  Permisos
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {filteredUsers.length === 0 && (
        <Card className="card-elevated">
          <CardContent className="p-12 text-center">
            <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No hay usuarios
            </h3>
            <p className="text-muted-foreground">
              {searchTerm || roleFilter !== "all"
                ? "No se encontraron usuarios con los filtros aplicados."
                : "Comienza agregando el primer usuario del sistema."}
            </p>
            {!searchTerm && roleFilter === "all" && (
              <Button className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Primer Usuario
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default UsersGrid;
