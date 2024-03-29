import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'src/app/interfaces/table.interfaces';
import { RolesService } from 'src/app/services/roles.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  public toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  public permisosModulo: any = {};
  public cargando: boolean = true;
  public porPagina: number = 10;
  public filtro: string = '';
  public tableData: Table = {
    conteo: 0,
    data: [],
    pagActual: 1,
    ultimaPag: 1,
    pagSiguiente: 0,
    pagAnterior: 0,
    pagTotal: 0,
    paginas: []
  };

  constructor(private rolesService: RolesService,
              private router: Router,
              private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.getPermisos();
    this.getRoles(this.tableData.pagActual);
  }

  getPermisos() {
    const permisos = this.usuarioService.usuario.role.modulos;
    permisos.forEach(m => {
      if (m.modulo === 'roles[SubMenu]' ) { 
        this.permisosModulo = m;
      }
    });

  }

  getRoles(pagina: number) {
    this.rolesService.getRoles( pagina, this.porPagina, this.filtro )
          .subscribe( roles => {
            this.cargando = false;
            this.tableData = roles;
          });
  }

  buscarRole( query: string ) {
    this.filtro = query;
    this.getRoles(this.tableData.pagActual);
  }

  actualizarRole( role: any ) {
    if(this.permisosModulo.editar) {
      this.router.navigateByUrl(`/dashboard/role/${role._id}`);

    } else {

      this.toast.fire({
        icon: 'error',
        title: 'No tienes permiso para editar!'
      });

    }
  }

  mostrar(event: any): void {
    this.porPagina = Number(event.value);
    this.getRoles(this.tableData.pagActual);
  }

}
