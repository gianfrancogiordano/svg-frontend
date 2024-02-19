import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  // Observable string sources
  private emitChangeSource = new Subject<any>();

  // Observable string streams
  public changeEmitted$ = this.emitChangeSource.asObservable();

  constructor(private http: HttpClient) { }

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

  // Service message commands
  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }

  getClientes(pagina: number, porPagina: number, filtro: string) {

    return this.http.get(`${base_url}/clientes?pagina=${pagina}&porPagina=${porPagina}&filtro=${filtro}`, this.headers)
      .pipe(
        map((resp: any) => resp.body)
      )
  }

  getCliente(idCliente: string) {
    return this.http.get(`${base_url}/clientes/${idCliente}`, this.headers)
      .pipe(
        map((resp: any) => resp.body)
      )
  }

  upsertCliente(data: any) {
    return this.http.post(`${base_url}/clientes`, data, this.headers)
      .pipe(
        map((resp: any) => resp.body)
      )
  }

  updateCliente(idCliente: string, data: any) {
    return this.http.put(`${base_url}/clientes/${idCliente}`, data, this.headers)
    .pipe(
      map((resp: any) => resp.body)
    )
  }

}
