import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewSuscriptionComponent } from './new-suscription/new-suscription.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    NewSuscriptionComponent,
  ],
  exports: [
    ReactiveFormsModule
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
