import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnertSeleccionadoComponent } from './partnert-seleccionado.component';

describe('PartnertSeleccionadoComponent', () => {
  let component: PartnertSeleccionadoComponent;
  let fixture: ComponentFixture<PartnertSeleccionadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnertSeleccionadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartnertSeleccionadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
