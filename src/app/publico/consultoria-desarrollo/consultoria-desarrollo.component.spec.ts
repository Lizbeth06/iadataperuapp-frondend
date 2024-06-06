import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultoriaDesarrolloComponent } from './consultoria-desarrollo.component';

describe('ConsultoriaDesarrolloComponent', () => {
  let component: ConsultoriaDesarrolloComponent;
  let fixture: ComponentFixture<ConsultoriaDesarrolloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultoriaDesarrolloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultoriaDesarrolloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
