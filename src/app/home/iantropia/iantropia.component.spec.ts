import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IantropiaComponent } from './iantropia.component';

describe('IantropiaComponent', () => {
  let component: IantropiaComponent;
  let fixture: ComponentFixture<IantropiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IantropiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IantropiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
