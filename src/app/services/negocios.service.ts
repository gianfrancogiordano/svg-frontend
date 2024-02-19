import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class NegociosService {

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

  getNegocios(pagina: number, porPagina: number, filtro: string) {

    return this.http.get(`${base_url}/negocios?pagina=${pagina}&porPagina=${porPagina}&filtro=${filtro}`, this.headers)
      .pipe(
        map((resp: any) => resp.body)
      )
  }

  getNegocio(idNegocio: string) {
    return this.http.get(`${base_url}/negocios/${idNegocio}`, this.headers)
      .pipe(
        map((resp: any) => resp.body)
      )
  }

  getDataNegocio(idNegocio: string) {
    return this.http.get(`${base_url}/negocios/data/${idNegocio}`, this.headers)
      .pipe(
        map((resp: any) => resp.body)
      )
  }

  validarUsuario(): Observable<boolean> {
    return this.http.get(`${base_url}/negocios/validarusuario`, this.headers)
      .pipe(
        map((resp: any) => resp.body)
      )
  }

  validarIdentificador(): Observable<boolean> {
    return this.http.get(`${base_url}/negocios/validaridentificador`, this.headers)
      .pipe(
        map((resp: any) => resp.body)
      )
  }

  upsertNegocio(data: any) {
    return this.http.post(`${base_url}/negocios`, data, this.headers)
      .pipe(
        map((resp: any) => resp.body)
      )
  }

  updateNegocio(idCliente: string, data: any) {
    return this.http.put(`${base_url}/negocios/${idCliente}`, data, this.headers)
    .pipe(
      map((resp: any) => resp.body)
    )
  }

  renewSuscription(data) {
    return this.http.post(`${base_url}/suscripcion`, data, this.headers)
    .pipe(
      map((resp: any) => resp.body)
    )
  }

}
