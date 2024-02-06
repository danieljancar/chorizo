import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingBarsComponent } from './loading-bars.component';

describe('LoadingBarsComponent', () => {
  let component: LoadingBarsComponent;
  let fixture: ComponentFixture<LoadingBarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingBarsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
