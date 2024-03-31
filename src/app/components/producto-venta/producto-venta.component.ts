import { Component, EventEmitter, Output } from '@angular/core';
import { FilterPipe } from '../../pipes/filter.pipe';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardsInfoComponent } from '../cards-info/cards-info.component';
import { CardProductoComponent } from '../card-producto/card-producto.component';
import { NegocioService } from '../../services/negocio.service';
declare let $: any;

@Component({
  selector: 'app-producto-venta',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FilterPipe,
    CardsInfoComponent,
    CardProductoComponent
  ],
  templateUrl: './producto-venta.component.html',
  styleUrl: './producto-venta.component.scss'
})
export class ProductoVentaComponent {

  @Output() clickNuevo = new EventEmitter<any>();

  filtro: string = '';
  cappn_userkey: any;

  productos: any[] = [];

  formGroup = new FormGroup({
    id: new FormControl(''),
    codigo: new FormControl(''),
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl(''),
    idnegocio: new FormControl('', Validators.required),

  });
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
    });
  }



  nuevoProducto() {
    console.log('nuevo');
    this.clickNuevo.emit(null);
  }

  clickConfigProducto(data: any) {
    this.clickNuevo.emit(data);
  }










}
