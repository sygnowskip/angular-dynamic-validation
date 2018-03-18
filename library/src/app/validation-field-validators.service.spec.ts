import { TestBed, inject } from '@angular/core/testing';

import { ValidationFieldValidatorsService } from './validation-field-validators.service';

describe('ValidationFieldValidatorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidationFieldValidatorsService]
    });
  });

  it('should be created', inject([ValidationFieldValidatorsService], (service: ValidationFieldValidatorsService) => {
    expect(service).toBeTruthy();
  }));
});
