import { Injectable, Injector } from "@angular/core";
import { ValidatorFn } from "@angular/forms";
import { AvailableValidatorsService } from "./../available-validators/available-validators.service";
import { IValidationFieldRules, IBaseValidationRule } from "../../models/base-validation-rule/base-validation-rule.model";

@Injectable()
export class ValidatorsFactoryService {
  constructor(private injector: Injector,
  private availableValidators: AvailableValidatorsService) { }

  getValidators(fieldRules: IValidationFieldRules): Array<ValidatorFn> {
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

    const definition = this.availableValidators.get(name);
    if (!definition) {
      console.warn("Definition for validator '" + name + "' doest not exists!");
      return undefined;
    }

    const validator = this.injector.get(definition.service);
    if (!validator) {
      console.warn("Service for validator '" + definition.service.toString() + "' is not registered!");
      return undefined;
    }

    return validator.getValidator(rule);
  }
}
