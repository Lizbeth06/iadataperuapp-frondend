import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaSistemaComponent } from './venta-sistema.component';

describe('VentaSistemaComponent', () => {
  let component: VentaSistemaComponent;
  let fixture: ComponentFixture<VentaSistemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentaSistemaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentaSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
