import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProductoCantidadComponent } from './card-producto-cantidad.component';

describe('CardProductoCantidadComponent', () => {
  let component: CardProductoCantidadComponent;
  let fixture: ComponentFixture<CardProductoCantidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardProductoCantidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardProductoCantidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
