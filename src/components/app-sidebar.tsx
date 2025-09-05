import * as React from "react"

import { SearchForm } from "@/components/search-form"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Package } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import type { UserRole } from "@/types/user"


export type SidebarItem = {
  title: string
  url: string
  isActive?: boolean
  icon: React.ReactNode
}

type AppSidebarProps = {
  data?: SidebarItem[]
  userRole: UserRole
} & React.ComponentProps<typeof Sidebar>


export function AppSidebar({ data = [], userRole , ...props }: AppSidebarProps) {

  const location = useLocation()
  
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Package className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-sidebar-foreground">
                GestPedidos
              </h2>
              <p className="text-xs text-muted-foreground">
                {userRole === 'admin' ? 'Modo Administrador' : 'Modo Almacén'}
              </p>
            </div>
          </div>
        </div>
        <SearchForm />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton variant="ghost" asChild isActive={location.pathname === item.url}>
                      <Link to={item.url} className="truncate">
                        <div className="flex items-center gap-2">
                          {item.icon}
                            {item.title}
                        </div>
                      </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}