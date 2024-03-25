import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiTicketsService {

  urlService: string = `${environment.API_URL_API}/tickets`;

  constructor(private http: HttpClient) { }


  obtnerTicketsPorSucursal(idsucursal: any): Observable<any> {
    return this.http.get(`${this.urlService}/obtnerTicketsPorSucursal/${idsucursal}`);
  }

  obtnerTicketsPorID(id: any): Observable<any> {
    return this.http.get(`${this.urlService}/obtnerTicketsPorID/${id}`);
  }

  obtnerProductosPorNegocio(idnegocio: any, filtro: any): Observable<any> {
    return this.http.post(`${this.urlService}/obtnerProductosPorSucursal`, { idsucursal: idnegocio, filtro: filtro });
  }

  insertarTicketItem(data:any): Observable<any> {
    return this.http.post(`${this.urlService}/insertarTicketItem`, data);
  }

  obtnerDetalleTickets(data:any): Observable<any> {
    return this.http.post(`${this.urlService}/obtnerDetalleTickets`, data);
  }

  nuevoTicket(data:any): Observable<any> {
    return this.http.post(`${this.urlService}/nuevoTicket`, data);
  }
}
