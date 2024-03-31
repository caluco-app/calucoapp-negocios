import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe';

import { NegocioService } from '../../services/negocio.service';
import { CardProductoCantidadComponent } from '../card-producto-cantidad/card-producto-cantidad.component';

@Component({
  selector: 'app-inventario-asociar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FilterPipe,
    CardProductoCantidadComponent
  ],
  templateUrl: './inventario-asociar.component.html',
  styleUrl: './inventario-asociar.component.scss'
})
export class InventarioAsociarComponent {
  inventarios: any[] = [];
  filtro: string = '';



  search: string = '';

  cappn_userkey: any;

  @Input() idProducto: any;

  @Output() clickSalir = new EventEmitter<any>();
  @Output() clickNuevo = new EventEmitter<any>();
  @Output() clickSeleccion = new EventEmitter<any>();

  constructor(private negocioService: NegocioService) {

  }

   ngOnInit() { window.scrollTo(0, 0);
    let session: any = sessionStorage.getItem('cappn_userkey');
    this.cappn_userkey = JSON.parse(session);
    if (this.cappn_userkey.idnegocio) {
      this.obtenerInventarioPorProductosNoSelccionado(this.idProducto);
    }
    console.log('idProducto', this.idProducto);
  }

  obtenerInventarioPorProductosNoSelccionado(idProducto: any) {
    this.negocioService.obtenerInventarioPorProductosNoSelccionado(idProducto).subscribe(response => {
      this.inventarios = response.data;
    });
  }

  asociar(event: any) {
    let data = { ...event, idproducto: this.idProducto, idinventario: event.id };
    data.id = '';

    this.negocioService.inventarioPorProductosMtto(data).subscribe(response => {

      this.clickSalir.emit(null);
    });
  }



}
