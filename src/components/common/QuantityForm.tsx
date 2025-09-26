// components/forms/QuantityForm.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { QuantityStepper } from '@/components/common/QuantityStepper';
import { ShoppingCart } from 'lucide-react';
import type { RequestItemForm } from '@/types/request';

interface QuantityFormProps {
  requestItems: RequestItemForm[];
  onQuantityChange: (productId: number, quantity: number) => void;
  onObservationsChange: (productId: number, observations: string) => void;
}

export const QuantityForm: React.FC<QuantityFormProps> = ({
  requestItems,
  onQuantityChange,
  onObservationsChange
}) => {
  return (
    <div className="space-y-4">
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Definir Cantidades
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {requestItems.map((item) => (
            <div key={item.productId} className="p-4 border border-border rounded-lg space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-foreground">{item.productName}</h3>
                  <p className="text-sm text-muted-foreground">Unidad: {item.unit}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <QuantityStepper
                    value={item.quantity}
                    onChange={(quantity) => onQuantityChange(item.productId, quantity)}
                    unit={item.unit}
                    label="Cantidad requerida"
                    min={1}
                    max={100}
                  />
                </div>
                
                <div>
                  <Label htmlFor={`obs-${item.productId}`} className="text-sm font-medium">
                    Observaciones específicas
                  </Label>
                  <Textarea
                    id={`obs-${item.productId}`}
                    placeholder="Especificaciones adicionales para este producto..."
                    value={item.observations || ''}
                    onChange={(e) => onObservationsChange(item.productId, e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};