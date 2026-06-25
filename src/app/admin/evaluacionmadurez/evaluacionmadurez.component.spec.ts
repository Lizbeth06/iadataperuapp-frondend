import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionmadurezComponent } from './evaluacionmadurez.component';

describe('EvaluacionmadurezComponent', () => {
  let component: EvaluacionmadurezComponent;
  let fixture: ComponentFixture<EvaluacionmadurezComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacionmadurezComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluacionmadurezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
