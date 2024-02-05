import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NegociosComponent } from './pages/negocios/negocios.component';
import { NegocioComponent } from './pages/negocio/negocio.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { StockComponent } from './pages/stock/stock.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { SucursalComponent } from './pages/sucursal/sucursal.component';
import { SucursalVentasComponent } from './pages/sucursal-ventas/sucursal-ventas.component';
import { SucursalVentasFacturarComponent } from './pages/sucursal-ventas-facturar/sucursal-ventas-facturar.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'negocios',
        component: NegociosComponent
    },
    {
        path: 'negocios/:idnegocio',
        component: NegocioComponent
    },
    {
        path: 'negocios/:idnegocio/productos',
        component: ProductosComponent
    },
    {
        path: 'negocios/:idnegocio/producto/:idproducto',
        component: ProductoComponent
    },
    {
        path: 'inventario/:idnegocio',
        component: InventarioComponent
    },
    {
        path: 'inventario/:idnegocio/stock/:idinventario',
        component: StockComponent
    },
    {
        path: 'socios/:idnegocio',
        component: ClientesComponent
    },
    {
        path: 'negocios/:idnegocio/:sucursal/:idsucursal',
        component: SucursalComponent
    },
    {
        path: 'negocios-sucursal-ventas/:sucursal/:idnegocio/:idsucursal',
        component: SucursalVentasComponent
    },
    {
        path: 'negocios-sucursal-ventas-facturar/:sucursal/:idnegocio/:idsucursal/:factura',
        component: SucursalVentasFacturarComponent
    }

];
