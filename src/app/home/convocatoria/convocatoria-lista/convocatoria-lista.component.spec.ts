import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvocatoriaListaComponent } from './convocatoria-lista.component';

describe('ConvocatoriaListaComponent', () => {
  let component: ConvocatoriaListaComponent;
  let fixture: ComponentFixture<ConvocatoriaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvocatoriaListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConvocatoriaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
