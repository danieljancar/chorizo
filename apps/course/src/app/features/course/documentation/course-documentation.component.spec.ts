import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDocumentationComponent } from './course-documentation.component';

describe('DocsComponent', () => {
  let component: CourseDocumentationComponent;
  let fixture: ComponentFixture<CourseDocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseDocumentationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
