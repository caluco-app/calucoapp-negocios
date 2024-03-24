import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-partnert-seleccionado',
  standalone: true,
  imports: [],
  templateUrl: './partnert-seleccionado.component.html',
  styleUrl: './partnert-seleccionado.component.scss'
})
export class PartnertSeleccionadoComponent {
  @Input() partnerSeleccionado: any;
}
