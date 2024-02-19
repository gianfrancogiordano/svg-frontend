import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PagesModule } from './pages/pages.module';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { SharedModule } from './shared/shared.module';

// importar locales
import localeCO from '@angular/common/locales/es-CO';

// registrar los locales con el nombre que quieras utilizar a la hora de proveer
registerLocaleData(localeCO, 'es-CO');

const wsUrl = environment.wsUrl;
const config: SocketIoConfig = { url: wsUrl, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    PagesModule,
    AuthModule,
    SharedModule,
    HttpClientModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-CO' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
