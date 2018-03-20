import { IValidatorService } from "../../validators/validator.interface";
import { Injectable } from "@angular/core";
import { IBaseValidationRule } from "../../models/base-validation-rule/base-validation-rule.model";

export interface IValidatorsDefinition {
  [name: string]: Validator | undefined;
}

export class Validator {
  constructor(name: string, service: { new(): IValidatorService<IBaseValidationRule> }) {
    this.name = name;
    this.service = service;
  }

  public name: string;
  public service: { new(): IValidatorService<IBaseValidationRule> };
}

@Injectable()
export class AvailableValidatorsService {
  private static validators: IValidatorsDefinition = {
    // 'required': new Validator('required', RequiredValidatorService)
  };

  public register(name: string, service: { new(): IValidatorService<IBaseValidationRule> }) {
    if (!!AvailableValidatorsService.validators[name]) {
      console.warn("Validator " + name + " already exists and will be overwritten!");
    }

    AvailableValidatorsService.validators[name] = new Validator(name, service);
  }

  public get(name: string): Validator | undefined {
    return AvailableValidatorsService.validators[name];
  }
}
