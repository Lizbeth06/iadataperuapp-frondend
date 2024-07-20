import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicertificadoComponent } from './micertificado.component';

describe('MicertificadoComponent', () => {
  let component: MicertificadoComponent;
  let fixture: ComponentFixture<MicertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MicertificadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MicertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
