import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterPipe } from '../../pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { NegocioService } from '../../services/negocio.service';
import { CardProductoCantidadComponent } from '../card-producto-cantidad/card-producto-cantidad.component';

@Component({
  selector: 'app-inventario-asociado',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FilterPipe,
    CardProductoCantidadComponent
  ],
  templateUrl: './inventario-asociado.component.html',
  styleUrl: './inventario-asociado.component.scss'
})
export class InventarioAsociadoComponent {
  inventarios: any[] = [];
  filtro: string = '';

  search: string = '';

  cappn_userkey: any;

  @Input() idProducto: any;

  @Output() clickNuevo = new EventEmitter<any>();
  @Output() clickSeleccion = new EventEmitter<any>();

  constructor(private negocioService: NegocioService) {

  }

  ngOnInit() {
    let session: any = sessionStorage.getItem('cappn_userkey');
    this.cappn_userkey = JSON.parse(session);
    if (this.idProducto) {
      this.obtenerInventarioPorProductos(this.idProducto);
    }
  }

  obtenerInventarioPorProductos(idProducto: any) {
    this.negocioService.obtenerInventarioPorProductos(idProducto).subscribe(response => {
      this.inventarios = response.data;
    });
  }

  irAsociar() {
    this.clickNuevo.emit(null);
  }

  eliminarAsocio(event: any) {
    this.negocioService.deleteInventarioPorProductos(event.id).subscribe(response => {
      this.obtenerInventarioPorProductos(this.idProducto);
    });

  }


}
