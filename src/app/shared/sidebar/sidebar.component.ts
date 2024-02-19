import { Component, OnInit, Renderer2 } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public usuario: Usuario;
  public menu: any[] = [];
  public permisosModulo: any = {};
  public logoNegocio: string = '';

  constructor( private sidebarService: SidebarService,
               private usuarioService: UsuarioService,
               private renderer: Renderer2 ) {

    this.sidebarService.cargarMenu();
    this.menu = this.sidebarService.menu;
    this.usuario = this.usuarioService.usuario;
    this.logoNegocio = '';
    
  }

  ngOnInit() {
    this.getPermisos();
  }

  logout() {
    this.usuarioService.logout();
  }

  getPermisos() {
  }

  closeNavbar() {
    this.renderer.removeClass(document.body, 'show-sidebar');
    this.renderer.addClass(document.getElementById('hidden-ti-menu-close'), 'ti-menu');
  }

}
