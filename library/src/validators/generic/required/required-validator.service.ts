import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { IValidatorService } from '../..';
import { IRequiredValidationRule } from '../../..';

@Injectable()
export class RequiredValidatorService implements IValidatorService<IRequiredValidationRule> {
  constructor() { }

  public getValidator(rule: IRequiredValidationRule): ValidatorFn | undefined {
    return Validators.required;
  }
}
