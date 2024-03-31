import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserInfoService } from '../../services/user-info.service';
import { AuthService } from '../../services/auth.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
declare let $: any;
@Component({
  selector: 'app-negocio',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, CommonModule, FooterComponent, RouterModule],
  templateUrl: './negocio.component.html',
  styleUrl: './negocio.component.scss'
})
export class NegocioComponent {
  userData: any;
  cappn_userkey: any;
  idNegocio: any;
  dataNegocio: any;

  constructor(private userInfo: UserInfoService, private router: Router, private authapi: AuthService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.idNegocio = params.get('id'); // 'id' debe coincidir con el nombre del parámetro en tu ruta
      console.log('ID obtenido:', this.idNegocio);

      // Puedes realizar otras operaciones con el ID aquí, como llamar a servicios, etc.
    });

  }

   ngOnInit() { window.scrollTo(0, 0);
    let session: any = sessionStorage.getItem('cappn_userkey');
    this.cappn_userkey = JSON.parse(session);
    this.validarUsuarioNegocio();
    $(document).ready(function () {
      $('.sidenav').sidenav();
    });
  }


  validarUsuarioNegocio() {
    let data: any = { idusuario: this.cappn_userkey.usuario[0].id, idnegocio: this.idNegocio };
    this.authapi.validarUsuarioNegocio(data).subscribe(response => {
      console.log('dataNegocio', response);
      this.dataNegocio = response.data;
    });
  }
}
