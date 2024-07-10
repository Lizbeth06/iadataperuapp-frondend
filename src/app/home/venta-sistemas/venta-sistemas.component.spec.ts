import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaSistemasComponent } from './venta-sistemas.component';

describe('VentaSistemasComponent', () => {
  let component: VentaSistemasComponent;
  let fixture: ComponentFixture<VentaSistemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentaSistemasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentaSistemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
