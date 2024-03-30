import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { ApiTicketsService } from '../../services/api-tickets.service';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter.pipe';
declare let $: any;

@Component({
  selector: 'app-tickets-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPipe],
  providers: [ApiTicketsService],
  templateUrl: './tickets-lista.component.html',
  styleUrl: './tickets-lista.component.scss'
})
export class TicketsListaComponent implements AfterViewInit {
  @Output() detalle = new EventEmitter<any>();
  @Input() idSucursal!: string;
  cappn_userkey: any;
  displayedColumns: string[] = ['fecha', 'codigo', 'total', 'idusuario'];
  dataSource:any[] = [];
  clickedRows = new Set<Comprobantes>([]);
  filtroTickets:string='';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiTicket: ApiTicketsService) {
    let session: any = sessionStorage.getItem('cappn_userkey');
    this.cappn_userkey = JSON.parse(session);
  }

  ngOnInit() {
   

 

   
  }

  obtnenerTicketsPorFecha() {
    this.apiTicket.obtnerTicketsPorSucursal(this.idSucursal).subscribe(resp => {
      this.dataSource =resp.data;
    })
  }

  comprobanteSeleccionado(data: Comprobantes) {
    this.clickedRows = new Set<Comprobantes>([]);
    this.clickedRows.add(data);
    this.detalle.emit(data);
    console.log(data);
  }

  ngAfterViewInit() {
    
    $('select').formSelect();
    this.obtnenerTicketsPorFecha();
  }


  nuevoTicket() {
    this.apiTicket.nuevoTicket({idsucursal: this.idSucursal, idusuario:this.cappn_userkey.id}).subscribe(resp => {
      console.log('respuestanuevo', resp);
      this.detalle.emit(resp.data);
    });
  }
}

export interface Comprobantes {
  codigo: string;
  estado: string;
  fecha: string;
  fechacreacion: string;
  id: number;
  idsucursal: number;
  idusuario: number;
}



