import { IValidatorService } from './validators/validator.interface';
import { IValidationFieldRules, IBaseValidationRule } from '../types';
import { Injectable, Injector } from '@angular/core';
import { Validators, ValidatorFn } from '@angular/forms';
import { AbstractControl } from '@angular/forms/src/model';
import { ValidationErrors } from '@angular/forms/src/directives/validators';
import { RequiredValidatorService } from './validators/required/required-validator.service';

export class Validator {
  constructor(name: string, service: { new(): IValidatorService<IBaseValidationRule> }) {
    this.name = name;
    this.service = service;
  }

  public name: string;
  public service: { new(): IValidatorService<IBaseValidationRule> };
}

export interface IValidatorsDefinition {
  [name: string]: Validator | undefined;
}

export class AvailableValidators {
  private static validators: IValidatorsDefinition = {
    // 'required': new Validator('required', RequiredValidatorService)
  };

  public static register(name: string, service: { new(): IValidatorService<IBaseValidationRule> }) {
    if (!!this.validators[name]) {
      console.warn("Validator " + name + " already exists and will be overwritten!");
    }

    this.validators[name] = new Validator(name, service);
  }

  public static get(name: string): Validator | undefined {
    return this.validators[name];
  }
}

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
