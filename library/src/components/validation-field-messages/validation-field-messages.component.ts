import { Component, OnInit, Input } from '@angular/core';
import { ValidationFieldMessagesDefaultsService } from '../../services/validation-field-messages-defaults/validation-field-messages-defaults.service';

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
export class ValidationFieldMessagesComponent implements OnInit {
  @Input()
  public validationErrors: ValidationFieldErrors;

  @Input()
  public fieldValidationMessages: ValidationFieldErrorsMessages;

  constructor(private validationFieldMessages: ValidationFieldMessagesDefaultsService) { }

  ngOnInit(): void {
  }

  getValidationMessage(rule: string): string | undefined {
    return this.fieldValidationMessages[rule] || this.validationFieldMessages.get(rule);
  }
}
