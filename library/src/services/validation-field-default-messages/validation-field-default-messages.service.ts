import { Injectable } from '@angular/core';
import { IValidationFieldRules } from '../../models/base-validation-rule/base-validation-rule.model';
import { ValidationFieldErrorsMessages } from '../../components/validation-field-messages/validation-field-messages.component';

@Injectable()
export class ValidationFieldDefaultMessagesService {
  public getDefaultMessages(rulesForField: IValidationFieldRules | undefined, current?: ValidationFieldErrorsMessages): ValidationFieldErrorsMessages {
    if (!current){
      current = new ValidationFieldErrorsMessages();
    }

    if (!rulesForField) {
      return current;
    }

    for (const rule in rulesForField) {
      if (!rulesForField.hasOwnProperty(rule)) {
        continue;
      }

      const ruleDefinition = rulesForField[rule];
      if (!ruleDefinition) {
        continue;
      }
      current[rule] = ruleDefinition.message;
    }

    return current;
  }

}
