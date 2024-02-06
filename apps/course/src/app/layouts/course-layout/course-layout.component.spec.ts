import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLayoutComponent } from './course-layout.component';

describe('CourseLayoutComponent', () => {
  let component: CourseLayoutComponent;
  let fixture: ComponentFixture<CourseLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
