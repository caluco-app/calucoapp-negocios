import { Component } from '@angular/core';
import { FilterPipe } from '../../pipes/filter.pipe';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
declare let $: any;

@Component({
  selector: 'app-producto-venta',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FilterPipe
  ],
  templateUrl: './producto-venta.component.html',
  styleUrl: './producto-venta.component.scss'
})
export class ProductoVentaComponent {
  filtro: string = '';
  formGroup = new FormGroup({
    id: new FormControl(''),
    codigo: new FormControl(''),
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl(''),
    idnegocio: new FormControl('', Validators.required),
  
  });

  ngOnInit() {
    $(document).ready(function () {
      $('.modal').modal();
      $('.tabs').tabs();
    });
  }

  nuevoProducto() {
    this.abrirModalNuevoProductoVenta();
  }


  limpiarFormProductoVenta() {

  }

  abrirModalNuevoProductoVenta() {
    $('#producto_form_modal').modal('open');
  }

  cerrarModalFormulario() {
    $('#producto_form_modal').modal('close');
  }
}
