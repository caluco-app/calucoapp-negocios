import { Component, Input } from '@angular/core';
import { ClientesComponent } from '../../pages/clientes/clientes.component';
import { ListaClientesComponent } from '../lista-clientes/lista-clientes.component';
import { PartnersComponent } from '../../shared/partners/partners.component';
import { CommonModule } from '@angular/common';
import { ProductoVentaComponent } from '../producto-venta/producto-venta.component';
declare let $:any;

@Component({
  selector: 'app-comprobante-form',
  standalone: true,
  imports: [PartnersComponent, CommonModule, ProductoVentaComponent],
  templateUrl: './comprobante-form.component.html',
  styleUrl: './comprobante-form.component.scss'
})
export class ComprobanteFormComponent {
  @Input() idNegocio: any;

  partnerSeleccionado:any=null;

  ngOnInit(){
    $(document).ready(function(){
      $('.collapsible').collapsible();
    });
  }

  registroSeleccionado(evt:any){
    console.log('llega al otro',evt);
    this.partnerSeleccionado=evt;
  }
}
