import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalDetalleComponent } from './profesional-detalle.component';

describe('ProfesionalDetalleComponent', () => {
  let component: ProfesionalDetalleComponent;
  let fixture: ComponentFixture<ProfesionalDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesionalDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfesionalDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
