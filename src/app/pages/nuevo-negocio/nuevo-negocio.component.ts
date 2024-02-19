import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NegociosService } from 'src/app/services/negocios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-negocio',
  templateUrl: './nuevo-negocio.component.html',
  styleUrls: ['./nuevo-negocio.component.css']
})
export class NuevoNegocioComponent implements OnInit {

  public toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  });

  public usuarios: string[] = [];
  public identificadores: string[] = [];

  public btnSumitted: boolean = false;
  public formSubmitted: boolean = false;
  public formNegocio: FormGroup;

  constructor(private fb: FormBuilder,
    private negocioService: NegociosService,
    private router: Router) { }

  ngOnInit(): void {
    this.initFormNegocio()
    this.getUsuarios();
    this.getIdentificadores();
  }

  getIdentificadores() {
    this.negocioService.validarIdentificador()
      .subscribe((ident: any) => {
        ident.forEach(identificador => {
          this.identificadores.push(identificador.identnegocio);
        });
      });
  }

  getUsuarios() {
    this.negocioService.validarUsuario()
      .subscribe((usuarios: any) => {
        usuarios.forEach(usuario => {
          this.usuarios.push(usuario.user);
        });
      })
  }

  initFormNegocio() {

    this.formNegocio = this.fb.group({

      razonSocial: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      representante: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      identnegocio: ['', [Validators.required]],
      user: ['', [Validators.required]],
      password: ['123456', Validators.required],
      repassword: ['123456', Validators.required],
      plan: ['', [Validators.required]],
      metodoPago: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]

    },
      {
        validators: [this.equalpasswords('password', 'repassword'),
        this.validarUsuario('user'), this.validarIdentificador('identnegocio')],
      });

  }

  nuevoNegocio() {

    this.formSubmitted = true;
    if (this.formNegocio.valid) {

      const suscripcion = this.generarSuscripcion(this.formNegocio.controls['plan'].value);
      const nuevoNegocio = {
        logo: '',
        razon_social: this.formNegocio.controls['razonSocial'].value,
        nombre_comercial: this.formNegocio.controls['razonSocial'].value,
        documento: this.formNegocio.controls['documento'].value,
        representante: this.formNegocio.controls['representante'].value,
        direccion: this.formNegocio.controls['direccion'].value,
        telefono: this.formNegocio.controls['telefono'].value,
        email: this.formNegocio.controls['email'].value,
        banner: [],
        eslogan: "Configurar eslogan",
        distribuidor: "627920ff64ee96597ff08ab1",
        whatsapp: this.formNegocio.controls['telefono'].value,
        identnegocio: this.formNegocio.controls['identnegocio'].value,
        domain: `${this.formNegocio.controls['identnegocio'].value}.getcs.link`,
        gtag: "00000",
        pixel: "00000",
        user: this.formNegocio.controls['user'].value,
        password: this.formNegocio.controls['password'].value,
        metodo_pago: this.formNegocio.controls['metodoPago'].value,
        plan: this.formNegocio.controls['plan'].value,
        monto: suscripcion.monto,
        day: suscripcion.day
      }

      this.btnSumitted = true;
      this.negocioService.upsertNegocio(nuevoNegocio)
        .subscribe({
          next: (v) => {

            this.btnSumitted = false;
            this.toast.fire({
              icon: 'success',
              title: 'Negocio Creado Exitosamente!'
            });
            
            this.router.navigateByUrl(`dashboard/detalle-negocio/${v.negocio._id}`);

          },
          error: (e) => {

            console.log(e);

            this.btnSumitted = false;
            this.toast.fire({
              icon: 'error',
              title: 'Ocurrio un error al crear el negocio',
              text: e
            });
          },
        });

    }

  }

  generarSuscripcion(plan: string) {

    let suscripcion = { monto: 0, day: 0 }

    switch (plan) {

      case 'PLAN 1 MES': 
        suscripcion = { monto: 79900, day: 31 }
        break;

      case 'PLAN 3 MESES':
        suscripcion = { monto: 197000, day: 91 }
        break;

      case 'PLAN 6 MESES':
        suscripcion = { monto: 397000, day: 181 }
        break;

      case 'PLAN 12 MESES':
        suscripcion = { monto: 497000, day: 366 }
        break;

      case 'PLAN 24 MESES':
        suscripcion = { monto: 697000, day: 731 }
        break;
    }

    return suscripcion;

  }

  campoNoValido(campo: string): boolean {

    if (this.formNegocio.get(campo)!.invalid && this.formSubmitted) { return true; }
    else { return false; }

  }

  generarIdentificador() {
    this.formNegocio.get('identnegocio')!.setValue(this.formNegocio.get('razonSocial')!.value.replace(/ /g, "").toLowerCase());
    this.formNegocio.get('user')!.setValue(this.formNegocio.get('razonSocial')!.value.replace(/ /g, "").toLowerCase() + 'admin');
  }

  equalpasswords(clave: string, reclave: string) {
    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(clave);
      const pass2Control = formGroup.get(reclave);

      if (pass1Control!.value === pass2Control!.value) {
        pass2Control!.setErrors(null);
      } else {
        pass2Control!.setErrors({ noEsIgual: true });
      }

    }

  }

  validarUsuario(user: string) {
    return (formGroup: FormGroup) => {

      const userControl = formGroup.get(user);
      if (this.usuarios.includes(userControl!.value)) {
        userControl!.setErrors({ usuarioExiste: true })
      } else {
        userControl!.setErrors(null);
      }

    }
  }

  validarIdentificador(identnegocio: string) {
    return (formGroup: FormGroup) => {

      const identControl = formGroup.get(identnegocio);
      if (this.identificadores.includes(identControl!.value)) {
        identControl!.setErrors({ identificadorExiste: true })
      } else {
        identControl!.setErrors(null);
      }

    }
  }

}
