import { ValidationFormGroupDirective } from './validation-form-group.directive';
import { ValidationRulesService } from './../../services/validation-rules/validation-rules.service';
import { IValidationRules } from '../../models/base-validation-rule/base-validation-rule.model';

describe('ValidationFormGroupDirective', () => {
  it('should create an instance', () => {
    let validators = [];
    let asyncValidators = [];
    let validationRulesService = new ValidationRulesService(() => <IValidationRules>{ });

    const directive = new ValidationFormGroupDirective(validators, asyncValidators, validationRulesService);
    expect(directive).toBeTruthy();
  });
});
