import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { IRequiredValidationRule } from '../../../models/base-validation-rule/base-validation-rule.model';
import { IValidatorService } from '../../validator.interface';

@Injectable()
export class RequiredValidatorService implements IValidatorService<IRequiredValidationRule> {
  public getValidator(rule: IRequiredValidationRule): ValidatorFn | undefined {
    return Validators.required;
  }
}
