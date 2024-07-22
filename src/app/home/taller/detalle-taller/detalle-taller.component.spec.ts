import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTallerComponent } from './detalle-taller.component';

describe('DetalleTallerComponent', () => {
  let component: DetalleTallerComponent;
  let fixture: ComponentFixture<DetalleTallerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleTallerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleTallerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
