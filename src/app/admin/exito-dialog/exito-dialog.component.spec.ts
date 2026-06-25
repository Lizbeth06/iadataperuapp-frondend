import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitoDialogComponent } from './exito-dialog.component';

describe('ExitoDialogComponent', () => {
  let component: ExitoDialogComponent;
  let fixture: ComponentFixture<ExitoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExitoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExitoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
