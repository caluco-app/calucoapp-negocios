import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-producto',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './card-producto.component.html',
  styleUrl: './card-producto.component.scss'
})
export class CardProductoComponent {
  @Input() producto: any;
  @Output() clickConfig = new EventEmitter<any>();

  seleccionarProducto(data: any) {
    this.clickConfig.emit(data);
  }
}
