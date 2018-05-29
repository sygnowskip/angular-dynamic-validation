import { Component, Input } from '@angular/core';
import { ValidationRulesDefaultMessagesService } from '../../services/validation-rules-default-messages/validation-rules-default-messages.service';

export class ValidationFieldErrorsMessages {
  [error: string]: string | undefined;
  public server: string | undefined;
}

export class ValidationFieldErrors {
  [error: string]: boolean;
}

@Component({
  selector: 'validation-field-messages',
  templateUrl: './validation-field-messages.component.html'
})
export class ValidationFieldMessagesComponent {
  @Input()
  public validationErrors: ValidationFieldErrors;

  @Input()
  public fieldValidationMessages: ValidationFieldErrorsMessages;

  constructor(private validationFieldMessages: ValidationRulesDefaultMessagesService) { }

  getValidationMessage(rule: string): string | undefined {
    return this.fieldValidationMessages[rule] || this.validationFieldMessages.get(rule);
  }
}
