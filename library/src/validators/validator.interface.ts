import { ValidatorFn } from '@angular/forms';
import { IBaseValidationRule } from '../models/base-validation-rule/base-validation-rule.model';

export interface IValidatorService<T extends IBaseValidationRule> {
  getValidator(rule: T): ValidatorFn | undefined;
}
