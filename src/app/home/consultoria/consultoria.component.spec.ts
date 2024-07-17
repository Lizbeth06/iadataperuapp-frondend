import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultoriaComponent } from './consultoria.component';

describe('ConsultoriaComponent', () => {
  let component: ConsultoriaComponent;
  let fixture: ComponentFixture<ConsultoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
