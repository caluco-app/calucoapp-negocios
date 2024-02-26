import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NegocioService } from '../../services/negocio.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { FilterPipe } from '../../pipes/filter.pipe';
import { ProductoVentaComponent } from '../../components/producto-venta/producto-venta.component';
import { CardsInfoComponent } from '../../components/cards-info/cards-info.component';
import { FormularioProductosComponent } from '../../components/formulario-productos/formulario-productos.component';


declare let $: any;

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    FooterComponent,
    RouterModule,
    ReactiveFormsModule,
    SidebarComponent,
    FormsModule,
    FilterPipe,
    ProductoVentaComponent,
    CardsInfoComponent,
    FormularioProductosComponent
  ],
  providers: [NegocioService, FilterPipe],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss'
})
export class InventarioComponent {
  pantalla: string = 'productos'; // productos-formulario, productos
  filtro: string = '';
  userData: any;
  cappn_userkey: any;
  idNegocio: any;
  dataNegocio: any;
  productos: any[] = [];
  productoSeleccionado: any = null;

  formGroup = new FormGroup({
    id: new FormControl(''),
    codigo: new FormControl(''),
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl(''),
    idnegocio: new FormControl('', Validators.required),
    existencias: new FormControl(''),
    costo: new FormControl(''),
    total: new FormControl(''),
  });

  formGroupStock = new FormGroup({
    id: new FormControl(''),
    idinventario: new FormControl('', Validators.required),
    entrada: new FormControl(''),
    salida: new FormControl(''),
    descripcion: new FormControl('', Validators.required),
    costo: new FormControl('', Validators.required),
    total: new FormControl(''),
    nombre: new FormControl(''),
  });

  constructor(private router: Router, private authapi: AuthService, private route: ActivatedRoute, private negocioService: NegocioService) {


  }

  ngOnInit() {
    let session: any = sessionStorage.getItem('cappn_userkey');
    this.cappn_userkey = JSON.parse(session);
    this.idNegocio = this.cappn_userkey.idnegocio;
    this.productosPorNegocios();


  }

  abrirModalFormulario() {
    this.formGroup.get('idnegocio')?.setValue(this.idNegocio);
    $('#predetalleInventario').modal('close');
    $('#modalFormInventario').modal('open');
  }
  cerrarModalFormulario() {
    this.formGroup.setValue({ id: '', codigo: "", nombre: "", "descripcion": "", "idnegocio": "", existencias: '', costo: '', total: '' });
    $('#predetalleInventario').modal('close');
    $('#modalFormInventario').modal('close');
  }

  abrirModalPredetalle(data: any) {
    this.formGroup.setValue(data);
    $('#predetalleInventario').modal('open');
  }

  abrirModalFormularioStock(data: any) {
    this.formGroupStock.get('idinventario')?.setValue(data.id);
    this.formGroupStock.get('nombre')?.setValue(data.nombre);
    $('#modalFormStock').modal('show');
  }

  cerrarModalFormularioStock() {
    this.formGroupStock.setValue({ id: '', idinventario: "", entrada: "", salida: "", descripcion: "", costo: '', total: '', nombre: '' });
    $('#modalFormStock').modal('hide');
  }

  salvarCambios() {
    this.formGroup.get('idnegocio')?.setValue(this.idNegocio);
    if (this.formGroup.valid) {
      this.negocioService.inventarioMttoNegocio(this.formGroup.value).subscribe(response => {
        console.log(response);
        this.productosPorNegocios();
        this.cerrarModalFormulario();
      });
    }
  }

  salvarCambiosStock() {
    console.log(this.formGroupStock.value)
    if (this.formGroupStock.valid) {
      this.negocioService.stocksMttoNegocio(this.formGroupStock.value).subscribe(response => {
        console.log(response);
        this.productosPorNegocios();
        this.cerrarModalFormularioStock();
      });
    }
  }


  validarUsuarioNegocio() {
    let data: any = { idusuario: this.cappn_userkey.usuario[0].id, idnegocio: this.idNegocio };
    this.authapi.validarUsuarioNegocio(data).subscribe(response => {
      console.log(response);
      this.dataNegocio = response.data;
      this.productosPorNegocios();
    });
  }

  productosPorNegocios() {
    this.negocioService.inventarioPorNegocio(this.idNegocio).subscribe(response => {
      console.log(response);
      this.productos = response.data;
      $(document).ready(function () {
        $('.tabs').tabs();
        $('.modal').modal();
      });
    });


  }

  enviarDataAFormulario(data: any) {
    this.cerrarModalFormulario();
    this.formGroup.setValue(data);
    this.abrirModalFormulario();
  }

  stringToNumber(d: any): number {
    return parseInt(d);
  }

  sumar() {
    return this.productos.reduce((acumulador, producto) => acumulador + parseFloat(producto.total), 0);
  }

  nuevoProducto(evt: any) {

    console.log(evt);
    if (evt) {
      this.productoSeleccionado = evt;
    }
    this.pantalla = 'productos-formulario';
  }

  cancelarProducto(evt: any) {
    console.log(evt);
    this.productoSeleccionado = null;
    this.pantalla = 'productos';
  }

  

}
