import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalconsultoriaComponent } from './modalconsultoria.component';

describe('ModalconsultoriaComponent', () => {
  let component: ModalconsultoriaComponent;
  let fixture: ComponentFixture<ModalconsultoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalconsultoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalconsultoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
