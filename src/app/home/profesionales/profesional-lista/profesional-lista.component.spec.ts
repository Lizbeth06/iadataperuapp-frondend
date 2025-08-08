import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalListaComponent } from './profesional-lista.component';

describe('ProfesionalListaComponent', () => {
  let component: ProfesionalListaComponent;
  let fixture: ComponentFixture<ProfesionalListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesionalListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfesionalListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
