import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaAccesoriosComponent } from './venta-accesorios.component';

describe('VentaAccesoriosComponent', () => {
  let component: VentaAccesoriosComponent;
  let fixture: ComponentFixture<VentaAccesoriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentaAccesoriosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentaAccesoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
