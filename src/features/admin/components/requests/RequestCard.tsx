import React from "react";
import { Calendar, User, Package, FileText, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { REQUEST_STATUSES, type ProductRequest } from "@/types/user";

interface RequestCardProps {
  request: ProductRequest;
  showActions?: boolean;
  isDraggable?: boolean;
}

export const RequestCard: React.FC<RequestCardProps> = ({
  request,
  showActions = true,
  isDraggable = false,
}) => {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: REQUEST_STATUSES.pending, className: "status-pending" },
      approved: {
        label: REQUEST_STATUSES.approved,
        className: "status-approved",
      },
      rejected: {
        label: REQUEST_STATUSES.rejected,
        className: "status-rejected",
      },
      assigned: {
        label: REQUEST_STATUSES.assigned,
        className: "status-approved",
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const cardClasses = [
    "card-elevated",
    isDraggable && "card-draggable cursor-move",
    "transition-all duration-200",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Card
      className={cardClasses}
      draggable={isDraggable}
      onDragStart={(e) => {
        if (isDraggable) {
          e.dataTransfer.setData("application/json", JSON.stringify(request));
        }
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-sm">
                {request.productName}
              </h3>
              <p className="text-sm text-muted-foreground">
                {request.quantity} {request.unit}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {getStatusBadge(request.status)}
            {showActions && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Aprobar</DropdownMenuItem>
                  <DropdownMenuItem>Rechazar</DropdownMenuItem>
                  <DropdownMenuItem>Asignar Proveedor</DropdownMenuItem>
                  <DropdownMenuItem>Editar</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {request.observations && (
          <div className="mb-3">
            <div className="flex items-center space-x-1 mb-1">
              <FileText className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Observaciones:
              </span>
            </div>
            <p className="text-sm text-foreground bg-muted/30 p-2 rounded">
              {request.observations}
            </p>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>{request.requestedByName}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>
                {format(request.createdAt, "dd MMM yyyy", { locale: es })}
              </span>
            </div>
          </div>

          {request.assignedSupplier && (
            <div className="text-xs text-success bg-success/10 p-2 rounded">
              Asignado a proveedor
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
