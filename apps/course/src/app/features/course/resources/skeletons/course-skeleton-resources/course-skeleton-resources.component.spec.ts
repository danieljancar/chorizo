import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSkeletonResourcesComponent } from './course-skeleton-resources.component';

describe('CourseSkeletonResourcesComponent', () => {
  let component: CourseSkeletonResourcesComponent;
  let fixture: ComponentFixture<CourseSkeletonResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseSkeletonResourcesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseSkeletonResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
