import { AppSidebar, type SidebarItem } from "@/components/app-sidebar"
import { NavUser } from "@/components/nav-user"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Notification from "../components/notification/Notification"
import { Outlet } from "react-router-dom"
import { 
  Package, 
  Home, 
  ClipboardList, 
  ShoppingCart, 
  Users,
  Warehouse 
} from "lucide-react"
import type { UserRole } from "@/types/user"

//ejemplo de usuario
const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
}


const sidebarItems: Record<UserRole, SidebarItem[]> = {
  admin: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: <Home size={18} />,
    },
    {
      title: "Solicitudes",
      url: "/admin/solicitudes",
      icon: <ClipboardList size={18} />,
    },
    {
      title: "Órdenes de Compra",
      url: "/admin/ordenes-compra",
      icon: <ShoppingCart size={18} />,
    },
    {
      title: "Proveedores",
      url: "/admin/proveedores",
      icon: <Users size={18} />,
    },
    {
      title: "Productos",
      url: "/admin/productos",
      icon: <Package size={18} />,
    },
    {
      title: "Usuarios",
      url: "/admin/usuarios",
      icon: <Users size={18} />,
    },
    {
      title: "Inventario",
      url: "/admin/inventario",
      icon: <Warehouse size={18} />,
    },
  ],
  warehouse: [
    {
      title: "Dashboard",
      url: "/almacen",
      icon: <Home size={18} />,
    },
    {
      title: "Solicitudes",
      url: "/almacen/solicitudes",
      icon: <ClipboardList size={18} />,
    },
  ]
};

interface AppLayoutProps {
  userRole: UserRole;
}

export default function AppLayout({ userRole }: AppLayoutProps) {
  const items = sidebarItems[userRole];

  return (
    <SidebarProvider>
      <AppSidebar data={items} userRole={userRole} />
      <SidebarInset>
        <header className="sticky top-0 z-50 bg-gray-400/80 backdrop-blur-sm h-16 flex items-center px-4 gap-4 border-b">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          
            <div className="hidden md:block">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      {userRole === 'admin' ? 'Administración' : 'Almacén'}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Notification />
            <NavUser user={user} />
          </div>
        </header>
        
        <main className="p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}