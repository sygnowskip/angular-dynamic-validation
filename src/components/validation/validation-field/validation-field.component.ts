import { FormGroupValidationRulesDirective } from '../form-group-validation-rules/form-group-validation-rules.directive';
import { Component, OnInit, Self, Host, Inject, Input, SkipSelf, Injector } from '@angular/core';
import { FormGroup, Validators, ControlContainer, Form, FormBuilder, ValidatorFn } from '@angular/forms';
import { FormControl, FormGroupDirective } from '@angular/forms';
import { ValidationRulesService } from '../validation-rules.service';
import { IValidationFields } from '../types';
import { AbstractControl } from '@angular/forms/src/model';
import { ValidationFormControl } from '../validation-form-control/validation-form-control.model';
import { ValidatorsFactoryService } from '../validators-factory/validators-factory.service';

@Component({
  selector: 'validation-field',
  templateUrl: './validation-field.component.html',
  styleUrls: ['./validation-field.component.css']
})
export class ValidationFieldComponent implements OnInit {
  private rules: IValidationFields | undefined;
  private manualAppliedValidators: Array<ValidatorFn>;
  private manualAppliedAsyncValidators: Array<ValidatorFn>;
  private control: ValidationFormControl;

  @Input()
  public field: string;

  @Input()
  public label: string;

  constructor(
    @Host() @SkipSelf() private formGroupDirective: FormGroupDirective,
    @Host() @SkipSelf() private rulesDirective: FormGroupValidationRulesDirective,
    private validatorsFactory: ValidatorsFactoryService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.subscribeRulesChanges();
    this.control = this.setupControl();
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
    const control = this.getControl();
    if (!control) {
      return;
    }

    if (!this.rules) {
      control.clearValidators();
      control.clearAsyncValidators();
    } else {
      const rulesForField = this.rules[this.field];
      const validators = this.validatorsFactory.getValidators(rulesForField);
      control.setValidators(validators);
    }
  }

  // CONTROL REGION
  private getControl(): AbstractControl | null {
    return this.formGroupDirective.form.get(this.field);
  }

  private setupControl(): ValidationFormControl {
    const control = <ValidationFormControl>this.getControl();
    if (!!control) {
      this.displayWarningForControlWithoutCustomValidators(control);
      return control;
    }

    this.formGroupDirective.form.addControl(this.field, this.formBuilder.control(''));
    return <ValidationFormControl>this.getControl();
  }

  private displayWarningForControlWithoutCustomValidators(control: ValidationFormControl) {
    if (!control) {
      return;
    }

    if (!control.manualAppliedAsyncValidators && !control.manualAppliedValidators) {
      console.warn("You probably used FormControl with custom validation rules, but you should ValidationFormControl, otherwise your custom applied rules will be overwritten");
    }
  }
}
