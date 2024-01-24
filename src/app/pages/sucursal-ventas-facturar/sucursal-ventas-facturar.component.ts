import { Component, HostListener } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NegocioService } from '../../services/negocio.service';
import { AuthService } from '../../services/auth.service';
import { forkJoin } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';

declare let $: any;

@Component({
  selector: 'app-sucursal-ventas-facturar',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FooterComponent, RouterModule, ReactiveFormsModule, FormsModule, NgxPaginationModule],
  providers: [NegocioService],
  templateUrl: './sucursal-ventas-facturar.component.html',
  styleUrl: './sucursal-ventas-facturar.component.scss'
})
export class SucursalVentasFacturarComponent {
  userData: any;
  cappn_userkey: any;
  idNegocio: any;
  idSucursal: any;
  nombreSucursal: any;
  dataNegocio: any;
  dataTiposFactura: any[] = [];
  dataPeriodosTributarios: any[] = [];
  clientes: any[] = [];
  ofertas: any[] = [];
  filtroCliente: string = '';
  filtroOfertas: string = '';
  mensajeClientes: string = '';
  mensajeOferta: string = '';

  p: number = 1;
  pOferta: number = 1;

  formGroup = new FormGroup({
    id: new FormControl(''),
    giro: new FormControl(''),
    nombre: new FormControl('', Validators.required),
    cliente: new FormControl(''),
    direccion: new FormControl(''),
    municipio: new FormControl(''),
    departamento: new FormControl(''),
    nit: new FormControl(''),
    registro: new FormControl(''),
    telefono: new FormControl(''),
    whatsapp: new FormControl(''),
  });

  formGroupMaestroFactura = new FormGroup({
    id: new FormControl(''),
    idcliente: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
    idtipofactura: new FormControl('', Validators.required),
    codigofactura: new FormControl('', Validators.required),
    idperiodotributario: new FormControl('', Validators.required),
    idusuario: new FormControl('', Validators.required),
    idnegocio: new FormControl('', Validators.required),
  });


  formGroupCuerpoFactura = new FormGroup({
    id: new FormControl(''),
    idfactura: new FormControl('', Validators.required),
    cantidad: new FormControl('', Validators.required),
    idofertasporproducto: new FormControl('', Validators.required),
    preciounitario: new FormControl('', Validators.required),
    nosujestas: new FormControl('', Validators.required),
    exentas: new FormControl('', Validators.required),
  });




  constructor(
    private router: Router,
    private authapi: AuthService,
    private route: ActivatedRoute,
    private negocioService: NegocioService) {
    this.route.paramMap.subscribe(params => {
      this.idNegocio = params.get('idnegocio');
      this.idSucursal = params.get('idsucursal');
      this.nombreSucursal = params.get('sucursal');
      console.log('ID obtenido:', this.idNegocio);
      console.log('ID idSucursal:', this.idSucursal);
      console.log('ID nombreSucursal:', this.nombreSucursal);
      this.formGroupMaestroFactura.get('idnegocio')?.setValue(this.idNegocio);

      // Puedes realizar otras operaciones con el ID aquí, como llamar a servicios, etc.
    });

  }

  ngOnInit() {
    let session: any = sessionStorage.getItem('cappn_userkey');
    this.cappn_userkey = JSON.parse(session);
    this.validarUsuarioNegocio();
    this.obtenerCatalogos();

    // Obtener la fecha actual
    const fechaActual = new Date();

    // Formatear la fecha en formato 'YYYY-MM-DD' para el control de fecha
    const fechaFormateada = this.formatoFecha(fechaActual);

    // Setear la fecha en el control del formulario
    this.formGroupMaestroFactura.get('fecha')?.setValue(fechaFormateada);
  }

  formatoFecha(fecha: Date): string {
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const dia = fecha.getDate().toString().padStart(2, '0');
    const anio = fecha.getFullYear();

    return `${anio}-${mes}-${dia}`;
  }

  obtenerCatalogos() {
    let serviceTF = this.negocioService.obtenerTiposDeFacturas();
    let servicePT = this.negocioService.obtenerPeridosTributarios();

    forkJoin([serviceTF, servicePT]).subscribe(
      ([dataTipoFacturas, dataPeriodos]) => {
        this.dataTiposFactura = dataTipoFacturas.data;
        this.dataPeriodosTributarios = dataPeriodos.data;
        if (dataPeriodos.data.length > 0) {
          // Asigna el valor al control del formulario
          this.formGroupMaestroFactura.get('idperiodotributario')?.setValue(dataPeriodos.data[0].id);
        }

        // Aquí puedes trabajar con los resultados obtenidos
        console.log('Resultado del servicio 1:', dataTipoFacturas);
      },
      error => {
        // Manejar errores si alguno de los observables falla
        console.error('Error:', error);
      }
    );
  }



  obtnerClientes() {
    this.cancelar();
    this.formGroupMaestroFactura.get('idcliente')?.reset();
    this.mensajeClientes = '';
    this.p = 1;
    if (this.filtroCliente != '') {
      this.negocioService.obtenerClientesPorFiltro(this.filtroCliente).subscribe(response => {
        this.clientes = response.data;

        if (response.data.length == 0) {
          this.mensajeClientes = 'No se encontraron clientes con el filtro ' + this.filtroCliente;
          $('#nocliente').alert()
        }


      });
    }
  }


  obtnerOfertas() {
    this.mensajeOferta = '';
    this.pOferta = 1;
    if (this.filtroOfertas != '') {
      let data:any = {
        idnegocio: this.formGroupMaestroFactura.get('idnegocio')?.value,
        filtro: this.filtroOfertas
      }
      this.negocioService.ofertasPorProductosFiltroVenta(data).subscribe(response => {
        this.ofertas = response.data;

        if (response.data.length == 0) {
          this.mensajeOferta = 'No se encontraron ofertas con el filtro ' + this.filtroOfertas;
          $('#mensajeOferta').alert()
        }


      });
    }
  }

  validarUsuarioNegocio() {
    let data: any = { idusuario: this.cappn_userkey.usuario[0].id, idnegocio: this.idNegocio };

    this.formGroupMaestroFactura.get('idusuario')?.setValue(data.idusuario);
    this.authapi.validarUsuarioNegocio(data).subscribe(response => {
      console.log(response);
      this.dataNegocio = response.data;
    });
  }

  /*  @HostListener('document:keydown', ['$event'])
   handleKeyboardEvent(event: KeyboardEvent) {
     // Verifica si la tecla presionada es F2 (código 113)
     if (event.keyCode === 113) {
       this.ejecutarMetodo();
     }
 
     if (event.keyCode === 13 || event.keyCode === 108) {
       this.ejecutarMetodoEnter();
     }
   }
 
  */
  ejecutarMetodo() {
    // Lógica que quieres ejecutar al presionar F2
    alert('F2 presionada. Ejecutando método...');
  }


  ejecutarMetodoEnter() {
    // Lógica que quieres ejecutar al presionar Enter
    console.log('Enter presionada. Ejecutando método...');
  }

  nuevo(data: any) {
    if (data.id == '0') {
      this.clientes.unshift(data);

      this.formGroup.setValue({ ...data, cliente: this.filtroCliente });

    }
    else {
      this.formGroup.setValue({ ...data });
    }



  }

  salvarCambios() {

    if (this.formGroup.value.nombre == '') {
      let cliente: any = this.formGroup.value.cliente;
      this.formGroup.get('nombre')?.setValue(cliente);
    }

    this.negocioService.clientesMtto(this.formGroup.value).subscribe(response => {
      console.log(response);
      this.filtroCliente = this.formGroup.value.cliente ?? '';
      this.obtnerClientes();
      this.cancelar();
    });
  }

  seleccionarCliente(data: any) {
    this.formGroupMaestroFactura.get('idcliente')?.setValue(data.id);
  }

  cancelar() {
    this.formGroup.reset();
    this.removerCero();
  }

  removerCero() {
    // Encontrar el índice del cliente con id igual a "0"
    const indexToRemove = this.clientes.findIndex(cliente => cliente.id === "0");

    // Eliminar el cliente con id igual a "0" del array
    if (indexToRemove !== -1) {
      this.clientes.splice(indexToRemove, 1);
    }
  }

  generarFactura() {
    if (this.formGroupMaestroFactura.valid) {
      this.negocioService.generarFactura(this.formGroupMaestroFactura.value).subscribe(resp => {
        console.log(resp);
        if (resp.state == 'success') {
          this.formGroupMaestroFactura.get('id')?.setValue(resp.data.id);
          this.formGroupCuerpoFactura.get('idfactura')?.setValue(resp.data.id);
        }
      })
    }
    else {
      Swal.fire({
        title: 'Advertencia',
        text: 'Por favor, complete todos los campos del formulario.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }

  }




}
