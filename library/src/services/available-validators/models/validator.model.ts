import { IBaseValidationRule } from "../../../models/base-validation-rule.model";
import { IValidatorService } from "../../../validators/validator.interface";

export class Validator {
  constructor(name: string, service: { new(): IValidatorService<IBaseValidationRule> }) {
    this.name = name;
    this.service = service;
  }

  public name: string;
  public service: { new(): IValidatorService<IBaseValidationRule> };
}
