import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiSucursalService {

  urlService: string = `${environment.API_URL_API}/sucursal`;

  constructor(private http: HttpClient) { }


  permisoPorSucursal(id: any): Observable<any> {
    return this.http.get(`${this.urlService}/permisosPorSucursal/${id}`);
  }

}
