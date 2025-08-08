import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutProductoComponent } from './checkout-producto.component';

describe('CheckoutProductoComponent', () => {
  let component: CheckoutProductoComponent;
  let fixture: ComponentFixture<CheckoutProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutProductoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckoutProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
