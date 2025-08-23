import React from "react";
import { Package, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface Product {
  id: string;
  name: string;
  description?: string;
  unit: string;
  category?: string;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
  selected?: boolean;
  disabled?: boolean;
  showSelectButton?: boolean;
  variant?: "default" | "compact" | "detailed";
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  selected = false,
  disabled = false,
  showSelectButton = true,
  variant = "default",
}) => {
  const handleSelect = () => {
    if (!disabled && onSelect) {
      onSelect(product);
    }
  };

  const isCompact = variant === "compact";
  const isDetailed = variant === "detailed";

  return (
    <Card
      className={`
        card-elevated transition-all duration-200 
        ${selected ? "ring-2 ring-primary" : ""}
        ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "card-hover cursor-pointer"
        }
        ${isCompact ? "h-auto" : "h-full"}
      `}
      onClick={handleSelect}
    >
      <CardContent
        className={`p-4 flex flex-col ${isCompact ? "gap-2" : "gap-3"} h-full`}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div
              className={`
              flex-shrink-0 rounded-lg bg-primary/10 p-2
              ${isCompact ? "w-8 h-8" : "w-10 h-10"}
            `}
            >
              <Package
                className={`text-primary ${isCompact ? "h-4 w-4" : "h-6 w-6"}`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className={`
                font-semibold text-foreground truncate
                ${isCompact ? "text-sm" : "text-base"}
              `}
              >
                {product.name}
              </h3>
              <p
                className={`
                text-muted-foreground
                ${isCompact ? "text-xs" : "text-sm"}
              `}
              >
                Unidad: {product.unit}
              </p>
            </div>
          </div>

          {/* Status indicator */}
          <div
            className={`
            flex-shrink-0 px-2 py-1 rounded-full text-xs font-medium
            ${
              product.inStock
                ? "bg-success/10 text-success border border-success/20"
                : "bg-warning/10 text-warning border border-warning/20"
            }
          `}
          >
            {product.inStock ? "Disponible" : "Sin stock"}
          </div>
        </div>

        {/* Description (only for default and detailed variants) */}
        {!isCompact && product.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
            {product.description}
          </p>
        )}

        {/* Category (only for detailed variant) */}
        {isDetailed && product.category && (
          <div className="text-xs text-muted-foreground">
            Categoría: {product.category}
          </div>
        )}

        {/* Action button */}
        {showSelectButton && (
          <Button
            size={isCompact ? "sm" : "default"}
            variant={selected ? "default" : "outline"}
            disabled={disabled || !product.inStock}
            onClick={(e) => {
              e.stopPropagation();
              handleSelect();
            }}
            className="w-full mt-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            {selected ? "Seleccionado" : "Seleccionar"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
