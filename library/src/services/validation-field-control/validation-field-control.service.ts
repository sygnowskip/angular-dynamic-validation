import { Injectable } from '@angular/core';
import { FormGroupDirective, FormBuilder } from '@angular/forms';
import { ValidationFormControl } from '../../models/validation-form-control/validation-form-control.model';

@Injectable()
export class ValidationFieldControlService {
  constructor(private formBuilder: FormBuilder) { }

  public setupControl(formGroupDirective: FormGroupDirective, field: string): ValidationFormControl {
    const control = this.getControl(formGroupDirective, field);
    if (!!control) {
      this.displayWarningForControlWithoutCustomValidators(control);
      return control;
    }

    formGroupDirective.form.addControl(field, this.formBuilder.control(''));
    return <ValidationFormControl>this.getControl(formGroupDirective, field);
  }

  private getControl(formGroupDirective: FormGroupDirective, field: string): ValidationFormControl | null {
    return formGroupDirective.form.get(field) as ValidationFormControl;
  }

  private displayWarningForControlWithoutCustomValidators(control: ValidationFormControl) {
    if (!control) {
      return;
    }

    if (!control.manualAppliedAsyncValidators && !control.manualAppliedValidators) {
      console.warn("You probably used FormControl with custom validation rules, but you should use ValidationFormControl, otherwise your custom applied rules will be overwritten");
    }
  }
}
