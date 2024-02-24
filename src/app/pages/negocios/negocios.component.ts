import { Component } from '@angular/core';
import { UserInfoService } from '../../services/user-info.service';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
declare let $: any;
@Component({
  selector: 'app-negocios',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FooterComponent, RouterModule, SidebarComponent],
  templateUrl: './negocios.component.html',
  styleUrl: './negocios.component.scss'
})
export class NegociosComponent {
  userData: any;
  cappn_userkey: any;

  constructor(private userInfo: UserInfoService, private router: Router) { }

  ngOnInit() {

    let session: any = sessionStorage.getItem('cappn_userkey');
    this.cappn_userkey = JSON.parse(session);

    $(document).ready(function () {
      $('.sidenav').sidenav();
      $('select').formSelect();
    });

  }
}
