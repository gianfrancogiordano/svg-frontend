import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ColorPickerModule } from 'ngx-color-picker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { QRCodeModule } from 'angularx-qrcode';

import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RolComponent } from './mantenimientos/roles/rol.component';
import { RolesComponent } from './mantenimientos/roles/roles.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { UsuarioComponent } from './mantenimientos/usuarios/usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';
import { NegociosComponent } from './negocios/negocios.component';
import { DetalleNegociosComponent } from './detalle-negocios/detalle-negocios.component';
import { NuevoNegocioComponent } from './nuevo-negocio/nuevo-negocio.component';
import { CuentasCobroComponent } from './cuentas-cobro/cuentas-cobro.component';
import { InventarioTelasComponent } from './inventario-telas/inventario-telas.component';
import { TelasComponent } from './telas/telas.component';
import { ProductosComponent } from './productos/productos.component';
import { CortesComponent } from './cortes/cortes.component';

@NgModule({
  declarations: [
    PagesComponent,
    AccountSettingsComponent,
    DashboardComponent,
    PerfilComponent,
    RolComponent,
    RolesComponent,
    UsuariosComponent,
    UsuarioComponent,
    NegociosComponent,
    DetalleNegociosComponent,
    NuevoNegocioComponent,
    CuentasCobroComponent,
    InventarioTelasComponent,
    TelasComponent,
    ProductosComponent,
    CortesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    QRCodeModule,
    ColorPickerModule,
    PipesModule,
    ComponentsModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ]
})
export class PagesModule { }
