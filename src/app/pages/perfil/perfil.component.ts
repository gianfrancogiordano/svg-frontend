import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  // Logo
  public imagenUpload: File;
  public imgTemp: any = null;
  public editImg: Boolean = false;
  public logoActual: string = '';

  public toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  });
  public submitBtn: boolean = false;
  public formSubmitted: boolean = false;

  public formUsuario: UntypedFormGroup;

  private idUsuario: any = '';
  public uploadImg = false;

  constructor(private fb: UntypedFormBuilder,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.idUsuario = this.usuarioService.usuario.uid;
    this.initFormUsuario();
    this.getUsuarioData();
  }

  initFormUsuario() {

    this.formUsuario = this.fb.group({
      nombre: ['', [Validators.required]],
      user: ['', [Validators.required]],
      password: [''],
      email: ['', [Validators.email]],
    });

  }

  getUsuarioData() {
    this.usuarioService.getUsuario(this.idUsuario)
      .subscribe(usuario => {

        this.logoActual = usuario.firma;
        this.formUsuario = this.fb.group({
          nombre: [usuario.nombre],
          user: [usuario.user],
          password: [''],
          email: [usuario.email],
        });

      });
  }

  actualizar() {
    this.formSubmitted = true;
    if (this.formUsuario.valid) {

      const usuarioUpdateData = {
        ... this.formUsuario.value,
      }

      if (usuarioUpdateData.password === '') {
        delete usuarioUpdateData.password;
      }
      
      this.usuarioService.updateUsuario(usuarioUpdateData, this.idUsuario)
        .subscribe((resp: any) => {

          this.toast.fire({
            icon: 'success',
            title: 'Actualizado'
          });

        }, (error: any) => {
          Swal.fire('Error', `Ocurio un error inesperado, comunicate con el administrador del aplicativo`, 'error');
        });
    }

  }

  createDates(date: string): string {

    const newDate = new Date(date);
    let anno: any = newDate.getFullYear();
    let mes: any = newDate.getMonth() + 1;
    let dia: any = newDate.getDate();
    mes = (mes < 10) ? ('0' + mes) : mes;
    dia = (dia < 10) ? ('0' + dia) : dia;
    return anno + '-' + mes + '-' + dia;

  }

  campoNoValido(campo: string): boolean {
    if (this.formUsuario.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
}
