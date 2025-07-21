import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasistemasDetalleComponent } from './ventasistemas-detalle.component';

describe('VentasistemasDetalleComponent', () => {
  let component: VentasistemasDetalleComponent;
  let fixture: ComponentFixture<VentasistemasDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasistemasDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentasistemasDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
