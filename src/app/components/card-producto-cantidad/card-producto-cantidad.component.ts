import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-producto-cantidad',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './card-producto-cantidad.component.html',
  styleUrl: './card-producto-cantidad.component.scss'
})
export class CardProductoCantidadComponent {
  @Input() textoBoton!:string;
  @Input() icono!:string;
  @Input() mostrarBoton!:boolean;
  @Input() mostrarInput!:boolean;
  @Input() producto: any;
  @Output() clickBoton = new EventEmitter<any>();

  seleccionar(data: any) {
    this.clickBoton.emit(data);
  }
}
