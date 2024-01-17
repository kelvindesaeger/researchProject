import { TestBed } from '@angular/core/testing';

import { AlanService } from './alan.service';

describe('AlanService', () => {
  let service: AlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
