import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NegocioService } from '../../services/negocio.service';

@Component({
  selector: 'app-formulario-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [NegocioService],
  templateUrl: './formulario-clientes.component.html',
  styleUrl: './formulario-clientes.component.scss'
})
export class FormularioClientesComponent {

  @Input() formulario!: any;

  @Output() clickCancelar = new EventEmitter<any>();
  @Output() clickSalvoCambios = new EventEmitter<any>();

  formGroup = new FormGroup({
    id: new FormControl(''),
    idnegocio: new FormControl('', Validators.required),
    giro: new FormControl(''),
    nombre: new FormControl('', Validators.required),
    cliente: new FormControl(''),
    direccion: new FormControl(''),
    municipio: new FormControl(''),
    departamento: new FormControl(''),
    documento: new FormControl(''),
    registro: new FormControl(''),
    telefono: new FormControl(''),
    whatsapp: new FormControl(''),
  });

  cappn_userkey: any;

  constructor(private negocioService: NegocioService) {

  }


   ngOnInit() { window.scrollTo(0, 0);
    let session: any = sessionStorage.getItem('cappn_userkey');
    this.cappn_userkey = JSON.parse(session);
    this.formGroup.get('idnegocio')?.setValue(this.cappn_userkey.idnegocio);

    if(this.formulario){
      this.formGroup.setValue(this.formulario);
    }
  }


  salvarCambios() {

    if (this.formGroup.value.nombre == '') {
      let cliente: any = this.formGroup.value.cliente;
      this.formGroup.get('nombre')?.setValue(cliente);
      this.formGroup.get('idnegocio')?.setValue(this.cappn_userkey.idnegocio);
    }

    this.negocioService.sociosPorNegocioMtto(this.formGroup.value).subscribe(response => {
      console.log(response);
      if (response.state == "success") {
        this.clickSalvoCambios.emit(this.formGroup.value.nombre);
      }

    });
  }

  cancelar() {
    this.clickCancelar.emit(null);
  }

}
