import { FormGroupValidationRulesDirective } from '../form-group-validation-rules/form-group-validation-rules.directive';
import { Component, OnInit, Self, Host, Inject, Input, SkipSelf } from '@angular/core';
import { FormGroup, Validators, ControlContainer, Form, FormBuilder } from '@angular/forms';
import { FormControl, FormGroupDirective } from '@angular/forms';
import { ValidationRulesService } from '../validation-rules.service';
import { IValidationFields } from '../types';

@Component({
  selector: 'validation-field',
  templateUrl: './validation-field.component.html',
  styleUrls: ['./validation-field.component.css']
})
export class ValidationFieldComponent implements OnInit {
  private rules: IValidationFields | undefined;

  @Input()
  public field: string;

  constructor(
    @Host() @SkipSelf() private formGroupDirective: FormGroupDirective,
    @Host() @SkipSelf() private rulesDirective: FormGroupValidationRulesDirective,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.subscribeRulesChanges();
    this.setupControl();
    this.updateValidators();
  }

  // RULES REGION
  private subscribeRulesChanges() {
    this.rules = this.rulesDirective.rules;
    this.rulesDirective.validationRulesChanged.subscribe((rules: IValidationFields | undefined) => this.rulesChanged(rules));
  }

  private rulesChanged(rules: IValidationFields | undefined): void {
    if (rules) {
      this.rules = rules;
      this.updateValidators();
    }
  }

  // VALIDATORS REGION
  private updateValidators() {
    const control = this.formGroupDirective.form.get(this.field);
    if (!control) {
      return;
    }

    if (!this.rules) {
      control.clearValidators();
      control.clearAsyncValidators();
    } else {
      const rulesForField = this.rules[this.field];
      if (rulesForField.rules.required) {
        control.setValidators([Validators.required]);
      }
    }
  }

  // CONTROL REGION
  private setupControl() {
    console.log(this.field);
    const emptyControl = this.formBuilder.control('');
    this.formGroupDirective.form.addControl(this.field, emptyControl);
  }
}
