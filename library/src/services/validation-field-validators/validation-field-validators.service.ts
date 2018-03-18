import { Injectable } from '@angular/core';
import { IValidationFieldRules, ValidationFormControl } from '../..';
import { AsyncValidatorFn } from '@angular/forms';
import { ValidatorsFactoryService } from '..';

@Injectable()
export class ValidationFieldValidatorsService {

  constructor(private validatorsFactory: ValidatorsFactoryService) { }

  public updateValidators(forField: string, control: ValidationFormControl, rulesForField: { rules: IValidationFieldRules }) {
    if (!control) {
      return;
    }

    if (!rulesForField) {
      console.warn("Rules for field '" + forField + "' are missing!");
    } else {
      this.applyAsyncValidators(control, rulesForField);
      this.applyValidators(control, rulesForField);
    }
  }

  private applyAsyncValidators(control: ValidationFormControl, rulesForField: { rules: IValidationFieldRules }) {
    control.clearAsyncValidators();

    // TODO
    const asyncValidators = new Array<AsyncValidatorFn>();
    const mergedAsyncValidators = asyncValidators.concat(control.manualAppliedAsyncValidators || []);
    control.setAsyncValidators(mergedAsyncValidators);
  }

  private applyValidators(control: ValidationFormControl, rulesForField: { rules: IValidationFieldRules }) {
    control.clearValidators();

    const validators = this.validatorsFactory.getValidators(rulesForField);
    const mergedValidators = validators.concat(control.manualAppliedValidators || []);
    control.setValidators(mergedValidators);
  }

}
