import { FormGroupValidationRulesDirective } from '../form-group-validation-rules/form-group-validation-rules.directive';
import { Component, OnInit, Host, Input, SkipSelf } from '@angular/core';
import { FormGroup, Validators, ControlContainer, Form, FormBuilder, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { FormControl, FormGroupDirective } from '@angular/forms';
import { ValidationRulesService } from '../validation-rules.service';
import { IValidationFields, IValidationFieldRules } from '../types';
import { ValidationFormControl } from '../validation-form-control/validation-form-control.model';
import { ValidatorsFactoryService } from '../validators-factory/validators-factory.service';
import { ValidationFieldRefresherService } from '../validation-field-refresher/validation-field-refresher.service';
import { ServerErrorService } from '../server-error/server-error.service';
import { ServerValidationError } from '../server-error-reader/server-error-reader.service';
import { ValidationFieldErrorsMessages } from '../validation-field-messages/validation-field-messages.component';

@Component({
  selector: 'validation-field',
  templateUrl: './validation-field.component.html',
  styleUrls: ['./validation-field.component.css']
})
export class ValidationFieldComponent implements OnInit {
  private rules: IValidationFields | undefined;
  private control: ValidationFormControl;

  public defaultErrorMessages: ValidationFieldErrorsMessages = new ValidationFieldErrorsMessages();

  @Input()
  public field: string;

  @Input()
  public label: string;

  constructor(
    @Host() @SkipSelf() private formGroupDirective: FormGroupDirective,
    @Host() @SkipSelf() private rulesDirective: FormGroupValidationRulesDirective,
    private validatorsFactory: ValidatorsFactoryService,
    private formBuilder: FormBuilder,
    private validationRefresher: ValidationFieldRefresherService,
    private serverErrors: ServerErrorService
  ) {
  }

  ngOnInit() {
    this.subscribeRulesChanges();
    this.control = this.setupControl();
    this.updateValidators();
    this.bindRefresher();
    this.bindServerErrors();
  }

  // RULES REGION
  private bindServerErrors() {
    this.serverErrors.validationErrorOccured.subscribe((error: ServerValidationError) => {
      if (error.property !== this.field) {
        return;
      }

      this.control.setErrors({ server: true });
      this.defaultErrorMessages.server = error.message;
    });
  }

  private bindRefresher() {
    this.validationRefresher.refreshValidationTriggered
      .subscribe((field: string) => {
        if (field !== this.field) {
          return;
        }

        if (!this.control) {
          return;
        }

        this.control.updateValueAndValidity();
      });
  }

  private subscribeRulesChanges() {
    this.rules = this.rulesDirective.rules;
    this.updateDefaultMessages();
    this.rulesDirective.validationRulesChanged.subscribe((rules: IValidationFields | undefined) => this.rulesChanged(rules));
  }

  private rulesChanged(rules: IValidationFields | undefined): void {
    if (rules) {
      this.rules = rules;
      this.updateValidators();
      this.updateDefaultMessages();
    }
  }

  private updateDefaultMessages() {
    if (!this.rules) {
      return;
    }

    const rulesForField = this.rules[this.field].rules;
    if (!rulesForField) {
      return;
    }
    for (const rule in rulesForField) {
      if (!rulesForField.hasOwnProperty(rule)) {
        continue;
      }

      const ruleDefinition = rulesForField[rule];
      if (!ruleDefinition) {
        continue;
      }
      this.defaultErrorMessages[rule] = ruleDefinition.message;
    }
  }

  // VALIDATORS REGION
  private updateValidators() {
    const control = this.getControl();
    if (!control) {
      return;
    }

    if (!this.rules) {
      console.warn("Rules for field '" + this.field + "' are missing!");
    } else {
      const rulesForField = this.rules[this.field];
      this.applyAsyncValidators(control, rulesForField);
      this.applyValidators(control, rulesForField);
    }
  }

  private applyAsyncValidators(control: ValidationFormControl, rulesForField: { rules: IValidationFieldRules }) {
    control.clearAsyncValidators();

    // TODO
    const asyncValidators = new Array<AsyncValidatorFn>();
    const mergedAsyncValidators = asyncValidators.concat(control.manualAppliedAsyncValidators || []);
    control.setAsyncValidators(mergedAsyncValidators);
  }

  private applyValidators(control: ValidationFormControl, rulesForField: { rules: IValidationFieldRules }) {
    control.clearValidators();

    const validators = this.validatorsFactory.getValidators(rulesForField);
    const mergedValidators = validators.concat(control.manualAppliedValidators || []);
    control.setValidators(mergedValidators);
  }

  // CONTROL REGION
  private getControl(): ValidationFormControl | null {
    return this.formGroupDirective.form.get(this.field) as ValidationFormControl;
  }

  private setupControl(): ValidationFormControl {
    const control = this.getControl();
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
