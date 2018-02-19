import { TestBed, inject } from '@angular/core/testing';
import { ValidatorsFactoryService } from './validators-factory.service';
import { AvailableValidatorsService } from '../available-validators/available-validators.service';
import { IValidatorService } from '../../validators/validator.interface';
import { IBaseValidationRule } from '../../models';
import { ValidatorFn } from '@angular/forms';

class TestCaseValidator implements IValidatorService<IBaseValidationRule> {
  getValidator(rule: IBaseValidationRule): ValidatorFn | undefined {
    return <ValidatorFn>{};
  }
}

describe('ValidatorsFactoryService', () => {
  const existingValidator = 'validator-factory-test';
  const existingSecondValidator = 'validator-factory-test-second';
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ValidatorsFactoryService,
        AvailableValidatorsService,
        TestCaseValidator
      ]
    });
  });

  beforeEach(inject([AvailableValidatorsService], (service: AvailableValidatorsService) => {
    service.register(existingValidator, TestCaseValidator);
    service.register(existingSecondValidator, TestCaseValidator);
  }));

  it('should be created', inject([ValidatorsFactoryService], (service: ValidatorsFactoryService) => {
    expect(service).toBeTruthy();
  }));

  describe('getValidators tests', () => {
    it('should return empty array for non existing validators', inject([ValidatorsFactoryService], (service: ValidatorsFactoryService) => {
      const fields = {
        rules: {
          'non-existing-rule': {
            message: "non existing rule"
          },
          'second-non-existing-rule': {
            message: "non existing rule"
          }
        }
      };

      const validators = service.getValidators(fields);

      expect(validators).toBeDefined();
      expect(validators.length).toEqual(0);
    }));

    it('should return array of existing validators', inject([ValidatorsFactoryService], (service: ValidatorsFactoryService) => {
      const fields = {
        rules: {
        }
      };
      fields.rules[existingValidator] = {
        message: "existing rule"
      };
      fields.rules[existingSecondValidator] = {
        message: "second existing rule"
      };

      const validators = service.getValidators(fields);

      expect(validators).toBeDefined();
      expect(validators.length).toEqual(2);
    }));
  });
});
