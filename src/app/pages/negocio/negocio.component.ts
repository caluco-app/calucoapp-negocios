import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { UserInfoService } from '../../services/user-info.service';

@Component({
  selector: 'app-negocio',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FooterComponent, RouterModule],
  templateUrl: './negocio.component.html',
  styleUrl: './negocio.component.scss'
})
export class NegocioComponent {
  userData: any;
  cappn_userkey: any;

  constructor(private userInfo: UserInfoService, private router: Router) { }

  ngOnInit() {

    let session: any = sessionStorage.getItem('cappn_userkey');
    this.cappn_userkey = JSON.parse(session);

  }
}
