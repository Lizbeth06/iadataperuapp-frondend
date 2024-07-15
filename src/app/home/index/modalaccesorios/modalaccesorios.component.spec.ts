import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalaccesoriosComponent } from './modalaccesorios.component';

describe('ModalaccesoriosComponent', () => {
  let component: ModalaccesoriosComponent;
  let fixture: ComponentFixture<ModalaccesoriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalaccesoriosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalaccesoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
