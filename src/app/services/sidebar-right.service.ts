import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidebarRightService {

  private renderer: Renderer2;
  private _ocultarModal: boolean = true;

  constructor(public renderFactory: RendererFactory2,
              private router: Router) { 
    this.renderer = this.renderFactory.createRenderer(null, null);
  }

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(goto: string) {
    this.router.navigateByUrl(`${goto}`);
    this.renderer.addClass(document.body, 'modal-open');
    this._ocultarModal = false;
  }

  cerrarModal(goto: string) {
    this.router.navigateByUrl(`${goto}`);
    this.renderer.removeClass(document.body, 'modal-open');
    this._ocultarModal = true;
  }

}
