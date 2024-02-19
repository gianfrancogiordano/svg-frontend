import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

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

  getConfig() {
    return this.http.get(`${base_url}/configuracion`, this.headers)
      .pipe(
        map((resp: any) => resp.body)
      )
  }

  upsertConfig(data: any) {
    return this.http.post(`${base_url}/configuracion`, data, this.headers)
      .pipe(
        map((resp: any) => resp.body)
      )
  }
}
