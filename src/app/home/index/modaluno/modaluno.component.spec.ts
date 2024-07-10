import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalunoComponent } from './modaluno.component';

describe('ModalunoComponent', () => {
  let component: ModalunoComponent;
  let fixture: ComponentFixture<ModalunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalunoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
