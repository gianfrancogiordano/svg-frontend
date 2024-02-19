import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {

  public submitBtn: boolean = false;
  public loginForm = this.fb.group({
    usuario: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    recordarme: [ false ]
  });

  constructor(private fb: UntypedFormBuilder,
              private usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit(): void {
    this.recordarme();
  }

  login() {

    if ( this.loginForm.invalid ) {
      return;
    }

    this.submitBtn = true;
    this.usuarioService.login( this.loginForm.value )
      .subscribe({
        next: () => {
          if (this.loginForm.get('recordarme')?.value ) {

            localStorage.setItem('usuario', this.loginForm.get('usuario')?.value);
            localStorage.setItem('recordarme', this.loginForm.get('recordarme')?.value);
  
          } else {
  
            localStorage.removeItem('usuario');
            localStorage.removeItem('recordarme');
  
          }

          this.submitBtn = false;
          this.router.navigateByUrl('/');
        },
        error: (e) => {
          this.submitBtn = false;
          Swal.fire({
            title: 'Error!',
            text: e.error.body,
            icon: 'error',
            confirmButtonText: 'Intentarlo nuevamente!',
            confirmButtonColor: '#398bf7',
          });
        }
      });
  }

  recordarme() {

    if (localStorage.getItem('recordarme') ) {
      const usuario = localStorage.getItem('usuario');
      this.loginForm.get('usuario')?.setValue(usuario);
      this.loginForm.get('recordarme')?.setValue(true);
    }

  }

}
