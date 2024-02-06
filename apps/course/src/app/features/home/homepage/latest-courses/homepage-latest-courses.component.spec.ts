import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageLatestCoursesComponent } from './homepage-latest-courses.component';

describe('LatestCoursesComponent', () => {
  let component: HomepageLatestCoursesComponent;
  let fixture: ComponentFixture<HomepageLatestCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageLatestCoursesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomepageLatestCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
