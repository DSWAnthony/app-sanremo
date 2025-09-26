import { Card, CardContent } from '@/components/ui/card'
import type { Request } from '@/types/request'


const StatsGrid = ({requests}: {requests: Request[]}) => {
 return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="card-elevated">
            <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{requests.length}</div>
            <p className="text-xs text-muted-foreground">Total</p>
            </CardContent>
        </Card>
        <Card className="card-elevated">
            <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">{requests.filter(r => r.status === 'pending').length}</div>
            <p className="text-xs text-muted-foreground">Pendientes</p>
            </CardContent>
        </Card>
        <Card className="card-elevated">
            <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">{requests.filter(r => r.status === 'approved').length}</div>
            <p className="text-xs text-muted-foreground">Aprobadas</p>
            </CardContent>
        </Card>
        <Card className="card-elevated">
            <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{requests.filter(r => r.status === 'assigned').length}</div>
            <p className="text-xs text-muted-foreground">Asignadas</p>
            </CardContent>
        </Card>
        <Card className="card-elevated">
            <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">{requests.filter(r => r.status === 'rejected').length}</div>
            <p className="text-xs text-muted-foreground">Rechazadas</p>
            </CardContent>
        </Card>
    </div>
  )
}

export default StatsGrid