import { Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

type NotificationItem = {
  id: string | number
  title: string
  description?: string
  time?: string
  read?: boolean
}

export default function Notification({
  notifications = [
    { id: 1, title: "Pedido #123 enviado", description: "Enviado por transporte", time: "2h", read: false },
    { id: 2, title: "Nuevo proveedor agregado", description: "Proveedor XYZ", time: "1d", read: false },
    { id: 3, title: "Backup completado", description: "Backup diario OK", time: "3d", read: true },
  ],
  unreadCount,
}: {
  notifications?: NotificationItem[]
  unreadCount?: number
}) {
  const unread = unreadCount ?? notifications.filter((n) => !n.read).length

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Notificaciones"
          className="relative inline-flex items-center justify-center rounded-md p-2 hover:bg-muted/50"
        >
          <Bell className="h-5 w-5" />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-destructive text-white text-xs w-5 h-5">
              {unread > 99 ? "99+" : unread}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[20rem] p-0 rounded-lg" side="bottom" align="end" sideOffset={8}>
        <DropdownMenuLabel className="px-3 py-2">Notificaciones</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="max-h-60 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="px-3 py-2 text-sm text-muted-foreground">Sin notificaciones</div>
          ) : (
            notifications.map((n) => (
              <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-0 px-3 py-2">
                <span className="text-sm font-medium">{n.title}</span>
                {n.description && <span className="text-xs text-muted-foreground">{n.description}</span>}
                {n.time && <span className="text-[10px] text-muted-foreground mt-1">{n.time}</span>}
              </DropdownMenuItem>
            ))
          )}
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center">Ver todas</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
