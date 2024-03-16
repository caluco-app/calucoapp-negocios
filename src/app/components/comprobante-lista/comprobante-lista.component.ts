import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiSucursalService } from '../../services/api-sucursal.service';
import { AuthService } from '../../services/auth.service';
import { NegocioService } from '../../services/negocio.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comprobante-lista',
  standalone: true,
  imports: [CommonModule],
  providers: [NegocioService, ApiSucursalService],
  templateUrl: './comprobante-lista.component.html',
  styleUrl: './comprobante-lista.component.scss'
})
export class ComprobanteListaComponent {

  @Input() idSucursal: any;
  @Input() idSubOpcion: any;
  @Output() clickItem = new EventEmitter<any>();
  listaDeComprobantes: any[] = [];

  constructor(private router: Router, private apisucursal: ApiSucursalService, private authapi: AuthService, private route: ActivatedRoute, private negocioService: NegocioService) {
    
  }
  




  ngOnChanges() {
    this.obtenerComprobantesPorSucursal();
  }

  seleccionarItem(data: any) {
    this.clickItem.emit(data);
  }

  

  obtenerComprobantesPorSucursal() {
    this.apisucursal.obtnerComprobantesPorSucursal(this.idSubOpcion,this.idSucursal).subscribe(resp => {
      this.listaDeComprobantes = resp.data;
    });
  }

}
