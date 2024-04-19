import { TestBed } from '@angular/core/testing';

import { GetInTouchService } from './get-in-touch.service';

describe('GetInTouchService', () => {
  let service: GetInTouchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetInTouchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
