import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Grid3X3, List, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterProducts = () => {
  return (
    <Card className="card-elevated">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filtros</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              //variant={displayMode === "grid" ? "default" : "outline"}
              size="sm"
              //onClick={() => setDisplayMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              //variant={displayMode === "list" ? "default" : "outline"}
              size="sm"
              //onClick={() => setDisplayMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar productos..."
              //value={searchTerm}
              //onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category filter */}
          <Select
          //value={categoryFilter} onValueChange={setCategoryFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              {/* {categories.map((category) => (
                <SelectItem key={category} value={category!}>
                  {category}
                </SelectItem>
              ))} */}
            </SelectContent>
          </Select>

          {/* Stock filter */}
          {/* <Select
          //value={stockFilter} onValueChange={setStockFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Disponibilidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="available">Disponibles</SelectItem>
              <SelectItem value="out-of-stock">Sin stock</SelectItem>
            </SelectContent>
          </Select> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterProducts;
