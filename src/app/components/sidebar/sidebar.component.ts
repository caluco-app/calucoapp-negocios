import { Component } from '@angular/core';
import { UserInfoService } from '../../services/user-info.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
declare let $: any;
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FooterComponent, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  userData: any;
  cappn_userkey: any;
  idNegocio: any;
  dataNegocio: any;

  constructor(private userInfo: UserInfoService, private router: Router, private authapi: AuthService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.idNegocio = params.get('idnegocio'); // 'id' debe coincidir con el nombre del parámetro en tu ruta
      console.log('ID obtenido:', this.idNegocio);

      // Puedes realizar otras operaciones con el ID aquí, como llamar a servicios, etc.
    });

  }

  ngOnInit() {
    let session: any = sessionStorage.getItem('cappn_userkey');
    this.cappn_userkey = JSON.parse(session);
   
    
  }


  validarUsuarioNegocio() {
    let data: any = { idusuario: this.cappn_userkey.usuario[0].id, idnegocio: this.idNegocio };
    this.authapi.validarUsuarioNegocio(data).subscribe(response => {
      console.log('dataNegocio', response);
      this.dataNegocio = response.data;
    });
  }
}
