import { TestBed } from '@angular/core/testing';

import { CourseStateService } from './course-state.service';

describe('CourseStateService', () => {
  let service: CourseStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
