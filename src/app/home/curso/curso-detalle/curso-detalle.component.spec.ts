import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoDetalleComponent } from './curso-detalle.component';

describe('CursoDetalleComponent', () => {
  let component: CursoDetalleComponent;
  let fixture: ComponentFixture<CursoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CursoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
