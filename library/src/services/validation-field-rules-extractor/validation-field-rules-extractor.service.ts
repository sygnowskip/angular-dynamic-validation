import { Injectable } from '@angular/core';
import { IValidationFields, IValidationFieldRules } from '../../models/base-validation-rule/base-validation-rule.model';

@Injectable()
export class ValidationFieldRulesExtractorService {
  public getRules(forField: string, rules: IValidationFields | undefined): IValidationFieldRules | undefined {
    if (!rules) {
      return undefined;
    }

    let rulesForFields = rules[forField];
    if (!rulesForFields) {
      return undefined;
    }

    return rulesForFields.rules;
  }
}
