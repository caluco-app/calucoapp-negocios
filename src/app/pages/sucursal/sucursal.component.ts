import { AfterViewInit, Component, OnInit } from '@angular/core';
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
export class SucursalComponent implements OnInit, AfterViewInit {
  userData: any;
  cappn_userkey: any;
  idNegocio: any;
  idSucursal: any = '';
  nombreSucursal: any;
  dataNegocio: any;
  permisosPorSucursal: any[] = [];
  opcionesPorPermiso: any[] = [];

  idOpcionSeleccionada: any = '';
  idSubOpcionSeleccionada: any = '';
  idComprobante: any = '';
  pantalla: any = '';

  constructor(private router: Router, private apisucursal: ApiSucursalService, private authapi: AuthService, private route: ActivatedRoute, private negocioService: NegocioService) {
    let session: any = sessionStorage.getItem('cappn_userkey');
    this.cappn_userkey = JSON.parse(session);
    this.idSubOpcionSeleccionada = '';

  }

   ngOnInit() { window.scrollTo(0, 0);

  }

  ngAfterViewInit(): void {
    $('.collapsible').collapsible();
    $('.collapsible').collapsible("open", 0);
  }

  obtenerPermisosPorSucursal(data: any) {
    this.idSucursal = data.id;
    this.nombreSucursal = data.nombre;
    this.apisucursal.permisoPorSucursal(this.idSucursal).subscribe(resp => {
      this.permisosPorSucursal = resp.data;

      $(document).ready(function () {
        $('.collapsible').collapsible();
        $('.collapsible').collapsible("open", 1);
      });

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


  seleccionarSubOpcion(data: any) {
    this.idSubOpcionSeleccionada = data.idsubopcion;

    $(document).ready(function () {
      $('.collapsible').collapsible();
      $('.collapsible').collapsible("open", 2);
    });
  }


}
