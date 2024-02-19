import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RolesService } from 'src/app/services/roles.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styles: [
  ]
})
export class RolComponent implements OnInit {

  public permisosModulo: any = {};
  public roleId: string = '';
  public role = {

      descripcion: "",
      negocio: "",
      modulos: [
        {
          modulo: "administrativo[Menu]",
          visualizar: true,
          editar: true,
          eliminar: true,
          descripcion: 'Ver apartado "Administrativo" del menu principal'
        },
        {
          modulo: "dashboard[SubMenu]",
          visualizar: true,
          editar: true,
          eliminar: true,
          descripcion: 'Ver apartado "Dashboard" del menu principal'
        },
        {
          modulo: "roles[SubMenu]",
          visualizar: true,
          editar: true,
          eliminar: true,
          descripcion: 'Ver y Editar los roles de los usuarios'
        },
        {
          modulo: "usuarios[SubMenu]",
          visualizar: true,
          editar: true,
          eliminar: true,
          descripcion: 'Ver y Editar los usuarios del sistema'
        },
        {
          modulo: "perfil[Usuario]",
          visualizar: true,
          editar: true,
          eliminar: true,
          descripcion: 'El usuario puede editar su perfil'
        },
        {
          modulo: "productos[Menu]",
          visualizar: true,
          editar: true,
          eliminar: true,
          descripcion: 'Ver apartado "Productos" del menu principal'
        },
        {
          modulo: "productos[SubMenu]",
          visualizar: true,
          editar: true,
          eliminar: true,
          descripcion: 'Ver y Editar el market del negocio'
        },
        {
          modulo: "clientes[Menu]",
          visualizar: true,
          editar: true,
          eliminar: true,
          descripcion: 'Ver apartado "Clientes" del menu principal'
        },
        {
          modulo: "clientes[SubMenu]",
          visualizar: true,
          editar: true,
          eliminar: true,
          descripcion: 'Ver y Editar los clientes del negocio'
        },
        {
          modulo: "pedidos[Menu]",
          visualizar: true,
          editar: true,
          eliminar: true,
          descripcion: 'Ver y Editar la configuración de Pedidos'
        },
        {
          modulo: "pedidos[SubMenu]",
          visualizar: true,
          editar: true,
          eliminar: true,
          descripcion: 'Ver y Editar la configuración de Pedidos'
        },
        {
          modulo: "negocio[Menu]",
          visualizar: true,
          editar: true,
          eliminar: true,
          descripcion: 'Ver y Editar la configuración del negocio'
        },
        {
          modulo: "negocio[SubMenu]",
          visualizar: true,
          editar: true,
          eliminar: true,
          descripcion: 'Ver y Editar la configuración del negocio'
        }
      ]
    };

  constructor(private route: ActivatedRoute,
              private rolesService: RolesService,
              private usuarioService: UsuarioService) { }

  ngOnInit() {

    this.getPermisos();

    this.route.params.subscribe(params => {

      this.roleId = params['id']
      if (this.roleId != 'nuevo') {
        this.getRole();
      } else {
        this.role.negocio = this.usuarioService.usuario.negocio || '';
      }

    });
  }

  getPermisos() {
    const permisos = this.usuarioService.usuario.role.modulos;
    permisos.forEach(m => {
      if (m.modulo === 'roles[SubMenu]') {
        this.permisosModulo = m;
      }
    });
  }

  getRole() {

    this.rolesService.getRole(this.roleId)
        .subscribe( (role: any) => {

          this.role.modulos.forEach( roleSistema => {

            let moduloNuevo = false;
            role.modulos.forEach( usuarioRole => {
              
              if ( roleSistema.modulo === usuarioRole.modulo ) {
                moduloNuevo = true;
              }

            });

            if(!moduloNuevo) {
              role.modulos.push( roleSistema );
            }

          });

          this.role = role;

        });
  }

  actualizarRole(): any {

    if (this.roleId == 'nuevo') {

      if( this.role.descripcion === '' ) {
        return Swal.fire({
          title: 'Error!',
          text: `Debe escribir el nombre del role`,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#398bf7',
        });
      }

      console.log(this.role);

      this.rolesService.newRole( this.role )
          .subscribe( newRole => {

            this.role = newRole;
            Swal.fire({
              title: 'Nuevo Role',
              text: `El role fue creado con exito`,
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#398bf7',
            });

          }, (error: any) => {

            Swal.fire({
              title: 'Error!',
              text: `${error.error.body}`,
              icon: 'error',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#398bf7',
            });

          });

    } else {

      this.rolesService.updateRole(this.roleId, this.role)
        .subscribe(updatedRole => {

          this.role = updatedRole;
          Swal.fire({
            title: 'Role Actualizado',
            text: `El role fue actualizado con exito`,
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#398bf7',
          });

        }, (error: any) => {

          Swal.fire({
            title: 'Error!',
            text: `${error.error.body}`,
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#398bf7',
          });

        });
    }

  }
  
}
