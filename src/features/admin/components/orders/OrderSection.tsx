import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge, Calendar, Download, Eye, Search, ShoppingCart, User } from 'lucide-react'
import React, { useState } from 'react'


const PURCHASE_ORDER_STATUSES: Record<string, string> = {
  pending: 'Pendiente',
  sent: 'Enviada',
  received: 'Recibida',
};

const orders = [
  {
    id: 'PO12345',
    supplierName: 'Proveedor A',
    status: 'pending',
    createdAt: new Date('2024-06-01'),
    details: [
      { product: { id: 'P001', name: 'Producto 1', unit: 'pcs' }, quantityOrdered: 100 },
      { product: { id: 'P002', name: 'Producto 2', unit: 'kg' }, quantityOrdered: 50 },
    ],
    totalAmount: 1500.00,
  },    
    {
    id: 'PO12346',
    supplierName: 'Proveedor B',
    status: 'sent',
    createdAt: new Date('2024-06-05'),
    details: [
      { product: { id: 'P003', name: 'Producto 3', unit: 'ltr' }, quantityOrdered: 200 },
        { product: { id: 'P004', name: 'Producto 4', unit: 'pcs' }, quantityOrdered: 80 },
    ],
    totalAmount: 3200.00,
  },
];

export default function OrderSection() {

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'sent': return 'bg-primary text-primary-foreground';
      case 'received': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };
    
  return (
    <div className='space-y-6 mt-6'>
        
      <Card className="card-elevated">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por ID o proveedor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                Todas
              </Button>
              <Button
                variant={statusFilter === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('pending')}
              >
                Pendientes
              </Button>
              <Button
                variant={statusFilter === 'sent' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('sent')}
              >
                Enviadas
              </Button>
              <Button
                variant={statusFilter === 'received' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('received')}
              >
                Recibidas
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

 
        <div className="space-y-4">
          {filteredOrders.map((order) => (
          <Card key={order.id} className="card-elevated">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">Orden #{order.id}</CardTitle>
                    <Badge className={getStatusColor(order.status)}>
                      {PURCHASE_ORDER_STATUSES[order.status]}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {order.supplierName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {order.createdAt.toLocaleDateString()}
                    </span>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalle
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Productos:</h4>
                  <div className="space-y-2">
                    {order.details.map((detail, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <span className="text-sm font-medium">{detail.product.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {detail.quantityOrdered} {detail.product.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {order.totalAmount && (
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="font-medium">Total:</span>
                    <span className="text-lg font-bold text-primary">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          ))}
        </div>


    </div>
  )
}
