import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasistemasCotizarComponent } from './ventasistemas-cotizar.component';

describe('VentasistemasCotizarComponent', () => {
  let component: VentasistemasCotizarComponent;
  let fixture: ComponentFixture<VentasistemasCotizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasistemasCotizarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentasistemasCotizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
