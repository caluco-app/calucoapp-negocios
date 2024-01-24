import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NegocioService } from '../../services/negocio.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sucursal',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FooterComponent, RouterModule],
  providers:[NegocioService],
  templateUrl: './sucursal.component.html',
  styleUrl: './sucursal.component.scss'
})
export class SucursalComponent {
  userData: any;
  cappn_userkey: any;
  idNegocio: any;
  idSucursal: any;
  nombreSucursal: any;
  dataNegocio: any;

  constructor(private router: Router, private authapi: AuthService, private route: ActivatedRoute, private negocioService: NegocioService) {
    this.route.paramMap.subscribe(params => {
      this.idNegocio = params.get('idnegocio'); 
      this.idSucursal = params.get('idsucursal'); 
      this.nombreSucursal = params.get('sucursal'); 
      console.log('ID obtenido:', this.idNegocio);
      console.log('ID idSucursal:', this.idSucursal);
      console.log('ID nombreSucursal:', this.nombreSucursal);

      // Puedes realizar otras operaciones con el ID aquí, como llamar a servicios, etc.
    });

  }

  ngOnInit() {
    let session: any = sessionStorage.getItem('cappn_userkey');
    this.cappn_userkey = JSON.parse(session);
    this.validarUsuarioNegocio();
  }

  validarUsuarioNegocio() {
    let data: any = { idusuario: this.cappn_userkey.usuario[0].id, idnegocio: this.idNegocio };
    this.authapi.validarUsuarioNegocio(data).subscribe(response => {
      console.log(response);
      this.dataNegocio = response.data;
    });
  }

}
