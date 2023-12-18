import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  cappn_userkey: any;

  ngOnInit() {
    let session: any = sessionStorage.getItem('cappn_userkey');
    this.cappn_userkey = JSON.parse(session);
  }
}
