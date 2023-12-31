import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NegocioService } from '../../services/negocio.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
declare let $: any;
@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FooterComponent, RouterModule, ReactiveFormsModule, FormsModule],
  providers: [NegocioService],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent {
  userData: any;
  cappn_userkey: any;
  idNegocio: any;
  dataNegocio: any;
  productos: any[] = [];
  ofertas: any[] = [];
  oferta: any = { id: '', cantidad: '', precio: '', descripcion: '' };

  formGroup = new FormGroup({
    id: new FormControl(''),
    codigo: new FormControl(''),
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl(''),
    idnegocio: new FormControl('', Validators.required)
  });

  formGroupOfertas = new FormGroup({
    id: new FormControl(''),
    cantidad: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    idproducto: new FormControl('', Validators.required)
  });

  constructor(private router: Router, private authapi: AuthService, private route: ActivatedRoute, private negocioService: NegocioService) {
    this.route.paramMap.subscribe(params => {
      this.idNegocio = params.get('idnegocio'); // 'id' debe coincidir con el nombre del parámetro en tu ruta
      console.log('ID obtenido:', this.idNegocio);

      // Puedes realizar otras operaciones con el ID aquí, como llamar a servicios, etc.
    });

  }

  ngOnInit() {
    let session: any = sessionStorage.getItem('cappn_userkey');
    this.cappn_userkey = JSON.parse(session);
    this.validarUsuarioNegocio();
  }

  nuevaOferta(data: any) {
    this.oferta = {...data};
  }

  cancelaroferta() {
    this.oferta = { id: '', cantidad: '', precio: '', descripcion: '', idproducto: '' };
  }


  tieneOfertaConIdCero() {
    return this.oferta.id > '-1';
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
    this.negocioService.productoPorNegocio(this.idNegocio).subscribe(response => {
      console.log(response);
      this.productos = response.data;
    });
  }

  ofertasPorProductos() {
    this.negocioService.ofertasPorProductos(this.formGroup.value.id).subscribe(response => {
      console.log(response);
      this.ofertas = response.data;
    });
  }

  abrirModalFormulario() {
    $('#modalFormProducto').modal('show');
  }
  cerrarModalFormulario() {
    this.formGroup.setValue({ id: '', codigo: "", nombre: "", "descripcion": "", "idnegocio": "" });
    $('#modalFormProducto').modal('hide');
  }

  salvarCambios() {
    this.formGroup.get('idnegocio')?.setValue(this.idNegocio);
    if (this.formGroup.valid) {
      this.negocioService.productoMttoNegocio(this.formGroup.value).subscribe(response => {
        console.log(response);
        this.productosPorNegocios();
        this.cerrarModalFormulario();
      });
    }
  }

  salvarOferta() {

    this.oferta = { ...this.oferta, idproducto: this.formGroup.value.id };

    this.negocioService.ofertasPorProductosMtto(this.oferta).subscribe(response => {
      console.log(response);
      this.ofertasPorProductos();

      this.cancelaroferta();
    });

  }


  enviarDataAFormulario(data: any) {
    this.cerrarModalFormulario();
    this.formGroup.setValue(data);
    this.abrirModalFormulario();
  }


  enviarDataAFormularioOfertas(data: any) {
    this.cerrarModalFormularioOfertas();
    this.formGroup.setValue(data);
    this.ofertasPorProductos();
    this.abrirModalFormularioOfertas();
  }

  cerrarModalFormularioOfertas() {
    this.formGroupOfertas.setValue({ id: '', precio: '', cantidad: '', descripcion: "", idproducto: "" });
    $('#modalFormOfertas').modal('hide');
  }


  abrirModalFormularioOfertas() {
    $('#modalFormOfertas').modal('show');
  }



}
