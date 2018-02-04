import { Injectable } from '@angular/core';
import { ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  public static conditionalValidator(condition: () => boolean, validator: ValidatorFn): ValidatorFn {
    return (control: AbstractControl) => {
      if (!condition()) {
        return null;
      }

      return validator(control);
    };
  }
}
