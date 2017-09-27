import { TestBed, inject } from '@angular/core/testing';

import { EmployeeRpService } from './employee-rp.service';

describe('EmployeeRpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeRpService]
    });
  });

  it('should be created', inject([EmployeeRpService], (service: EmployeeRpService) => {
    expect(service).toBeTruthy();
  }));
});
