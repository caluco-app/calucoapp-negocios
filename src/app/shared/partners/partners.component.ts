import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { FilterPipe } from '../../pipes/filter.pipe';
import { ListaClientesComponent } from '../../components/lista-clientes/lista-clientes.component';
import { FormularioClientesComponent } from '../../components/formulario-clientes/formulario-clientes.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NegocioService } from '../../services/negocio.service';
import { UserInfoService } from '../../services/user-info.service';
import { AuthService } from '../../services/auth.service';

declare let $: any;

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [NavbarComponent,
    CommonModule, FooterComponent,
    RouterModule, ReactiveFormsModule,
    FormsModule, SidebarComponent,
    FilterPipe, ListaClientesComponent, FormularioClientesComponent],
  providers: [NegocioService],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss'
})
export class PartnersComponent {
  @Input() idNegocio: any;
  @Output() registroSeleccionado = new EventEmitter<any>();


  filtro: string = '';
  userData: any;
  cappn_userkey: any;
  dataNegocio: any;
  clientes: any[] = [];
  search: any = '';
  pantalla: string = 'lista'; //formulario
  formulario: any = null;

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

  constructor(private userInfo: UserInfoService, private router: Router, private authapi: AuthService, private route: ActivatedRoute, private negocioService: NegocioService) {


  }

  ngOnInit() {
    let session: any = sessionStorage.getItem('cappn_userkey');
    this.cappn_userkey = JSON.parse(session);
    this.validarUsuarioNegocio();
  }

  clickEnNuevo(evt: any) {
    console.log(evt);
    this.formulario = evt;
    this.pantalla = 'formulario';
  }

  clickCancelar(evt: any) {
    if (evt) {
      this.search = evt;
    }
    else {
      this.search = '';
    }
    this.pantalla = 'lista';
  }

  clicSeleccionar(evt: any) {
    this.search = evt;
    this.formulario = evt;
    this.pantalla = 'formulario';
  }

  clickSeleccionRegistro(evt: any) {
   
    this.search = evt.nombre;
    this.formulario = evt;
    console.log('llega', evt)
    this.registroSeleccionado.emit(evt);
  }

  validarUsuarioNegocio() {
    let data: any = { idusuario: this.cappn_userkey.usuario[0].id, idnegocio: this.idNegocio };
    this.authapi.validarUsuarioNegocio(data).subscribe(response => {
      console.log(response);
      this.dataNegocio = response.data;
      this.obtenerClientes();
    });
  }


  salvarCambios() {

    if (this.formGroup.value.nombre == '') {
      let cliente: any = this.formGroup.value.cliente;
      this.formGroup.get('nombre')?.setValue(cliente);
    }

    this.negocioService.clientesMtto(this.formGroup.value).subscribe(response => {
      console.log(response);
      this.obtenerClientes();
      this.cancelar();
    });
  }

  obtenerClientes() {
    this.negocioService.obtenerClientes().subscribe(response => {
      console.log(response);
      this.clientes = response.data;

      $(document).ready(function () {
        $('.tabs').tabs();
        $('.modal').modal();
      });
    });
  }

 

  nuevo(data: any) {
    if (data.id == '0') {
      this.clientes.unshift(data);
    }

    this.formGroup.setValue(data);
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
}
