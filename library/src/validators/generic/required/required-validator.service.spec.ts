import { TestBed, inject } from '@angular/core/testing';

import { RequiredValidatorService } from './required-validator.service';

describe('RequiredValidatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequiredValidatorService]
    });
  });

  it('should be created', inject([RequiredValidatorService], (service: RequiredValidatorService) => {
    expect(service).toBeTruthy();
  }));

  it('should return validator', inject([RequiredValidatorService], (service: RequiredValidatorService) => {
    let validator = service.getValidator({});

    expect(validator).toBeDefined();
  }));
});
