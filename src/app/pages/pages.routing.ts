import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guard
import { AuthGuard } from '../guards/auth.guard';

// Componentes
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RolComponent } from './mantenimientos/roles/rol.component';
import { RolesComponent } from './mantenimientos/roles/roles.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { UsuarioComponent } from './mantenimientos/usuarios/usuario.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventarioTelasComponent } from './inventario-telas/inventario-telas.component';
import { TelasComponent } from './telas/telas.component';
import { ProductosComponent } from './productos/productos.component';
import { CortesComponent } from './cortes/cortes.component';

const routes: Routes = [

    {
        path: 'dashboard',
        canActivate: [ AuthGuard ],
        component: PagesComponent,
        children: [

            { path: '', canActivate: [], component: DashboardComponent, data: { titulo: 'Escritorio' } },

            // Usuarios
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios' } },
            { path: 'usuario/:id', component: UsuarioComponent, data: { titulo: 'Usuario' } },

            // Roles
            { path: 'roles', component: RolesComponent, data: { titulo: 'Roles' } },
            { path: 'role/:id', component: RolComponent, data: { titulo: 'Role' } },

            // Perfil
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil' } },

            // settings
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Configuraciones' } },
            
            // Inventario Telas
            { path: 'inventario-telas', component: InventarioTelasComponent, data: { titulo: 'Inventario Telas' } },

            // Telas
            { path: 'telas', component: TelasComponent, data: { titulo: 'Telas' } },

            // Productos
            { path: 'productos', component: ProductosComponent, data: { titulo: 'Productos' } },

            // Cortes
            { path: 'cortes', component: CortesComponent, data: { titulo: 'Cortes' } },

        ]
    }

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }