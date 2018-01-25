import { TestBed, inject } from '@angular/core/testing';

import { ValidationFieldRefresherService } from './validation-field-refresher.service';

describe('ValidationFieldRefresherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidationFieldRefresherService]
    });
  });

  it('should be created', inject([ValidationFieldRefresherService], (service: ValidationFieldRefresherService) => {
    expect(service).toBeTruthy();
  }));
});
