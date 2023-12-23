import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlService: string = `${environment.API_URL_API}`;

  constructor(private http: HttpClient) { }

  login(data: any):Observable<any> {
    return this.http.post(`${this.urlService}/login`, data);
  }

  validarUsuarioNegocio(data: any):Observable<any> {
    return this.http.post(`${this.urlService}/validarUsuarioNegocio`, data);
  }

}
