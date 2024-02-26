import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cards-info',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './cards-info.component.html',
  styleUrl: './cards-info.component.scss'
})
export class CardsInfoComponent {
  @Input() icono!: string;
  @Input() titulo!: string;
  @Input() esDinero: boolean=false;
  @Input() valor!: number;
  @Input() color!: string;
}
