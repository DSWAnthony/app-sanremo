import { Card, CardContent } from "@/components/ui/card"


const StatsGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="card-elevated">
            <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">10</div>
            <p className="text-xs text-muted-foreground">Total</p>
            </CardContent>
        </Card>
        <Card className="card-elevated">
            <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">5</div>
            <p className="text-xs text-muted-foreground">Pendientes</p>
            </CardContent>
        </Card>
        <Card className="card-elevated">
            <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">3</div>
            <p className="text-xs text-muted-foreground">Aprobadas</p>
            </CardContent>
        </Card>
        <Card className="card-elevated">
            <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">2</div>
            <p className="text-xs text-muted-foreground">Asignadas</p>
            </CardContent>
        </Card>
        <Card className="card-elevated">
            <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">0</div>
            <p className="text-xs text-muted-foreground">Rechazadas</p>
            </CardContent>
        </Card>
    </div>
  )
}

export default StatsGrid