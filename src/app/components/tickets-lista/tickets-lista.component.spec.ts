import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsListaComponent } from './tickets-lista.component';

describe('TicketsListaComponent', () => {
  let component: TicketsListaComponent;
  let fixture: ComponentFixture<TicketsListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketsListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
