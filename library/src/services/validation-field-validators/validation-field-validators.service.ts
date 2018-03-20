import { Injectable } from '@angular/core';
import { AsyncValidatorFn } from '@angular/forms';
import { ValidationFormControl } from '../../models/validation-form-control/validation-form-control.model';
import { IValidationFieldRules } from '../../models/base-validation-rule/base-validation-rule.model';
import { ValidatorsFactoryService } from '../validators-factory/validators-factory.service';

@Injectable()
export class ValidationFieldValidatorsService {

  constructor(private validatorsFactory: ValidatorsFactoryService) { }

  public updateValidators(forField: string, control: ValidationFormControl, rulesForField: IValidationFieldRules) {
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

  private applyAsyncValidators(control: ValidationFormControl, rulesForField: IValidationFieldRules) {
    control.clearAsyncValidators();

    // TODO
    const asyncValidators = new Array<AsyncValidatorFn>();
    const mergedAsyncValidators = asyncValidators.concat(control.manualAppliedAsyncValidators || []);
    control.setAsyncValidators(mergedAsyncValidators);
  }

  private applyValidators(control: ValidationFormControl, rulesForField: IValidationFieldRules) {
    control.clearValidators();

    const validators = this.validatorsFactory.getValidators(rulesForField);
    const mergedValidators = validators.concat(control.manualAppliedValidators || []);
    control.setValidators(mergedValidators);
  }

}
