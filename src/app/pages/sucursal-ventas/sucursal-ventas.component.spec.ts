import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalVentasComponent } from './sucursal-ventas.component';

describe('SucursalVentasComponent', () => {
  let component: SucursalVentasComponent;
  let fixture: ComponentFixture<SucursalVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SucursalVentasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SucursalVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
