import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseResourcesComponent } from './course-resources.component';

describe('ResourcesComponent', () => {
  let component: CourseResourcesComponent;
  let fixture: ComponentFixture<CourseResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseResourcesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
