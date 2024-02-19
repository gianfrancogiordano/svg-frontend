import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WebsocketService } from './sockets.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient,
    public ws: WebsocketService) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  getDataPedidos(desde: string, hasta: string) {

    return this.http.get(`${base_url}/dashboard/ventas?desde=${desde}&hasta=${hasta}`, this.headers)
      .pipe(
        map((resp: any) => resp.body)
      )
  }

  getAlarmStock(pagina: number, porPagina: number) {

    return this.http.get(`${base_url}/dashboard/stockalarm?pagina=${pagina}&porPagina=${porPagina}`, this.headers)
      .pipe(
        map((resp: any) => resp.body)
      )
  }

  listenUsuariosActivos() {
    return this.ws.listen('all-usuarios-activos-negocio');
  }

}
