import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendarFormComponent } from './agendar-form.component';

describe('AgendarFormComponent', () => {
  let component: AgendarFormComponent;
  let fixture: ComponentFixture<AgendarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendarFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgendarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
