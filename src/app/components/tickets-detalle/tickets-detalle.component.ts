import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { ApiTicketsService } from '../../services/api-tickets.service';

declare let $: any;

@Component({
  selector: 'app-tickets-detalle',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatButtonModule, MatStepperModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  providers: [ApiTicketsService],
  templateUrl: './tickets-detalle.component.html',
  styleUrl: './tickets-detalle.component.scss'
})
export class TicketsDetalleComponent implements AfterViewInit, OnInit {

  @ViewChild('inputField') inputField!: ElementRef;
  @ViewChild('searchProduct') searchProduct!: ElementRef;

  @Input() detalle: any;
  @Output() clickBoton = new EventEmitter<any>();
  @Output() accion = new EventEmitter<any>();

  productosEncontrados: any[] = [];
  detalleProductos: any[] = [];

  cantidadConsultaItems: number = 0;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;



  constructor(private _formBuilder: FormBuilder, private apiTicket: ApiTicketsService) { }

  ngOnInit() { window.scrollTo(0, 0); }

  ngAfterViewInit(): void {
    this.verDetalle();

    $('.collapsible').collapsible();
      $('.collapsible').collapsible("open", 0);

  }

  searchProducts() {
    if (this.firstFormGroup.valid) {
      this.productosEncontrados = [];
      this.apiTicket.obtnerProductosPorNegocio(this.detalle.idsucursal, this.firstFormGroup.value.firstCtrl).subscribe(
        resp => {
          this.productosEncontrados = resp.data;


          this.productosEncontrados.forEach(producto => {
            producto.cantidad = 1;
          });

          if (this.productosEncontrados.length > 0) {
            $('#id0').select();
            $('#id0').focus();

            setTimeout(() => {
              this.inputField.nativeElement.select();
              this.inputField.nativeElement.focus();
            }, 0);
          }

        }
      )
    }
  }

  salvarItem(data: any) {
    let dataEnviar: any = {
      idticket: this.detalle.id,
      idproducto: data.id,
      cantidad: data.cantidad,
      preciounitario: data.precio,
      preciounitarioorg: data.precio,
    };
    this.apiTicket.insertarTicketItem(dataEnviar).subscribe(resp => {
      $('#searchProduct').select();
      $('#searchProduct').focus();

      this.productosEncontrados = [];

      this.verDetalle()


    });
  }

  focusol(){
   setTimeout(() => {
    
    $('#searchProduct').select(); 
    $('#searchProduct').focus();
   }, 300);
  }

  verDetalle() {
    this.apiTicket.obtnerTicketsPorID(this.detalle.id).subscribe(respTick => {
      this.detalle = respTick.data;

      

      this.apiTicket.obtnerDetalleTickets({ id: this.detalle.id }).subscribe(resp => {
        this.detalleProductos = resp.data;



        if (this.detalleProductos.length == 0 && this.cantidadConsultaItems == 0){
         
          this.cantidadConsultaItems++;
          $('.collapsible').collapsible();
          $('.collapsible').collapsible("open", 0);
          
        }
        else{
          $('.collapsible').collapsible("open", 1);
        }
         

      });

    });

  }

  regresar(){
    this.accion.emit(null);
  }

}
