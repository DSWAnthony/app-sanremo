import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import DashboardAdmin from './features/admin/pages/DashboardAdmin';
import DashboardAlmacen from './features/staff/pages/DashboardAlmacen';

function App() {  

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
            <Route path="solicitudes" element={<h1>Solicitudes Admin</h1>} />
            <Route path="ordenes-compra" element={<h1>Órdenes de Compra Admin</h1>} />
            <Route path="proveedores" element={<h1>Proveedores Admin</h1>} />
            <Route path="productos" element={<h1>Productos Admin</h1>} />
            <Route path="usuarios" element={<h1>Usuarios Admin</h1>} />
            <Route path="inventario" element={<h1>Inventario Admin</h1>} />
          </Route>

          {/* Rutas para almacén */}
          <Route 
            path="/almacen/*" 
            element={<AppLayout userRole="warehouse" />}
          >
            <Route index element={ <DashboardAlmacen /> } />
            <Route path="solicitudes" element={<h1>Solicitudes Almacén</h1>} />
          </Route>


          {/* Ruta de error para paths no encontrados */}
          <Route path="*" element={<h1>Página no encontrada</h1>} />

          </Routes>
      </Router>
    </>
  )
}

export default App
