import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsDetalleComponent } from './tickets-detalle.component';

describe('TicketsDetalleComponent', () => {
  let component: TicketsDetalleComponent;
  let fixture: ComponentFixture<TicketsDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketsDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
