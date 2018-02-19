import { ValidatorFn } from '@angular/forms';
import { IBaseValidationRule } from '../models';

export interface IValidatorService<T extends IBaseValidationRule> {
  getValidator(rule: T): ValidatorFn | undefined;
}
