import { TestBed } from '@angular/core/testing';

import { LegalService } from './legal.service';

describe('LegalService', () => {
  let service: LegalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
