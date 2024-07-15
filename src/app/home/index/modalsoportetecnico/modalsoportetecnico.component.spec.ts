import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalsoportetecnicoComponent } from './modalsoportetecnico.component';

describe('ModalsoportetecnicoComponent', () => {
  let component: ModalsoportetecnicoComponent;
  let fixture: ComponentFixture<ModalsoportetecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalsoportetecnicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalsoportetecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
