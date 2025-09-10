import { Button } from '@/components/ui/button'
import { Download, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


const HeaderSection = (
) => {

    const navigate = useNavigate()


    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-foreground">
                Gestión de Solicitudes
                </h1>
                <p className="text-muted-foreground">
                Revisa y gestiona las solicitudes de productos
                </p>
            </div>

            <div className="flex items-center space-x-2">
                <Button variant="outline" >
                <Download className="h-4 w-4 mr-2" />
                Exportar PDF
                </Button>
                <Button onClick={() => navigate('/almacen/solicitudes/nueva')} variant="outline" className="gradient-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Solicitud
                </Button>
            </div>
        </div>
    )
}

export default HeaderSection