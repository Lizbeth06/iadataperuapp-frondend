import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasistemasListaComponent } from './ventasistemas-lista.component';

describe('VentasistemasListaComponent', () => {
  let component: VentasistemasListaComponent;
  let fixture: ComponentFixture<VentasistemasListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasistemasListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentasistemasListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
