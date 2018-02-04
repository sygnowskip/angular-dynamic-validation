import { IValidationRules } from '../../components/validation/types';
import * as validationRules from './../rules.json';
import customValidationRules from './../custom-rules';

export class ValidationRulesProvider {
  static getRules(): IValidationRules {
    return ValidationRulesProvider.mergeValidationRules(validationRules, customValidationRules);
  }

  // TODO: Move it to some Object.deepMerge or similar :)
  private static mergeValidationRules(jsonRules: any, customRules: any) {
    const isObject = (item: any) => (item && typeof item === 'object' && !Array.isArray(item));

    const output = Object.assign({}, jsonRules);
    if (isObject(jsonRules) && isObject(customRules)) {
      Object.keys(customRules).forEach(key => {
        if (isObject(customRules[key])) {
          if (!(key in jsonRules)) {
            Object.assign(output, { [key]: customRules[key] });
          } else {
            output[key] = ValidationRulesProvider.mergeValidationRules(jsonRules[key], customRules[key]);
          }
        } else {
          Object.assign(output, { [key]: customRules[key] });
        }
      });
    }
    return output;
  }
}
