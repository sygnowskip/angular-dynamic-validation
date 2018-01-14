import { IValidatorService } from '../validator.interface';
import { IRequiredValidationRule } from '../../../types';
import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';

@Injectable()
export class RequiredValidatorService implements IValidatorService<IRequiredValidationRule> {
  constructor() { }

  public getValidator(rule: IRequiredValidationRule): ValidatorFn | undefined {
    return Validators.required;
  }
}
