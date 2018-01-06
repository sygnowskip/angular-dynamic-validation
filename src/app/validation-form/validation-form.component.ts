import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Input } from '@angular/core';

@Component({
  selector: 'validation-form',
  templateUrl: './validation-form.component.html',
  styleUrls: ['./validation-form.component.css']
})
export class ValidationFormComponent implements OnInit {
  public formGroup: FormGroup;
  // move callback to RXJS?
  @Input('on-submit')
  public onSuccesfulSubmitCallback: (model: any) => void;

  // move callback to RXJS?
  @Input('on-invalid')
  public onInvalidSubmit: (model: any, errors: Array<ValidationFormError>) => void;

  constructor() {
    console.log("FORM");
  }

  ngOnInit() {
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      if (this.onInvalidSubmit) {
        this.onInvalidSubmit(this.formGroup.value, this.getErrorsFromFormGroup());
      }
      return;
    }

    if (this.onSuccesfulSubmitCallback) {
      this.onSuccesfulSubmitCallback(this.formGroup.value);
    }
  }

  // move to service
  getErrorsFromFormGroup(): Array<ValidationFormError> {
    return new Array<ValidationFormError>();
  }

}

export class ValidationFormError {
  field: string;
  error: string;
  message: string;
}

export interface IValidationFormSuccessfullySubmitted<T> {
  onSuccessfulSubmit(model: T): void;
}

export interface IValidationFormInvalidSubmitted<T> {
  onInvalidSubmit(model: T, errors: Array<ValidationFormError>): void;
}
