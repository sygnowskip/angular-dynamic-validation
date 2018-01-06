import { Component, OnInit, Self, Host, Inject, Input, SkipSelf } from '@angular/core';
import { ValidationFormComponent } from '../validation-form/validation-form.component';
import { FormGroup, Validators, ControlContainer, Form, FormBuilder } from '@angular/forms';
import { FormControl, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'validation-field',
  templateUrl: './validation-field.component.html',
  styleUrls: ['./validation-field.component.css']
})
export class ValidationFieldComponent implements OnInit {
  public validationForm: ValidationFormComponent;
  private parent: FormGroupDirective;

  @Input()
  public field: string;

  constructor(
    @Host() @SkipSelf() _parent: FormGroupDirective,
    private fb: FormBuilder
  ) {
    this.parent = _parent;
  }

  ngOnInit() {
    this.setupControl();
  }

  private setupControl() {
    console.log(this.parent);
    this.parent.form.addControl(this.field, this.fb.control('', [Validators.required]));
    // console.log(this.parent.form.get('name'));
    // this.formGroup = this.validationForm.validationFormGroup;

    // this.formGroup.addControl(this.field, new FormControl(undefined, [Validators.required]));
    // console.log(this.validationForm);
  }
}
