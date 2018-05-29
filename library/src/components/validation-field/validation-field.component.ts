import { Component, ContentChild, AfterContentInit, Host, Input, SkipSelf, Optional } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { ValidationFormGroupDirective } from './../../directives/validation-form-group/validation-form-group.directive';
import { ValidationFieldDefaultMessagesService } from '../../services/validation-field-default-messages/validation-field-default-messages.service';
import { ValidationFieldRulesExtractorService } from '../../services/validation-field-rules-extractor/validation-field-rules-extractor.service';
import { IValidationFieldRules, IValidationFields } from '../../models/base-validation-rule/base-validation-rule.model';
import { ValidationFormControl } from '../../models/validation-form-control/validation-form-control.model';
import { ValidationFieldErrorsMessages } from '../validation-field-messages/validation-field-messages.component';
import { ValidationFieldValidatorsService } from '../../services/validation-field-validators/validation-field-validators.service';
import { ValidationFieldControlService } from '../../services/validation-field-control/validation-field-control.service';
import { ValidationFieldRefresherService } from '../../services/validation-field-refresher/validation-field-refresher.service';
import { ServerErrorService } from '../../services/server-error/server-error.service';
import { ServerValidationError } from '../../services/server-error-reader/server-error-reader.service';

@Component({
  selector: 'validation-field',
  templateUrl: './validation-field.component.html'
})
export class ValidationFieldComponent implements AfterContentInit {
  private rulesForField: IValidationFieldRules | undefined;
  private control: ValidationFormControl;

  public defaultErrorMessages: ValidationFieldErrorsMessages;

  @Input()
  public label: string;

  @ContentChild(FormControlName)
  public formControlName: FormControlName;

  constructor(
    @Host() @SkipSelf() @Optional() private validationFormGroup: ValidationFormGroupDirective,
    private validationFieldValidator: ValidationFieldValidatorsService,
    private validationFieldControl: ValidationFieldControlService,
    private validationFieldRulesExtractor: ValidationFieldRulesExtractorService,
    private validationFieldDefaultMessages: ValidationFieldDefaultMessagesService,
    private validationRefresher: ValidationFieldRefresherService,
    private serverErrors: ServerErrorService
  ) {
  }

  ngAfterContentInit() {
    this.bindRefresher();
    this.bindServerErrors();

    this.validationFormGroup.validationRulesChanged.subscribe((rules: IValidationFields | undefined) => this.rulesChanged(rules));
    this.control = this.validationFieldControl.setupControl(this.validationFormGroup, this.getFieldName());

    this.setupRules(this.validationFormGroup.rules);
  }

  private getFieldName(): string {
    return this.formControlName && this.formControlName.name;
  }

  private bindServerErrors() {
    this.serverErrors.validationErrorOccured.subscribe((error: ServerValidationError) => {
      if (error.property !== this.getFieldName()) {
        return;
      }

      if (!this.control) {
        return;
      }

      this.control.setErrors({ server: true });
      this.defaultErrorMessages.server = error.message;
    });
  }

  private bindRefresher() {
    this.validationRefresher.refreshValidationTriggered
      .subscribe((field: string) => {
        if (field !== this.getFieldName()) {
          return;
        }

        if (!this.control) {
          return;
        }

        this.control.updateValueAndValidity();
      });
  }

  private rulesChanged(rules: IValidationFields | undefined): void {
    if (rules) {
      this.setupRules(rules);
    }
  }

  private setupRules(rules: IValidationFields | undefined) {
    this.rulesForField = this.validationFieldRulesExtractor.getRules(this.getFieldName(), rules);
    this.defaultErrorMessages = this.validationFieldDefaultMessages.getDefaultMessages(this.rulesForField, this.defaultErrorMessages);
    if (this.rulesForField) {
      this.validationFieldValidator.updateValidators(this.getFieldName(), this.control, this.rulesForField);
    }
  }
}
