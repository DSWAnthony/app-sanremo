import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, Clock, Package } from "lucide-react";

const recentActivity = [
    {
        action: 'Nueva solicitud creada',
        description: 'Papel A4 - 5 resmas',
        user: 'Carlos López',
        time: 'Hace 10 min',
        status: 'pending'
    },
    {
        action: 'Orden enviada a proveedor',
        description: 'Tinta para impresora HP',
        user: 'Ana García',
        time: 'Hace 1 hora',
        status: 'sent'
    },
    {
        action: 'Solicitud aprobada',
        description: 'Material de limpieza',
        user: 'Ana García',
        time: 'Hace 2 horas',
        status: 'approved'
    }
];


const getStatusIcon = (status: string) => {
    switch (status) {
        case 'pending':
        return <AlertCircle className="h-4 w-4 text-warning" />;
        case 'sent':
        return <Package className="h-4 w-4 text-primary" />;
        case 'approved':
        return <CheckCircle className="h-4 w-4 text-success" />;
        default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
};

const RecentActivity = () => {
  return (
    <Card className="card-elevated">
        <CardHeader>
        <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-primary" />
            <span>Actividad Reciente</span>
        </CardTitle>
        <CardDescription>
            Últimas acciones en el sistema
        </CardDescription>
        </CardHeader>
        <CardContent>
        <div className="space-y-4">
            {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                {getStatusIcon(activity.status)}
                <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                    {activity.action}
                </p>
                <p className="text-sm text-muted-foreground">
                    {activity.description}
                </p>
                <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground">
                    Por {activity.user}
                    </p>
                    <p className="text-xs text-muted-foreground">
                    {activity.time}
                    </p>
                </div>
                </div>
            </div>
            ))}
        </div>
        </CardContent>
    </Card>
  )
}

export default RecentActivity