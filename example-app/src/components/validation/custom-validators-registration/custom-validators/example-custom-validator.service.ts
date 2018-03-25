import { Injectable } from "@angular/core";
import { IBaseValidationRule, IValidatorService } from "angular-dynamic-validation";
import { ValidatorFn, Validators } from "@angular/forms";

export interface IExampleCustomValidationRule extends IBaseValidationRule {
  customProperty: string;
}

@Injectable()
export class ExampleCustomValidatorService implements IValidatorService<IExampleCustomValidationRule> {
  public getValidator(rule: IExampleCustomValidationRule): ValidatorFn | undefined {
    //do something with your custom property
    return Validators.required;
  }
}
