import { ProductCard, type Product } from "@/components/common/ProductCard";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import React, { useState } from "react";

// Mock product data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Papel A4 75g",
    description: "Papel blanco para impresión y fotocopiado, formato A4",
    unit: "resma",
    category: "Papelería",
    inStock: true,
  },
  {
    id: "2",
    name: "Tinta HP 664 Negro",
    description: "Cartucho de tinta original HP para impresoras DeskJet",
    unit: "cartucho",
    category: "Consumibles",
    inStock: true,
  },
  {
    id: "3",
    name: "Detergente Industrial",
    description: "Detergente concentrado para limpieza industrial",
    unit: "litro",
    category: "Limpieza",
    inStock: false,
  },
  {
    id: "4",
    name: "Bolígrafos Azules",
    description: "Caja de bolígrafos de tinta azul, trazo medio",
    unit: "caja",
    category: "Papelería",
    inStock: true,
  },
  {
    id: "5",
    name: "Papel Higiénico",
    description: "Papel higiénico institucional, doble hoja",
    unit: "paquete",
    category: "Higiene",
    inStock: true,
  },
  {
    id: "6",
    name: "Marcadores Permanentes",
    description: "Set de marcadores permanentes multicolor",
    unit: "set",
    category: "Papelería",
    inStock: true,
  },
];

interface ProductCatalogProps {
  onProductSelect?: (product: Product) => void;
  selectedProducts?: string[];
  viewMode?: "selection" | "catalog";
}

export const ProductsGrid: React.FC<ProductCatalogProps> = ({
  onProductSelect,
  selectedProducts = [],
  viewMode = "catalog",
}) => {
  const [searchTerm] = useState("");
  const [categoryFilter] = useState<string>("all");
  const [stockFilter] = useState<string>("all");
  const [displayMode] = useState<"grid" | "list">("grid");

  /*  const categories = Array.from(
    new Set(mockProducts.map((p) => p.category).filter(Boolean))
  ); */

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "available" ? product.inStock : !product.inStock);

    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleProductSelect = (product: Product) => {
    if (onProductSelect) {
      onProductSelect(product);
    }
  };

  return (
    <>
      <div
        className={`
        ${
          displayMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            : "space-y-4"
        }
      `}
      >
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={handleProductSelect}
            selected={selectedProducts.includes(product.id)}
            showSelectButton={viewMode === "selection"}
            variant={displayMode === "list" ? "compact" : "default"}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredProducts.length === 0 && (
        <Card className="card-elevated">
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No se encontraron productos
            </h3>
            <p className="text-muted-foreground">
              Intenta ajustar los filtros de búsqueda para encontrar lo que
              necesitas
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ProductsGrid;
