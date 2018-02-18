import { IValidatorService } from './validators/validator.interface';
import { IValidationFieldRules, IBaseValidationRule } from '../types';
import { Injectable, Injector } from '@angular/core';
import { Validators, ValidatorFn } from '@angular/forms';
import { AbstractControl } from '@angular/forms/src/model';
import { ValidationErrors } from '@angular/forms/src/directives/validators';
import { RequiredValidatorService } from './validators/required/required-validator.service';

@Injectable()
export class ValidatorsFactoryService {
  constructor(private injector: Injector) { }

  getValidators(field: { rules: IValidationFieldRules }): Array<ValidatorFn> {
    const fieldRules = field.rules;
    const validators = new Array<ValidatorFn>();

    for (const ruleName in fieldRules) {
      if (fieldRules.hasOwnProperty(ruleName)) {
        const validator = this.getValidator(ruleName, fieldRules[ruleName]);
        if (!validator) {
          continue;
        }

        validators.push(validator);
      }
    }

    return validators;
  }

  private getValidator(name: string, rule: IBaseValidationRule | undefined): ValidatorFn | undefined {
    if (!rule) {
      return undefined;
    }

    const definition = AvailableValidators.get(name);
    if (!definition) {
      return undefined;
    }

    const validator = this.injector.get(definition.service);
    if (!validator) {
      return undefined;
    }

    return validator.getValidator(rule);
  }
}
