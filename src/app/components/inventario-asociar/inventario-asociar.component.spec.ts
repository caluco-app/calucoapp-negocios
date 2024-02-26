import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioAsociarComponent } from './inventario-asociar.component';

describe('InventarioAsociarComponent', () => {
  let component: InventarioAsociarComponent;
  let fixture: ComponentFixture<InventarioAsociarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarioAsociarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventarioAsociarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
