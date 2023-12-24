import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {

  urlService: string = `${environment.API_URL_API}`;

  constructor(private http: HttpClient) { }


  inventarioPorNegocio(id: any):Observable<any> {
    return this.http.get(`${this.urlService}/inventarioPorNegocio/${id}`);
  }

  productosPorNegocios(id: any):Observable<any> {
    return this.http.get(`${this.urlService}/productosPorNegocios/${id}`);
  }

}
