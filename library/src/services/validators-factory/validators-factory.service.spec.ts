import { TestBed, inject } from '@angular/core/testing';
import { ValidatorsFactoryService } from './validators-factory.service';
import { AvailableValidatorsService } from '../available-validators/available-validators.service';
import { IValidatorService } from '../../validators/validator.interface';
import { ValidatorFn } from '@angular/forms';
import { IBaseValidationRule } from '../../models/base-validation-rule/base-validation-rule.model';

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
      const rulesForFields = {
        'non-existing-rule': {
          message: "non existing rule"
        },
        'second-non-existing-rule': {
          message: "non existing rule"
        }
      };

      const validators = service.getValidators(rulesForFields);

      expect(validators).toBeDefined();
      expect(validators.length).toEqual(0);
    }));

    it('should return array of existing validators', inject([ValidatorsFactoryService], (service: ValidatorsFactoryService) => {
      const rulesForFields = {
      };
      rulesForFields[existingValidator] = {
        message: "existing rule"
      };
      rulesForFields[existingSecondValidator] = {
        message: "second existing rule"
      };

      const validators = service.getValidators(rulesForFields);

      expect(validators).toBeDefined();
      expect(validators.length).toEqual(2);
    }));
  });
});
