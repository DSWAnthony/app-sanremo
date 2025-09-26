import React, { useState } from 'react';
import { Search, Grid3X3, List, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ProductCard} from '@/components/common/ProductCard';
import type { Product } from '@/types/product';

// // Mock product data
// const mockProducts: Product[] = [
//   {
//     id: 1,
//     name: 'Papel A4 75g',
//     description: 'Papel blanco para impresión y fotocopiado, formato A4',
//     unit: 'resma',
//     category: 'Papelería',
//     inStock: true
//   },
//   {
//     id: 2,
//     name: 'Tinta HP 664 Negro',
//     description: 'Cartucho de tinta original HP para impresoras DeskJet',
//     unit: 'cartucho',
//     category: 'Consumibles',
//     inStock: true
//   },
//   {
//     id: 3,
//     name: 'Detergente Industrial',
//     description: 'Detergente concentrado para limpieza industrial',
//     unit: 'litro',
//     category: 'Limpieza',
//     inStock: false
//   },
//   {
//     id: 4,
//     name: 'Bolígrafos Azules',
//     description: 'Caja de bolígrafos de tinta azul, trazo medio',
//     unit: 'caja',
//     category: 'Papelería',
//     inStock: true
//   },
//   {
//     id: 5,
//     name: 'Papel Higiénico',
//     description: 'Papel higiénico institucional, doble hoja',
//     unit: 'paquete',
//     category: 'Higiene',
//     inStock: true
//   },
//   {
//     id: 6,
//     name: 'Marcadores Permanentes',
//     description: 'Set de marcadores permanentes multicolor',
//     unit: 'set',
//     category: 'Papelería',
//     inStock: true
//   }
// ];

interface ProductCatalogProps {
  onProductSelect?: (product: Product) => void;
  catalog: Product[];
  selectedProducts?: number[];
  viewMode?: 'selection' | 'catalog';
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onProductSelect,
  selectedProducts = [],
  viewMode = 'catalog',
  catalog = []
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<string>('all');
  const [displayMode, setDisplayMode] = useState<'grid' | 'list'>('grid');

  const categories = Array.from(new Set(catalog.map(p => p.category).filter(Boolean)));

  const filteredProducts = catalog.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category.name === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleProductSelect = (product: Product) => {
    if (onProductSelect) {
      onProductSelect(product);
    }
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {viewMode === 'selection' ? 'Seleccionar Productos' : 'Catálogo de Productos'}
          </h1>
          <p className="text-muted-foreground">
            {viewMode === 'selection' 
              ? 'Selecciona los productos que necesitas solicitar'
              : 'Explora nuestro catálogo de productos disponibles'
            }
          </p>
        </div>

        {viewMode === 'selection' && selectedProducts.length > 0 && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <ShoppingCart className="h-3 w-3" />
              {selectedProducts.length} seleccionados
            </Badge>
          </div>
        )}
      </div>


      {/* Filters */}
      <Card className="card-elevated">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Filtros</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant={displayMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDisplayMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={displayMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDisplayMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Stock filter */}
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Disponibilidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="available">Disponibles</SelectItem>
                <SelectItem value="out-of-stock">Sin stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid/List */}
      <div className={`
        ${displayMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
          : 'space-y-4'
        }
      `}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={handleProductSelect}
            selected={selectedProducts.includes(product.id)}
            showSelectButton={viewMode === 'selection'}
            variant={displayMode === 'list' ? 'compact' : 'default'}
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
              Intenta ajustar los filtros de búsqueda para encontrar lo que necesitas
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};