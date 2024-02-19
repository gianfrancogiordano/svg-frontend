import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

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

  getAnalytics(idNegocio: string, fechaDesde: string, fechaHasta: string) {

    return this.http.get(`${base_url}/analytics/admin/${idNegocio}?desde=${fechaDesde}&hasta=${fechaHasta}`, this.headers)
      .pipe(
        map((resp: any) => resp.body)
      )
  }

}
