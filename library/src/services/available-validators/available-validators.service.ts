import { Validator } from "./models/validator.model";
import { IBaseValidationRule } from "../../models/base-validation-rule.model";
import { IValidatorService } from "../../validators/validator.interface";
import { IValidatorsDefinition } from "./models/validator-definition.model";
import { Injectable } from "@angular/core";

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
