import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { SelectItem, SelectValue } from '@/components/ui/select'
import type { ProductRequest } from '@/types/product'
import { Select, SelectContent, SelectTrigger } from '@radix-ui/react-select'
import { Search } from 'lucide-react'
import { RequestCard } from './RequestCard'


const mockRequests: ProductRequest[] = [
  {
    id: '1',
    productName: 'Arroz Blanco',
    quantity: 50,
    unit: 'kg',
    observations: 'Calidad premium para preparaciones especiales',
    requestedBy: '2',
    requestedByName: 'Carlos López',
    status: 'pending',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    productName: 'Aceite Vegetal',
    quantity: 10,
    unit: 'litros',
    requestedBy: '2',
    requestedByName: 'Carlos López',
    status: 'approved',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14')
  },
  {
    id: '3',
    productName: 'Pasta Italiana',
    quantity: 25,
    unit: 'kg',
    observations: 'Preferencia por marca reconocida',
    requestedBy: '3',
    requestedByName: 'Ana Martínez',
    status: 'assigned',
    assignedSupplier: 'supplier-1',
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13')
  },
  {
    id: '4',
    productName: 'Detergente Industrial',
    quantity: 5,
    unit: 'litros',
    requestedBy: '2',
    requestedByName: 'Carlos López',
    status: 'rejected',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12')
  }
];

const Content = () => {
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
                />
              </div>
            </div>
            <Select >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="approved">Aprobadas</SelectItem>
                <SelectItem value="assigned">Asignadas</SelectItem>
                <SelectItem value="rejected">Rechazadas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    
    {/* Requests Grid */}
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {mockRequests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
            />
          ))}
     </div>
    

    </>
  )
}

export default Content