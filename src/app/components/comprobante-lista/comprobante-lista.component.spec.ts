import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobanteListaComponent } from './comprobante-lista.component';

describe('ComprobanteListaComponent', () => {
  let component: ComprobanteListaComponent;
  let fixture: ComponentFixture<ComprobanteListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComprobanteListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComprobanteListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
