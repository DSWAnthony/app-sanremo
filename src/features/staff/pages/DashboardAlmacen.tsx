import React from 'react';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCard {
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: string;
  color: string;
}

export const DashboardAlmacen: React.FC = () => {
  const { user } = { user: { name: 'Ana García', role: 'almacen' } }; // Mocked user data

  const almacenStats: StatCard[] = [
    {
      title: 'Mis Solicitudes',
      value: '5',
      description: 'Total creadas',
      icon: FileText,
      color: 'text-primary'
    },
    {
      title: 'Pendientes',
      value: '3',
      description: 'Esperando respuesta',
      icon: Clock,
      color: 'text-warning'
    },
    {
      title: 'Aprobadas',
      value: '2',
      description: 'En proceso',
      icon: CheckCircle,
      color: 'text-success'
    },
    {
      title: 'Este Mes',
      value: '8',
      description: 'Solicitudes creadas',
      icon: TrendingUp,
      trend: '+3 vs mes anterior',
      color: 'text-success'
    }
  ];

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

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Bienvenido, {user?.name}
        </h1>
        <p className="text-muted-foreground">
          {user?.role === 'admin' 
            ? 'Gestiona solicitudes, proveedores y órdenes de compra'
            : 'Crea y gestiona tus solicitudes de productos'
          }
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {almacenStats.map((stat, index) => {
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

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        {/* Quick Actions */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Acciones Rápidas</span>
            </CardTitle>
            <CardDescription>
              Tareas frecuentes del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {user?.role === 'admin' ? (
                <>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Ver Solicitudes</p>
                      <p className="text-xs text-muted-foreground">Revisar nuevas peticiones</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-success/10 hover:bg-success/20 transition-colors cursor-pointer">
                    <Users className="h-5 w-5 text-success" />
                    <div>
                      <p className="text-sm font-medium">Gestionar Proveedores</p>
                      <p className="text-xs text-muted-foreground">Agregar o editar proveedores</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-warning/10 hover:bg-warning/20 transition-colors cursor-pointer">
                    <ShoppingCart className="h-5 w-5 text-warning" />
                    <div>
                      <p className="text-sm font-medium">Crear Orden</p>
                      <p className="text-xs text-muted-foreground">Nueva orden de compra</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Nueva Solicitud</p>
                      <p className="text-xs text-muted-foreground">Crear solicitud de productos</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-success/10 hover:bg-success/20 transition-colors cursor-pointer">
                    <Clock className="h-5 w-5 text-success" />
                    <div>
                      <p className="text-sm font-medium">Mis Solicitudes</p>
                      <p className="text-xs text-muted-foreground">Ver estado de mis pedidos</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};