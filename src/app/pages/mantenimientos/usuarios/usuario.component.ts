import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from 'src/app/services/roles.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit {

  public toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  });

  public submitBtn: boolean = false;
  public roles: any = [];
  public editUsuario: any = [];
  public editValidators: any = [];
  public formSubmitted: boolean = false;
  public uid: string;
  public formUsuario: FormGroup;

  constructor( private route: ActivatedRoute,
               private router: Router,
               private fb: UntypedFormBuilder,
               private usuarioService: UsuarioService,
               private rolesService: RolesService) { }

  ngOnInit() {
    this.initFormUsuario();
    this.getRoles();
    this.route.params.subscribe( params => {
      this.uid = params['id'];
      this.getUsuario();
    });
  }

  initFormUsuario() {

    this.formUsuario = this.fb.group({

      nombre: ['', [Validators.required]],
      user: ['', [Validators.required]],
      password: ['', this.editValidators],
      repassword: ['', this.editValidators],
      role: ['', [Validators.required]],
      email: ['', [Validators.required]],
      activo: ['1', [Validators.required]],

    },
      {
        validators: [this.equalpasswords('password', 'repassword')]
      });

  }

  getRoles() {
    this.rolesService.getRoles(1, 1000, '')
      .subscribe(roles => {
        this.roles = roles.data;
      });
  }

  getUsuario() {

    if (this.uid === 'nuevo') {

      this.formUsuario.get('password')!.setValidators( this.editValidators.concat(Validators.required) );
      this.formUsuario.get('repassword')!.setValidators( this.editValidators.concat(Validators.required) );
      this.formUsuario.get('password')!.updateValueAndValidity();
      this.formUsuario.get('repassword')!.updateValueAndValidity();
      return;

    } else {

      this.usuarioService.getUsuario(this.uid)
        .subscribe(resp => {

          console.log(resp);

          this.editUsuario = resp;
          this.formUsuario.setValue({

            nombre: resp.nombre || '',
            user: resp.user || '',
            password: '',
            repassword: '',
            role: resp.role || '',
            activo: resp.activo || '',
            email: resp.email || '',

          });
        });

    }
    
  }

  nuevoUsuario() {

    if (this.uid === 'nuevo') {

      this.formSubmitted = true;
      if ( this.formUsuario.valid ) {

        // Eliminamos espacios en blanco del usuario inicio y final de la cadena
        this.formUsuario.get('user')!.setValue(this.formUsuario.get('user')!.value.trim());

        // Eliminamos espacios en blanco en cualquier parte de la cadena
        this.formUsuario.get('user')!.setValue(this.formUsuario.get('user')!.value.replace(/ /g, ""));

        const datos = {
          ... this.formUsuario.value,
          negocio: this.usuarioService.usuario.negocio
        }

        this.submitBtn = true;
        this.usuarioService.nuevoUsuario(datos)
          .subscribe( resp => {

            Swal.fire('Usuario Creado', `El usuario ${this.formUsuario.get('nombre')!.value} fue creado con exito`, 'success');

            this.formSubmitted = false;
            this.submitBtn = false;
            this.formUsuario.reset();
            this.initFormUsuario();

            this.router.navigateByUrl('dashboard/usuarios');


          }, (err: any) => {

            console.log(err);

            Swal.fire({
              title: 'Upps ...',
              text: `${ err.error.body }`,
              icon: 'error',
              confirmButtonText: 'Entiendo ...',
              confirmButtonColor: '#398bf7',
            });

            this.formSubmitted = false;
            this.submitBtn = false;

          });

      }

    } else {

      const usuarioUpdateData = {
        ... this.formUsuario.value,
        _id: this.editUsuario._id,
        negocio: this.editUsuario.negocio
      }

      if(usuarioUpdateData.password === '') {
        delete usuarioUpdateData.password;
      }

      delete usuarioUpdateData.repassword;

      this.usuarioService.updateUsuario(usuarioUpdateData, this.editUsuario._id)
        .subscribe(resp => {
          this.submitBtn = false;

          this.toast.fire({
            icon: 'success',
            title: 'Usuario Actualizado!'
          });

        });

    }

  }

  campoNoValido( campo: string ): boolean {

    if( this.formUsuario.get( campo )!.invalid && this.formSubmitted ) {
      return true;

    } else { return false; }

  }

  equalpasswords(clave: string, reclave: string) {
    return (formGroup: UntypedFormGroup) => {

      const pass1Control = formGroup.get( clave );
      const pass2Control = formGroup.get( reclave );

      if ( pass1Control!.value === pass2Control!.value ) {
        pass2Control!.setErrors( null );
      } else {
        pass2Control!.setErrors({ noEsIgual: true });
      }

    }

  }

}
