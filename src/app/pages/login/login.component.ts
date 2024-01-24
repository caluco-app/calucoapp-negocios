import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserInfoService } from '../../services/user-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm = new FormGroup({
    usuario: new FormControl(''),
    contrasenia: new FormControl(''),
  });

  constructor(private apiAuth: AuthService, private userInfo: UserInfoService, private router: Router) { }

  ngOnInit() {

  }



  login() {
    this.apiAuth.login(this.loginForm.value).subscribe(
      (response) => {
        // Manejar la respuesta exitosa aquí
        console.log('Response:', response);
        if (response.state === 'success') {
          // Acceso permitido, puedes realizar acciones adicionales
          Swal.fire({
            title: '¡Acceso permitido!',
            text: 'Bienvenido al sistema',
            icon: 'success',
            timer: 1000, // Tiempo en milisegundos (en este caso, 3000 ms = 3 segundos)
            timerProgressBar: true,
            willClose: () => {
              // Este código se ejecutará cuando se cierre la alerta automáticamente
              sessionStorage.setItem('cappn_userkey', JSON.stringify(response.data));
              this.router.navigate(['/negocios']);
            }
          });

        } else {
          // El servidor devolvió un estado 'fail', manejar según sea necesario
          Swal.fire('Error', response.message, 'error');
        }
      },
      (error) => {
        // Manejar errores de la solicitud aquí
        console.error('Error de la solicitud:', error);
        Swal.fire('Error', 'Hubo un problema en la solicitud', 'error');
      }
    );
  }


}
