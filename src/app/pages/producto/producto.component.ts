import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NegocioService } from '../../services/negocio.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FooterComponent, RouterModule],
  providers:[NegocioService],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent {
  userData: any;
  cappn_userkey: any;
  idNegocio: any;
  dataNegocio: any;
  productos:any[]=[];

  constructor( private router: Router, private authapi: AuthService, private route: ActivatedRoute, private negocioService:NegocioService) {
    this.route.paramMap.subscribe(params => {
      this.idNegocio = params.get('idnegocio'); // 'id' debe coincidir con el nombre del parámetro en tu ruta
      console.log('ID obtenido:', this.idNegocio);
    });

  }

   ngOnInit() { window.scrollTo(0, 0);
    let session: any = sessionStorage.getItem('cappn_userkey');
    this.cappn_userkey = JSON.parse(session);
    this.validarUsuarioNegocio();
  }


  validarUsuarioNegocio() {
    let data: any = { idusuario: this.cappn_userkey.usuario[0].id, idnegocio: this.idNegocio };
    this.authapi.validarUsuarioNegocio(data).subscribe(response => {
      console.log(response);
      this.dataNegocio = response.data;
      this.productosPorNegocios();
    });
  }

  productosPorNegocios(){
    this.negocioService.inventarioPorNegocio(this.idNegocio).subscribe(response => {
      console.log(response);
      this.productos = response.data;
    });
  }

}
