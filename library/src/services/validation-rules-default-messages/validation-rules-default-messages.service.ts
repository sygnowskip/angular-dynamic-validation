import { Injectable } from '@angular/core';

export class ValidationRulesErrorMessages {
  [error: string]: string;
}

@Injectable()
export class ValidationRulesDefaultMessagesService {
  private static defaultMessages: ValidationRulesErrorMessages = {
    "required": "This field is required"
  };

  public set(error: string, defaulMessage: string) {
    if (!!ValidationRulesDefaultMessagesService.defaultMessages[error]) {
      console.warn("Default message for '" + error + "' error already exists and will be overwritten!");
    }

    ValidationRulesDefaultMessagesService.defaultMessages[error] = defaulMessage;
  }

  public get(error: string): string | undefined {
    return ValidationRulesDefaultMessagesService.defaultMessages[error];
  }
}
