import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';
import type { RequestItem } from '@/types/request';

interface RequestSummaryProps {
  requestItems: RequestItem[];
  generalObservations: string;
  onGeneralObservationsChange: (observations: string) => void;
}

export const RequestSummary: React.FC<RequestSummaryProps> = ({
  requestItems,
  generalObservations,
  onGeneralObservationsChange
}) => {
  return (
    <div className="space-y-4">
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Resumen de la Solicitud
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Request items summary */}
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Productos solicitados:</h3>
            {requestItems.map((item) => (
              <div key={item.productId} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <div className="font-medium">{item.productName}</div>
                  {item.observations && (
                    <div className="text-sm text-muted-foreground mt-1">
                      Obs: {item.observations}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-medium">{item.quantity} {item.unit}</div>
                </div>
              </div>
            ))}
          </div>

          {/* General observations */}
          <div>
            <Label htmlFor="general-obs" className="text-sm font-medium">
              Observaciones generales
            </Label>
            <Textarea
              id="general-obs"
              placeholder="Observaciones generales para toda la solicitud..."
              value={generalObservations}
              onChange={(e) => onGeneralObservationsChange(e.target.value)}
              className="mt-1"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};