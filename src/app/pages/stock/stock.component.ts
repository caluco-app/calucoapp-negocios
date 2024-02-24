import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NegocioService } from '../../services/negocio.service';
import { AuthService } from '../../services/auth.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
declare let $: any;

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FooterComponent, RouterModule, ReactiveFormsModule, SidebarComponent],
  providers: [NegocioService],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss'
})
export class StockComponent {
  userData: any;
  cappn_userkey: any;
  idNegocio: any;
  idInventario: any;
  dataNegocio: any;
  productos: any[] = [];
  stocks: any[] = [];

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
    this.route.paramMap.subscribe(params => {
      this.idNegocio = params.get('idnegocio');
      this.idInventario = params.get('idinventario');
      console.log('ID obtenido:', this.idNegocio);
      console.log('ID idInventario:', this.idInventario);

      // Puedes realizar otras operaciones con el ID aquí, como llamar a servicios, etc.
    });

  }

  ngOnInit() {
    let session: any = sessionStorage.getItem('cappn_userkey');
    this.cappn_userkey = JSON.parse(session);
    this.productosPorNegocios();

    $(document).ready(function () {
      $('.fixed-action-btn').floatingActionButton();
      $('.modal').modal();
      $('select').formSelect();
      $('.tooltipped').tooltip();
    });
  }

  abrirModalFormulario() {
    $('#modalFormInventario').modal('show');
  }
  cerrarModalFormulario() {
    this.formGroup.setValue({ id: '', codigo: "", nombre: "", "descripcion": "", "idnegocio": "", existencias: '', costo: '', total: '' });
    $('#modalFormInventario').modal('hide');
  }

  abrirModalFormularioStock(data: any, ajuste:string) {

    this.formGroupStock.get('descripcion')?.setValue('Entrada');
    if(ajuste=='S'){
      this.formGroupStock.get('descripcion')?.setValue('Salida');
    }
    
    
    this.formGroupStock.get('idinventario')?.setValue(data.id);
    this.formGroupStock.get('nombre')?.setValue(data.nombre);
    this.formGroupStock.get('costo')?.setValue(data.costo);
    $('#modalFormStock').modal('open');
  }

  cerrarModalFormularioStock() {
    this.formGroup.reset();
    this.formGroupStock.setValue({ id: '', idinventario: "", entrada: "", salida: "", descripcion: "", costo: '', total: '', nombre: '' });
    $('#modalFormStock').modal('close');
    $('select').formSelect();
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




  productosPorNegocios() {
    this.negocioService.stockPorInventario(this.idNegocio, this.idInventario).subscribe(response => {
      console.log(response);
      this.productos = response.data;
    });
    this.negocioService.stockPorIdInventario(this.idInventario).subscribe(response => {
      console.log(response);
      this.stocks = response.data;
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
}
