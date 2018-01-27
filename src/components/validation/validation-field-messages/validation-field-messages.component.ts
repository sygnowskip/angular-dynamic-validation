import { Component, OnInit, Input } from '@angular/core';
import { ValidationFieldMessagesDefaults } from '../validation-field-messages-defaults/validation-field-messages-defaults.service';

export class ValidationFieldErrorsMessages {
  [error: string]: string | undefined;
  public server: string | undefined;
}

export class ValidationFieldErrors {
  [error: string]: boolean;
}

@Component({
  selector: 'validation-field-messages',
  templateUrl: './validation-field-messages.component.html',
  styleUrls: ['./validation-field-messages.component.css']
})
export class ValidationFieldMessagesComponent implements OnInit {
  @Input()
  public validationErrors: ValidationFieldErrors;

  @Input()
  public defaultValidationMessages: ValidationFieldErrorsMessages;

  constructor(private validationFieldMessages: ValidationFieldMessagesDefaults) { }

  getValidationMessage(rule: string): string | undefined {
    return this.defaultValidationMessages[rule] || this.validationFieldMessages.get(rule);
  }
}
