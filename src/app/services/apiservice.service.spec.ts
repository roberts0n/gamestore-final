import { TestBed } from '@angular/core/testing';

import { ApiserviceService } from './apiservice.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('ApiserviceService', () => {
  let service: ApiserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientModule]
    }).compileComponents();
    service = TestBed.inject(ApiserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
