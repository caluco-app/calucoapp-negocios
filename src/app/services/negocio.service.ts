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


  inventarioPorNegocio(id: any): Observable<any> {
    return this.http.get(`${this.urlService}/inventarioPorNegocio/${id}`);
  }

  productoPorNegocio(id: any): Observable<any> {
    return this.http.get(`${this.urlService}/productosPorNegocio/${id}`);
  }

  ofertasPorProductos(id: any): Observable<any> {
    return this.http.get(`${this.urlService}/ofertasPorProductos/${id}`);
  }

  ofertasPorProductosFiltroVenta(data: any): Observable<any> {
    return this.http.post(`${this.urlService}/ofertasPorProductosFiltroVenta`, data);
  }

  ofertasPorProductosFiltro(filtro: any): Observable<any> {
    return this.http.get(`${this.urlService}/ofertasPorProductos/${filtro}`);
  }

  deleteOfertasPorProductos(id: any): Observable<any> {
    return this.http.delete(`${this.urlService}/ofertasPorProductos/${id}`);
  }

  deleteInventarioPorProductos(id: any): Observable<any> {
    return this.http.delete(`${this.urlService}/inventarioPorProductos/${id}`);
  }

  inventarioPorProductos(id: any): Observable<any> {
    return this.http.get(`${this.urlService}/inventarioPorProductos/${id}`);
  }

  stockPorInventario(idNegocio: any, idInventario: any): Observable<any> {
    return this.http.get(`${this.urlService}/stockPorInventario/${idNegocio}/${idInventario}`);
  }

  stockPorIdInventario(idInventario: any): Observable<any> {
    return this.http.get(`${this.urlService}/stockPorIdInventario/${idInventario}`);
  }


  productosPorNegocios(id: any): Observable<any> {
    return this.http.get(`${this.urlService}/productosPorNegocios/${id}`);
  }
  productoMttoNegocio(data: any): Observable<any> {
    return this.http.post(`${this.urlService}/productosPorNegocio`, data);
  }

  ofertasPorProductosMtto(data: any): Observable<any> {
    return this.http.post(`${this.urlService}/ofertasPorProductos`, data);
  }

  inventarioPorProductosMtto(data: any): Observable<any> {
    return this.http.post(`${this.urlService}/inventarioPorProductos`, data);
  }

  inventarioMttoNegocio(data: any): Observable<any> {
    return this.http.post(`${this.urlService}/inventariosPorNegocio`, data);
  }

  stocksMttoNegocio(data: any): Observable<any> {
    return this.http.post(`${this.urlService}/stocksPorNegocio`, data);
  }

  clientesMtto(data: any): Observable<any> {
    return this.http.post(`${this.urlService}/clientes`, data);
  }

  sociosPorNegocioMtto(data: any): Observable<any> {
    return this.http.post(`${this.urlService}/sociospornegocio`, data);
  }

  obtenerClientes(): Observable<any> {
    return this.http.get(`${this.urlService}/clientes`);
  }

  obtenerSociosPorNegocio(idNegocio:any): Observable<any> {
    return this.http.get(`${this.urlService}/sociospornegocio/${idNegocio}`);
  }

  obtenerInventarioPorProductos(idproducto:any): Observable<any> {
    return this.http.get(`${this.urlService}/inventarioPorProductoSeleccionado/${idproducto}`);
  }

  obtenerInventarioPorProductosNoSelccionado(idnegocio:any): Observable<any> {
    return this.http.get(`${this.urlService}/inventarioPorProductoNoSeleccionado/${idnegocio}`);
  }

  obtenerClientesPorFiltro(filtro: any): Observable<any> {
    return this.http.get(`${this.urlService}/clientes/${filtro}`);
  }

  obtenerTiposDeFacturas(): Observable<any> {
    return this.http.get(`${this.urlService}/tiposfactura`);
  }

  obtenerPeridosTributarios(): Observable<any> {
    return this.http.get(`${this.urlService}/peridotributarios`);
  }

  generarFactura(data: any): Observable<any> {
    return this.http.post(`${this.urlService}/facturacion`, data);
  }



}
