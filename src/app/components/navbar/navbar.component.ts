import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
declare let $: any;
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  cappn_userkey: any;

  @Input() nombreNegocio!:string;

   ngOnInit() { window.scrollTo(0, 0);
    let session: any = sessionStorage.getItem('cappn_userkey');
    this.cappn_userkey = JSON.parse(session);
    $(document).ready(function () {
      $('.sidenav').sidenav();
      $('select').formSelect();
    });
  }
}
