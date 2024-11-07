import { TestBed } from '@angular/core/testing';

import { BdserviceService } from './bdservice.service';

describe('BdserviceService', () => {
  let service: BdserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BdserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
