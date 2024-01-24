import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalVentasFacturarComponent } from './sucursal-ventas-facturar.component';

describe('SucursalVentasFacturarComponent', () => {
  let component: SucursalVentasFacturarComponent;
  let fixture: ComponentFixture<SucursalVentasFacturarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SucursalVentasFacturarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SucursalVentasFacturarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
