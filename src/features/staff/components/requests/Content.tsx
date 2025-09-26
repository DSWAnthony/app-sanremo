import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { RequestCard } from './RequestCard';
import type { Request } from '@/types/request';
import { useMemo, useState } from 'react';

type ContentProps = {
  requests: Request[];
  onViewSummary: (request: Request) => void;
}

const Content = ({ requests, onViewSummary }: ContentProps) => {
  const [stockFilter, setStockFilter] = useState<string>('all');
  const [query, setQuery] = useState<string>('');

  // Filtrado con useMemo para evitar recomputes innecesarios
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return requests.filter(r => {
      // filtro por stock: asumo que cada request puede tener items y producto tiene stock booleano o similar
      if (stockFilter === 'available') {
        // si existe al menos 1 item con product.available true (ajusta según tu schema)
        if (!r.items.some(it => (it.product as any).available)) return false;
      } else if (stockFilter === 'out-of-stock') {
        if (!r.items.some(it => !(it.product as any).available)) return false;
      }

      // búsqueda simple en nombre de producto y solicitante (ajusta campos según estructura)
      if (!q) return true;

      const matchesProduct = r.items.some(it => it.product.name?.toLowerCase().includes(q));
      // const matchesRequester = (r.user?.name ?? '').toLowerCase().includes(q);
      return matchesProduct ;
    });
  }, [requests, stockFilter, query]);

  return (
    <>
      <Card className="card-elevated mb-5">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por producto o solicitante..."
                  className="pl-10"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="w-56">
              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Disponibilidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="available">Disponibles</SelectItem>
                  <SelectItem value="out-of-stock">Sin stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center text-sm text-muted-foreground py-8">
            No hay solicitudes que coincidan.
          </div>
        ) : (
          filtered.map(request => (
            <RequestCard
              key={request.id}
              request={request}
              onViewSummary={() => onViewSummary(request)}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Content;
