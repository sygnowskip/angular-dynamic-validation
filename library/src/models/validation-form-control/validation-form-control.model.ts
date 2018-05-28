import { FormControl, ValidatorFn, AsyncValidatorFn } from "@angular/forms";
import { AbstractControlOptions } from "@angular/forms/src/model";

export class ValidationFormControl extends FormControl {
  public manualAppliedValidators: ValidatorFn | ValidatorFn[] | null = null;
  public manualAppliedAsyncValidators: AsyncValidatorFn | AsyncValidatorFn[] | null = null;

  constructor(formState?: any, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
    super(formState, validatorOrOpts, asyncValidator);

    if (!!asyncValidator) {
      this.manualAppliedAsyncValidators =
        (this.isOptionsObj(validatorOrOpts) ? (validatorOrOpts as AbstractControlOptions).asyncValidators :
          asyncValidator) as AsyncValidatorFn |
        AsyncValidatorFn | null;
    }
    if (!!validatorOrOpts) {
      this.manualAppliedValidators =
        (this.isOptionsObj(validatorOrOpts) ? (validatorOrOpts as AbstractControlOptions).validators :
          validatorOrOpts) as ValidatorFn |
        ValidatorFn[] | null;
    }
  }



  // SOURCE: ANGULAR
  isOptionsObj(validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null): boolean {
    return validatorOrOpts != null && !Array.isArray(validatorOrOpts) && typeof validatorOrOpts === 'object';
  }
}
