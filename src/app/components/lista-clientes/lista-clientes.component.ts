import { Component, EventEmitter, Output } from '@angular/core';
import { NegocioService } from '../../services/negocio.service';
import { CommonModule } from '@angular/common';

import { FilterPipe } from '../../pipes/filter.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-clientes',
  standalone: true,
  imports: [CommonModule, FilterPipe, FormsModule],
  providers: [NegocioService],
  templateUrl: './lista-clientes.component.html',
  styleUrl: './lista-clientes.component.scss'
})
export class ListaClientesComponent {
  search:string='';
  socios: any[] = [];
  cappn_userkey: any;

  @Output() clickNuevo = new EventEmitter<any>();
  @Output() clickSeleccion = new EventEmitter<any>();

  constructor(private negocioService: NegocioService) {

  }

  ngOnInit() {
    let session: any = sessionStorage.getItem('cappn_userkey');
    this.cappn_userkey = JSON.parse(session);
    this.obtenerClientes(this.cappn_userkey.idnegocio);
  }

  obtenerClientes(idNegocio: any) {
    this.negocioService.obtenerSociosPorNegocio(idNegocio).subscribe(response => {
      this.socios = response.data;
    });
  }

  nuevo() {
    this.clickNuevo.emit(null);
  }

  seleccionar(data:any){
    this.clickSeleccion.emit(data);
  }

}
