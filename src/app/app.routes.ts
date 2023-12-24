import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NegociosComponent } from './pages/negocios/negocios.component';
import { NegocioComponent } from './pages/negocio/negocio.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { InventarioComponent } from './pages/inventario/inventario.component';

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
        path: 'negocios/:idnegocio/inventarios',
        component: InventarioComponent
    }
];
