import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioAsociadoComponent } from './inventario-asociado.component';

describe('InventarioAsociadoComponent', () => {
  let component: InventarioAsociadoComponent;
  let fixture: ComponentFixture<InventarioAsociadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarioAsociadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventarioAsociadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
