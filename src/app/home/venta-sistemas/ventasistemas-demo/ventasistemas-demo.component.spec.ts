import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasistemasDemoComponent } from './ventasistemas-demo.component';

describe('VentasistemasDemoComponent', () => {
  let component: VentasistemasDemoComponent;
  let fixture: ComponentFixture<VentasistemasDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasistemasDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentasistemasDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
