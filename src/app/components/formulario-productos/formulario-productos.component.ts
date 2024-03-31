import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NegocioService } from '../../services/negocio.service';
import { InventarioAsociadoComponent } from '../inventario-asociado/inventario-asociado.component';
import { InventarioAsociarComponent } from '../inventario-asociar/inventario-asociar.component';

@Component({
  selector: 'app-formulario-productos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InventarioAsociadoComponent,
    InventarioAsociarComponent
  ],
  templateUrl: './formulario-productos.component.html',
  styleUrl: './formulario-productos.component.scss'
})
export class FormularioProductosComponent {

  pantalla: string = 'asociar'; //asocio

  @Input() formulario!: any;

  @Output() clickCancelar = new EventEmitter<any>();
  @Output() clickSalvoCambios = new EventEmitter<any>();
  cappn_userkey: any;

  formGroup = new FormGroup({
    id: new FormControl(''),
    codigo: new FormControl(''),
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl(''),
    idnegocio: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),

  });

  constructor(private negocioService: NegocioService) {

  }

   ngOnInit() { window.scrollTo(0, 0);
    let session: any = sessionStorage.getItem('cappn_userkey');
    this.cappn_userkey = JSON.parse(session);
    this.formGroup.get('idnegocio')?.setValue(this.cappn_userkey.idnegocio);

    if (this.formulario) {
      this.formGroup.setValue(this.formulario);
    }
  }

  salvarCambios() {
    this.formGroup.get('idnegocio')?.setValue(this.cappn_userkey.idnegocio);
    this.negocioService.productoMttoNegocio(this.formGroup.value).subscribe(response => {
      console.log(response);
      if (response.state == "success") {
        if (!this.formGroup.get('id')?.value) {
          this.formGroup.get('id')?.setValue(response.data.id);
        }
        else {
          this.cancelar();
        }
        // this.clickSalvoCambios.emit(null);
      }
    });
  }

  cancelar() {
    this.formGroup.reset();
    this.clickCancelar.emit(null);
  }

  mostarAsociarInventario(evt: any) {
    this.pantalla = 'asocio';
  }

  salirAsociar(evt: any) {
    console.log(evt);
    this.pantalla = 'asociar';
  }



}
