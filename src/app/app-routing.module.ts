import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PagesRoutingModule } from './pages/pages.routing'

const routes: Routes = [

  // path: '/login'    AuthRouting
  // path: '/dashboard' PagesRouting
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            AuthRoutingModule,
            PagesRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
