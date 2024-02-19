import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public permisosModulo: any = {};
  public usuario: Usuario;
  public logoNegocio: string = '';
  public nombreNegocio: string = '';
  public activo: number = 1;

  public base_url: string = '';

  constructor(private usuarioService: UsuarioService) {

    this.usuario = this.usuarioService.usuario;
    this.logoNegocio = '';
    this.nombreNegocio = 'Clickstore Administrativo';
  }

  ngOnInit() {
    this.getUrl();
  }

  getUrl() {
    let getLink =  window.location.href;
    let url_base = getLink.split('/');
    this.base_url = `${url_base[0]}//${url_base[2]}`;
  }
  soporte() {
  }

  goStore() {
  }

  logout() {
    this.usuarioService.logout();
  }

}
