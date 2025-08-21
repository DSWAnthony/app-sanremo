import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"


const HeaderSection = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Órdenes de Compra</h1>
            <p className="text-muted-foreground">Gestiona las órdenes enviadas a proveedores</p>
        </div>
        <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nueva Orden
        </Button>
    </div>

  )
}

export default HeaderSection