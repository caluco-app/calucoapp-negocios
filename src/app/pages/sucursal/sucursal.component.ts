import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NegocioService } from '../../services/negocio.service';
import { AuthService } from '../../services/auth.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { ApiSucursalService } from '../../services/api-sucursal.service';
import { FormsModule } from '@angular/forms';
import { TicketsComponent } from '../../components/tickets/tickets.component';
import { ComprobanteListaComponent } from '../../components/comprobante-lista/comprobante-lista.component';
import { ComprobanteFormComponent } from '../../components/comprobante-form/comprobante-form.component';

declare let $: any;

@Component({
  selector: 'app-sucursal',
  standalone: true,
  imports: [NavbarComponent,
    CommonModule, FooterComponent,
    RouterModule, SidebarComponent,
    TruncatePipe, FormsModule,
    TicketsComponent, ComprobanteListaComponent, ComprobanteFormComponent
  ],
  providers: [NegocioService, ApiSucursalService],
  templateUrl: './sucursal.component.html',
  styleUrl: './sucursal.component.scss'
})
export class SucursalComponent implements OnInit {
  userData: any;
  cappn_userkey: any;
  idNegocio: any;
  idSucursal: any;
  nombreSucursal: any;
  dataNegocio: any;
  permisosPorSucursal: any[] = [];
  opcionesPorPermiso: any[] = [];

  idOpcionSeleccionada: any = '';
  idSubOpcionSeleccionada: any = '';
  idComprobante: any = '';
  pantalla: any = '';

  constructor(private router: Router, private apisucursal: ApiSucursalService, private authapi: AuthService, private route: ActivatedRoute, private negocioService: NegocioService) {
    this.route.paramMap.subscribe(params => {
      this.idOpcionSeleccionada = '';
      this.idSubOpcionSeleccionada = '';

      this.nombreSucursal = params.get('nombreSucursal');
      this.idSucursal = params.get('idSucursal');

      console.log('ID nombreSucursal:', this.nombreSucursal);

      let session: any = sessionStorage.getItem('cappn_userkey');
      this.cappn_userkey = JSON.parse(session);
      this.obtenerPermisosPorSucursal();

      // Puedes realizar otras operaciones con el ID aquí, como llamar a servicios, etc.
    });

  }

  ngOnInit() {

  }

  obtenerPermisosPorSucursal() {
    this.apisucursal.permisoPorSucursal(this.idSucursal).subscribe(resp => {
      this.permisosPorSucursal = resp.data;
    });
  }

  changeSelectOpcion() {
    this.pantalla = '';
    this.idSubOpcionSeleccionada = '';
    let elemento = this.permisosPorSucursal.find(item => item.idopcion == this.idOpcionSeleccionada);
    this.opcionesPorPermiso = elemento ? elemento.subopciones : [];
  }

  refrescarLista() {
    this.pantalla = '';
    this.pantalla = 'lista';
  }

  clickItem(evt: any) {
    this.idComprobante = evt;
    this.pantalla = 'form';
  }



}
