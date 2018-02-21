import { Injectable } from '@angular/core';

export class ValidationFieldErrorMessages {
  [error: string]: string;
}

@Injectable()
export class ValidationFieldMessagesDefaultsService {
  private static defaultMessages: ValidationFieldErrorMessages = {
    "required": "This field is required"
  };

  public set(error: string, defaulMessage: string) {
    if (!!ValidationFieldMessagesDefaultsService.defaultMessages[error]) {
      console.warn("Default message for '" + error + "' error already exists and will be overwritten!");
    }

    ValidationFieldMessagesDefaultsService.defaultMessages[error] = defaulMessage;
  }

  public get(error: string): string | undefined {
    return ValidationFieldMessagesDefaultsService.defaultMessages[error];
  }
}
