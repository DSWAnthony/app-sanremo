import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ShoppingCart, 
  Users,
  Clock,
  CheckCircle,
} from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: string;
  color: string;
}

const stats: StatCard[] = [
  {
    title: 'Solicitudes Pendientes',
    value: '12',
    description: 'Esperando aprobación',
    icon: Clock,
    trend: '+2 desde ayer',
    color: 'text-warning'
  },
  {
    title: 'Órdenes Activas',
    value: '8',
    description: 'En proceso',
    icon: ShoppingCart,
    trend: '+1 esta semana',
    color: 'text-primary'
  },
  {
    title: 'Proveedores',
    value: '15',
    description: 'Registrados',
    icon: Users,
    color: 'text-success'
  },
  {
    title: 'Completadas',
    value: '24',
    description: 'Este mes',
    icon: CheckCircle,
    trend: '+20% vs mes anterior',
    color: 'text-success'
  }
];


const StatsGrid = () => {
  return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="card-elevated card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
                {stat.trend && (
                  <p className="text-xs text-success mt-1">
                    {stat.trend}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
  )
}

export default StatsGrid