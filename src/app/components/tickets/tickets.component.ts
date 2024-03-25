import { Component, Input } from '@angular/core';
import { TicketsListaComponent } from '../tickets-lista/tickets-lista.component';
import { TicketsDetalleComponent } from '../tickets-detalle/tickets-detalle.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, TicketsListaComponent, TicketsDetalleComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent {
  @Input() idSucursal!: string;
  detalle: any;

  pantalla:string='lista';

  obtnerDetalle(evt:any) {
    console.log(evt);
    this.detalle = evt;
    this.pantalla ='comprobante';
  }
}
