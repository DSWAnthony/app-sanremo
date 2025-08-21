import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, ShoppingCart, TrendingUp, Users } from "lucide-react"


const QuickActions = () => {
  return (
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
          </CardContent>
        </Card>
  )
}

export default QuickActions