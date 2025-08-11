import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvocatoriaInscripcionComponent } from './convocatoria-inscripcion.component';

describe('ConvocatoriaInscripcionComponent', () => {
  let component: ConvocatoriaInscripcionComponent;
  let fixture: ComponentFixture<ConvocatoriaInscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvocatoriaInscripcionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConvocatoriaInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
