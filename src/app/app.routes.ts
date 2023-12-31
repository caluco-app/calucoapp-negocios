import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NegociosComponent } from './pages/negocios/negocios.component';
import { NegocioComponent } from './pages/negocio/negocio.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { StockComponent } from './pages/stock/stock.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ClientesComponent } from './pages/clientes/clientes.component';

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
        path: 'negocios/:id',
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
        path: 'negocios/:idnegocio/inventarios',
        component: InventarioComponent
    },
    {
        path: 'negocios/:idnegocio/stock/:idinventario',
        component: StockComponent
    },
    {
        path: 'negocios/:idnegocio/clientes',
        component: ClientesComponent
    }
];
