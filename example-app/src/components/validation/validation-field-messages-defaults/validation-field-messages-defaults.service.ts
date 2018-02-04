import { Injectable } from '@angular/core';

export class ValidationFieldErrorMessages {
  [error: string]: string;
}

@Injectable()
export class ValidationFieldMessagesDefaults {
  private static defaultMessages: ValidationFieldErrorMessages = {
    "required": "This field is required"
  };

  public set(error: string, defaulMessage: string) {
    if (!!ValidationFieldMessagesDefaults.defaultMessages[error]) {
      console.warn("Default message for '" + error + "' error already exists and will be overwritten!");
    }

    ValidationFieldMessagesDefaults.defaultMessages[error] = defaulMessage;
  }

  public get(error: string): string | undefined {
    return ValidationFieldMessagesDefaults.defaultMessages[error];
  }
}
