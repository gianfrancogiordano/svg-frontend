import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class InventarioTelasService {

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

  constructor(private http: HttpClient) { }

  getTelas(pagina: number, porPagina: number, filtro: string) {

    return this.http.get(`${base_url}/telas?pagina=${pagina}&porPagina=${porPagina}&filtro=${filtro}`, this.headers)
      .pipe(
        map((resp: any) => resp.body)
      )
  }

  getTela(idTela: string) {
    return this.http.get(`${base_url}/telas/${idTela}`, this.headers)
      .pipe(
        map((resp: any) => resp.body)
      )
  }

  insertTela(data: any) {
    return this.http.post(`${base_url}/telas`, data, this.headers)
      .pipe(
        map((resp: any) => resp.body)
      )
  }

  updateTela(idTela: string, data: any) {
    return this.http.put(`${base_url}/telas/${idTela}`, data, this.headers)
      .pipe(
        map((resp: any) => resp.body)
      )
  }

  deleteTela(idTela: string) {
    return this.http.delete(`${base_url}/telas/${idTela}`, this.headers)
    .pipe(
      map((resp: any) => resp.body)
    )
  }

}
