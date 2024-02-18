import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseIntroductionComponent } from './course-introduction.component';

describe('CourseDetailComponent', () => {
  let component: CourseIntroductionComponent;
  let fixture: ComponentFixture<CourseIntroductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseIntroductionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
