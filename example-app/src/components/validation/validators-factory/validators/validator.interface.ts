import { IBaseValidationRule } from '../../types';
import { ValidatorFn } from '@angular/forms';

export interface IValidatorService<T extends IBaseValidationRule> {
  getValidator(rule: T): ValidatorFn | undefined;
}
