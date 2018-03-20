import { TestBed, inject } from '@angular/core/testing';
import { AvailableValidatorsService } from './available-validators.service';
import { IValidatorService } from '../../validators/validator.interface';
import { ValidatorFn } from '@angular/forms';
import { IBaseValidationRule } from '../../models/base-validation-rule/base-validation-rule.model';

class TestCaseValidator implements IValidatorService<IBaseValidationRule> {
  getValidator(rule: IBaseValidationRule): ValidatorFn | undefined {
    return undefined;
  }
}

class TestCaseSecondValidator implements IValidatorService<IBaseValidationRule> {
  getValidator(rule: IBaseValidationRule): ValidatorFn | undefined {
    return <ValidatorFn>{};
  }
}

describe('AvailableValidatorsService', () => {
  const validatorName = 'test-case-validator';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvailableValidatorsService]
    });
  });

  it('should be created', inject([AvailableValidatorsService], (service: AvailableValidatorsService) => {
    expect(service).toBeTruthy();
  }));

  describe('register tests', () => {
    it('should register validator', inject([AvailableValidatorsService], (service: AvailableValidatorsService) => {
      service.register(validatorName, TestCaseValidator);

      const validator = service.get(validatorName);
      expect(validator).toBeDefined();
    }));


    it('should overwrite registered validator', inject([AvailableValidatorsService], (service: AvailableValidatorsService) => {
      service.register(validatorName, TestCaseValidator);

      // verification after first registration
      let validator = service.get(validatorName);

      let validatorService = new validator.service();
      let validatorInstance = validatorService.getValidator({});
      expect(validatorInstance).toBeUndefined();

      service.register(validatorName, TestCaseSecondValidator);

      // verification after second registration
      validator = service.get(validatorName);
      expect(validator).toBeDefined();

      validatorService = new validator.service();
      validatorInstance = validatorService.getValidator({});
      expect(validatorInstance).toBeDefined();
    }));
  });

  describe('get tests', () => {
    it('should return registered validator', inject([AvailableValidatorsService], (service: AvailableValidatorsService) => {
      service.register(validatorName, TestCaseValidator);

      const validator = service.get(validatorName);
      expect(validator).toBeDefined();
    }));

    it('should return undefined if validator is not registered', inject([AvailableValidatorsService], (service: AvailableValidatorsService) => {
      const validator = service.get('non-existing-validator');
      expect(validator).toBeUndefined();
    }));
  });
});
