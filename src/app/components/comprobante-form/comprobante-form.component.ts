import { Component, Input } from '@angular/core';
import { ClientesComponent } from '../../pages/clientes/clientes.component';
import { ListaClientesComponent } from '../lista-clientes/lista-clientes.component';
import { PartnersComponent } from '../../shared/partners/partners.component';
import { CommonModule } from '@angular/common';
import { ProductoVentaComponent } from '../producto-venta/producto-venta.component';
import { PartnertSeleccionadoComponent } from '../partnert-seleccionado/partnert-seleccionado.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe';
import { NegocioService } from '../../services/negocio.service';
declare let $: any;

@Component({
  selector: 'app-comprobante-form',
  standalone: true,
  imports: [FormsModule, FilterPipe, PartnersComponent, CommonModule, ProductoVentaComponent,
    PartnertSeleccionadoComponent],
  templateUrl: './comprobante-form.component.html',
  styleUrl: './comprobante-form.component.scss'
})
export class ComprobanteFormComponent {
  @Input() idNegocio: any;

  cappn_userkey: any;

  partnerSeleccionado: any = null;
  subopcionaMostrar: any = null; //partners

  search: any = '';
  searchFactura: any = '';
  productos: any[] = [];
  productosVendidos: any[] = [];
  constructor(private negocioService: NegocioService) {

  }

   ngOnInit() { window.scrollTo(0, 0);
    let session: any = sessionStorage.getItem('cappn_userkey');
    this.cappn_userkey = JSON.parse(session);
    this.obtenerProductoPorNegocio(this.cappn_userkey.idnegocio);
  }

  obtenerProductoPorNegocio(idNegocio: any) {
    this.negocioService.productoPorNegocio(idNegocio).subscribe(response => {
      this.productos = response.data;
      this.productos.forEach(producto => {
        producto.cantidad = ''; // Puedes asignar el valor que desees
      });

      $(document).ready(function () {
        $('.collapsible').collapsible();
      });
    });
  }


  listaProductosSeleccionados() {
    return this.productos = this.productos.filter(producto => {
      return producto.cantidad > 1;
    });

  }


  registroSeleccionado(evt: any) {
    console.log('llega al otro', evt);
    this.partnerSeleccionado = evt;
    this.subopcionaMostrar = null;
  }

  calcularTotal(): number {
    let total = 0;
    this.productos.forEach(producto => {
      // Verificar si la cantidad es un número válido
      if (!isNaN(producto.cantidad) && producto.cantidad != "") {
        total += parseFloat(producto.cantidad) * parseFloat(producto.precio);
      }
    });
    return total;
  }
}
