import { DashboardAdmin, InventoryPage, OrdersPage,ProductsPage,RequestsAdmin,SuppliersPage, UsersPage } from '@/features/admin/pages/index';
import {DashboardAlmacen, RequestsAlmacen} from '@/features/staff/pages/index';
import AppLayout from '@/layouts/AppLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function AppRouter() {  

  return (
    <>
      <Router>
          <Routes>


          {/* Rutas para Administrador */}
          <Route 
            path="/admin/*" 
            element={<AppLayout userRole="admin" />}
          >

            <Route index element={ <DashboardAdmin /> } />
            <Route path="solicitudes" element={ <RequestsAdmin /> } />
            <Route path="ordenes-compra" element={<OrdersPage />} />
            <Route path="proveedores" element={<SuppliersPage />} />
            <Route path="productos" element={<ProductsPage />} />
            <Route path="usuarios" element={<UsersPage />} />
            <Route path="inventario" element={<InventoryPage />} />
            
          </Route>

          {/* Rutas para almacén */}
          <Route 
            path="/almacen/*" 
            element={<AppLayout userRole="warehouse" />}
          >

            <Route index element={ <DashboardAlmacen /> } />
            <Route path="solicitudes" element={<RequestsAlmacen />} />

          </Route>


          {/* Ruta de error para paths no encontrados */}
          <Route path="*" element={<h1>Página no encontrada</h1>} />

          </Routes>
      </Router>
    </>
  )
}